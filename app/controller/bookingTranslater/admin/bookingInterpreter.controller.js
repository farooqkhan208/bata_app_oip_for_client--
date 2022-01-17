const adminBookingInterpreterService = require("../../../service/bookingInterpreter.service");
const notification = require("../../../constants/notifications");
const { updateByInterPreterId: interpreterUpdate, updateByUserId: userUpdate } = require("../../../service/user.service");
const assignInterpreterService = require("../../../service/assignInterpreter.service")
const { findById: findOccationById } = require("../../../service/occation.service")
const { findByArray: findLanguage, findById: findByIdLang, findLanguageArrayId } = require("../../../service/language.service")
const bookingLangService = require("../../../service/booking_lang.service")
const userService = require("../../../service/user.service")

class AdminBookingInterPreter {

    async get(req, res) {
        try {

            const result = await adminBookingInterpreterService.findUserId(req.params.id)
            res.status(200).send({
                status: 200,
                success: true,
                msg: "Fetched Successfully",
                data: result,
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };

    async gets(req, res) {
        try {
            let result = await adminBookingInterpreterService.find();
            if (result.length > 0) {
                let modify = []
                if (result.length > 0) {
                    result.map(async (item, index, arr) => {

                        const [occa] = await findOccationById(item.occasion)
                        item.occasion = occa;

                        const [lang] = await findLanguage(JSON.parse(item.primary_language));
                        item.primary_language = lang;

                        const transLanguage = await bookingLangService.findByBookingId(item.id);
                        const languages = await findLanguageArrayId(transLanguage);
                        item.translating_language = languages;

                        const transIneterpreter = await assignInterpreterService.findByBookingId(item.id);
                        const interpreters = await userService.findUserArrayId(transIneterpreter);
                        item.interpreters = interpreters;
                        console.log(item.id)

                        modify.push(item)
                        if (item.id == 93) {
                            console.log(item)

                        }

                        if (index == arr.length - 1) {
                            res.status(200).send({
                                status: 200,
                                success: true,
                                count: modify.length,
                                msg: "Fetched Succesfully",
                                data: modify
                            });
                        }
                    })
                }
            } else {
                res.status(200).send({
                    status: 200,
                    success: true,
                    msg: "No Data Found",
                    data: [],
                });
            }
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };

    async accept(req, res) {
        try {

            const interpreter = req.body.interpreters

            //Update Status Of Booking To accept
            const result = await adminBookingInterpreterService.updateStatus(req.params.id, { status: "accept" })

            if (result) {

                const interpreter = req.body.interpreters
                //send notification to user
                await notification.sendToClient(req.booking.user_id, "Request Accepted", "Your interpreter request has been accepted.", { interpreters: JSON.stringify(interpreter), booking: req.booking.id, lat: "89898", longe: "0909", type: "accepted" });
                interpreter.forEach(async (element) => {

                    // send notification to interpreter
                    await notification.sendToInterpreter(element.interpreter, "Assign To Client", "Click here To show Client", { user: req.booking.user_id, lat: "89898", longe: "0909", type: "accepted" });
                    //Assign Interpreter
                    await assignInterpreterService.create({ booking: req.params.id, interpreter: element.interpreter, language: element.language });

                    //update interpreter status
                    await userUpdate(element.interpreter, { status: "active" });

                });

                //update user status
                await userUpdate(req.booking.user_id, { status: "active" });
            }
            res.status(200).send({
                status: 200,
                success: true,
                msg: "Accepted",
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };

    // async assign(req, res) {
    //     try {

    //         const result = await bookingInterpreterService.updateStatus(req.params.id, { interpreter_id: req.body.interpreter_id })
    //         if (!result) {
    //         }
    //         res.status(200).send({
    //             status: 200,
    //             success: true,
    //             msg: "Accepted",
    //         });
    //     } catch (error) {
    //         res.status(500).send({ success: false, msg: error.message });
    //     }
    // };

    async reject(req, res) {
        try {
            const result = await adminBookingInterpreterService.updateStatus(req.params.id, { status: "reject" })

            if (result) {
                //send notification to user
                sendToClient(req.params.id, "Rejected", "", {})
            }

            res.status(200).send({
                status: 200,
                success: true,
                msg: "Rejected",
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };
}

const adminBookingInterpretersController = new AdminBookingInterPreter();
module.exports = adminBookingInterpretersController;