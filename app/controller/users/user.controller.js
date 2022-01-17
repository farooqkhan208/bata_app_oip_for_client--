const userService = require("../../service/user.service");
const stripeService = require("../../service/stripe.service");
const { findById1: findPackage } = require("../../service/packages.service");
const twilio = require("../../constants/towilo")
const { authMiddleware } = require("../../middleware/auth.middleware");
const fileService = require("../../service/file.service")
const { create: orderCreate } = require("../../service/order.service")
const { createOrIgnore: languageCreate, findByUserId: findUserLanguage, deleteArray: deleteLanguage, findByUserIdForDel, createArray } = require("../../service/speakLanguage.service")
const { findByArray: findUserLangArray, findLanguageArrayIdForInterpreter } = require("../../service/language.service")
const bcrypt = require("bcrypt")
// const axios = require("axios")
const path = require("path")
const appRoot = require("app-root-path");
// const fs = require('fs')

class Users {

    async register(req, res) {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10)
            // console.log(req.body.password);
            // return
            delete req.body.confirmPassword;

            let subscriptionId;
            let userId;

            // console.log(req.body.language)
            // await createArray(req.user.id, req.body.language);
            // delete req.body.language

            if (req.body.stripeToken) {
                const { id: customerId } = await stripeService.createOrGetCustomer4({ name: req.body.first_name, email: req.body.email },)

                await stripeService.attachedTokenToCustomer(customerId, req.body.stripeToken)

                const _data = {
                    customer: customerId,
                    items: [
                        { plan: req.body.plan }
                    ]
                }

                const { id: subsId } = await stripeService.createSubscription(_data)

                subscriptionId = subsId;
                delete req.body.service_type;
                delete req.body.stripeToken;
                delete req.body.plan;
            }

            if (req.user) {
                userId = await userService.update(req.user.id, req.body);
                // await twilio.sendTwilosms(req.body.phone)
                createArray(req.user.id, req.body.language)
            } else {
                userId = await userService.create(req);
                // await twilio.sendTwilosms(req.body.phone)
                createArray(userId.insertId, req.body.language)
            }

            // languageCreate(userId.insertId, userLanguage)
            if (req.body.stripeToken) {
                const _data = {
                    user_id: 1,
                    plan_id: req.body.plan,
                    subscription_id: subscriptionId,
                    price: req.body.price
                }
                orderId = await orderCreate(_data)
            }
            // setTimeout(() => {
            //     axios.post('http://localhost:6000/api/users/verifyEvent', {
            //     })
            //         .then(function (response) {
            //         })
            //         .catch(function (error) {
            //             console.log(error);
            //         })
            // }
            //     , 5000)
            res.status(200).send({
                success: true,
                status: 200,
                msg: "Verification Code Send To Your Mobile",
            });
        } catch (error) {
            res.status(500).send({ success: false, status: 500, msg: error.message });
        }
    };

    // async checkVerifyEvent(req, res) {
    //     try {
    //         console.log("lklklklklklklk")
    //         res.status(200).send({
    //             success: true,
    //             status: 200,
    //             msg: "Login successfully",
    //         });
    //     } catch (error) {
    //         res.status(500).send({ success: false, status: 500, msg: error.message });
    //     }
    // };

    async login(req, res) {
        try {
            req.user.token = authMiddleware.authGenrateToken(req.user.id, req.user.role_id);
            delete req.user.password;

            if (req.user.current_package) {
                const [packag] = await findPackage(req.user.current_package)
                req.user.current_package = packag;
            } else {
                req.user.current_package = null;
            }

            const speak = await findUserLanguage(req.user.id)
            const lang = await findLanguageArrayIdForInterpreter(speak);

            if (req.user.role_id == 3) {
                req.user.language = lang
                delete req.user.previous_package;
                delete req.user.current_package;
                delete req.user.stripe_c_id;
                delete req.user.service_type;
            }
            else if (req.user.role_id == 1) {
                req.user.language = lang
            } else {
                req.user.language = lang[0];
            }

            res.status(200).send({
                success: true,
                status: 200,
                msg: "Login successfully",
                data: req.user,
            });
        } catch (error) {
            res.status(500).send({ success: false, status: 500, msg: error.message });
        }
    };

    async verify(req, res) {
        try {
            // const verify = await twilio.verifySms(req.body)
            if (req.body.code != "1234")
                return res.status(400).send({
                    success: false,
                    status: 400,
                    msg: "Given Code Is Invalid",
                });

            const [RowDataPacket] = await userService.findByPhone(req.body.phone);
            const { id: customerId } = await stripeService.createOrGetCustomer4({ name: RowDataPacket.first_name, email: RowDataPacket.email })

            if (RowDataPacket.current_package) {
                const [packag] = await findPackage(RowDataPacket.current_package)
                RowDataPacket.current_package = packag;
            } else {
                RowDataPacket.current_package = null;
            }

            const speak = await findUserLanguage(RowDataPacket.id)
            const lang = await findLanguageArrayIdForInterpreter(speak);
            console.log(lang)

            if (RowDataPacket.role_id == 3) {
                RowDataPacket.language = lang;
                delete RowDataPacket.previous_package;
                delete RowDataPacket.current_package;
                delete RowDataPacket.stripe_c_id;
            }
            else if (RowDataPacket.role_id == 1) {
                RowDataPacket.language = null
            } else {
                delete RowDataPacket.service_type;
                RowDataPacket.language = lang[0];
            }
            await userService.update(RowDataPacket.id, { verify: 1, stripe_c_id: customerId });
            delete RowDataPacket.password

            RowDataPacket.verify = 1;
            RowDataPacket.token = authMiddleware.authGenrateToken(RowDataPacket.id, RowDataPacket.role_id);

            res.status(200).send({
                success: true,
                status: 200,
                msg: "verify",
                data: RowDataPacket
            });
        } catch (error) {
            res.status(500).send({ success: false, status: 500, msg: error.message });
        }
    };

    async verifyCode(req, res) {
        try {
            // const verify = await twilio.verifySms(req.body)
            // !verify
            if (req.body.code != "1234") return res.status(200).send({
                success: false,
                status: 200,
                msg: "Given Code Is Invalid",
            });
            let [RowDataPacket] = await userService.findByPhone(req.body.phone);
            delete RowDataPacket.password
            res.status(200).send({
                success: true,
                status: 200,
                msg: "Verified",
                data: RowDataPacket
            });
        } catch (error) {
            res.status(500).send({ success: false, status: 500, msg: error.message });
        }
    };

    async forgetPassword(req, res) {
        try {
            const { id } = req.user

            // await twilio.sendTwilosms(req.body.phone)
            res.status(200).send({
                success: true,
                status: 200,
                msg: "Verification Code Send To Your Phone",
            });
        } catch (error) {
            res.status(500).send({ success: false, status: 500, msg: error.message });
        }
    };

    async resetPassword(req, res) {
        try {
            const { userId, password } = req.body
            const hashPassword = await bcrypt.hash(password, 10)
            const user = await userService.update(userId, { password: hashPassword });
            if (!user) return res.status(400).send({
                success: true,
                status: 200,
                msg: "Password Is Not Reset",
                data: false
            })
            res.status(200).send({
                success: true,
                status: 200,
                msg: "Password Reset Successfully",
                data: {
                    reset: true,
                }
            });
        } catch (error) {
            res.status(500).send({ success: false, status: 500, msg: error.message });
        }
    };

    async changePassword(req, res) {
        try {
            const password = await bcrypt.hash(req.body.newPassword, 10);
            let resetPassword = await userService.update(req.user.id, { password });
            res.status(200).send({
                success: true,
                status: 200,
                msg: "Password Reset Successfully",
                data: {
                    reset: true,
                }
            });
        } catch (error) {
            res.status(500).send({ success: false, status: 500, msg: error.message });
        }
    };

    async updateUser(req, res) {
        try {
            const delLang = await findUserLanguage(req.user.id)
            await deleteLanguage(delLang)
            await createArray(req.user.id, req.body.language);
            delete req.body.language

            const user = await userService.update(req.user.id, req.body);

            const [updatData] = await userService.findById(req.user.id);

            const speak = await findUserLanguage(updatData.id)
            const lang = await findLanguageArrayIdForInterpreter(speak);

            if (updatData.role_id == 3) {
                updatData.language = lang;
                delete updatData.previous_package;
                delete updatData.current_package;
                delete updatData.stripe_c_id;
                delete updatData.service_type;
            }
            else if (updatData.role_id == 1) {
                updatData.language = null
            } else {
                delete updatData.service_type;
                updatData.language = lang[0];
            }

            updatData.language = lang;
            const [packag] = await findPackage(updatData.current_package)
            updatData.current_package = packag;

            res.status(200).send({
                success: true,
                status: 200,
                msg: "Update Successfully",
                data: updatData
            });
        } catch (error) {
            res.status(500).send({ success: false, status: 500, msg: error.message });
        }
    };

    async authDel(req, res) {
        try {
            const user = await userService.delete(req.params.id);
            res.status(200).send({
                success: true,
                status: 200,
                msg: "Delete Successfully",
            });
        } catch (error) {
            res.status(500).send({ success: false, status: 500, msg: error.message });
        }
    };


    async uploadImage(req, res) {
        try {
            if (!req.file) return res.status(500).send({ success: false, status: 500, msg: "Image Field Connot Be Empty" });

            const user = await userService.uploadProfileImage(req.user.id, { profile_image: req.file.filename });

            if (req.user.profile_image) {
                fileService.deleteImage(req.user.profile_image);
            }

            res.status(200).send({
                success: true,
                status: 200,
                msg: " Successfully",
                data: {
                    image_name: req.file.filename
                }
            });
        } catch (error) {
            res.status(500).send({ success: false, status: 500, msg: error.message });
        }
    };

    //******************************** TSEST***************************************** */
    async deletePhone(req, res) {
        try {
            const user = await userService.deletePhone(req.params.id);
            res.status(200).send({
                success: true,
                status: 200,
                msg: "Delete Successfully",
            });
        } catch (error) {
            res.status(500).send({ success: false, status: 500, msg: error.message });
        }
    };

    //******************************** RENDER IMAGE***************************************** */
    async renderImage(req, res) {
        try {
            console.log(path.join(appRoot.path, `public/profileImage/${req.params.path}`))
            res.sendFile(path.join(appRoot.path, `public/profileImage/${req.params.path}`));

        } catch (error) {
            res.status(500).send({ success: false, status: 500, msg: error.message });
        }
    };
}

const usersController = new Users();
module.exports = usersController;