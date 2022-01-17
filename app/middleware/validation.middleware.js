const compose = require("composable-middleware");
const { Validator } = require("../../utils/validationSchema");
const Service = require("../service")
const bcrypt = require("bcrypt");
const { deletePlan } = require("../service/stripe.service");

module.exports = class ValidationMiddleware extends Validator {
    constructor() {
        super();
    }

    //********************** JOI VALIDATION ************************************* */

    //********************** User Register Validate Joi************************************* */
    validateUserRegistration() {
        return (
            compose()
                .use((req, res, next) => {
                    super.validateUserRegisterJoi(req.body)
                        .then(data => {
                            next();
                        }).catch(error => {
                            var errors = {
                                success: false,
                                status: 200,
                                msg: error.details[0].message,
                                data: error.name,
                            };
                            res.status(200).send(errors);
                            return;
                        });
                })
                .use((req, res, next) => {
                    if (req.body.password == req.body.confirmPassword) {
                        delete req.body.confirmPassword;
                        next();
                    } else {
                        res.status(200).send({ success: false, status: 200, msg: "Both Password Must Be Same" })
                    }
                })
                .use(this.validateUserVerificationDB())
                .use(this.validateVerifyEmailCheckDB())
                .use(this.validateVerifyPhoneCheckDB())
                .use(this.validateEmailAndPhoneDB())

        )
    }

    //********************** User Login Validate Joi************************************* */
    validateUserLogin() {
        return (
            compose()
                .use((req, res, next) => {
                    super.validateUserLoginJoi(req.body)
                        .then(data => {
                            next();
                        }).catch(error => {
                            var errors = {
                                success: false,
                                status: 200,
                                msg: error.details[0].message,
                                data: error.name,
                            };
                            return res.status(200).send(errors);
                        });
                })
        )
            .use(this.validateUserEmailAuthCheckDB())
            .use(async (req, res, next) => {
                const passwordChecked = await bcrypt.compare(req.body.password, req.user.password)
                if (passwordChecked) next()
                else return res.status(200).send({ success: false, status: 200, msg: "Password Is Invalid" });
            })
    }

    //********************** User Verify Validate Joi************************************* */
    validateUserVerifyJoi() {
        return (
            compose()
                .use((req, res, next) => {
                    super.validateUserVerifyJoi(req.body)
                        .then(data => {
                            next();
                        }).catch(error => {
                            var errors = {
                                success: false,
                                status: 200,
                                msg: error.details[0].message,
                                data: error.name,
                            };
                            return res.status(200).send(errors);
                        });
                })
        )
    }

    //********************** User ForgetPassword Validate Joi************************************* */
    validateForgetPasswordJoi() {
        return (
            compose()
                .use((req, res, next) => {
                    super.validateForgetPasswordJoi(req.body)
                        .then(data => {
                            next();
                        }).catch(error => {
                            var errors = {
                                success: false,
                                msg: error.details[0].message,
                                data: error.name,
                            };
                            return res.status(200).send(errors);
                        });
                })
                .use(this.validateUserByPhoneDB())
        )
    }

    //********************** User ForgetPassword Verify Code Validate Joi************************************* */
    validateVerifyCodeJoi() {
        return (
            compose()
                .use((req, res, next) => {
                    super.validateVerifyCodeJoi(req.body)
                        .then(data => {
                            next();
                        }).catch(error => {
                            var errors = {
                                success: false,
                                msg: error.details[0].message,
                                data: error.name,
                            };
                            return res.status(200).send(errors);
                        });
                })
                .use(this.validateUserByPhoneDB())
        )
    }

    //********************** User ResetPassword Validate Joi************************************* */
    validateResetPasswordJoi() {
        return (
            compose()
                .use((req, res, next) => {
                    super.validateResetPasswordJoi(req.body)
                        .then(data => {
                            next();
                        }).catch(error => {
                            var errors = {
                                success: false,
                                msg: error.details[0].message,
                                data: error.name,
                            };
                            return res.status(200).send(errors);
                        });
                })
                .use((req, res, next) => {
                    if (req.body.password == req.body.confirmPassword) {
                        next();
                    } else {
                        res.status(200).send({ success: false, status: 200, msg: "Both Password Must Be Same" })
                    }
                })
        )
    }

    //********************** ROLE Validate Joi************************************* */
    validateCreateRoleJoi() {
        return (
            compose()
                .use((req, res, next) => {
                    super.validateCreateRoleJoi(req.body)
                        .then(data => {
                            next();
                        }).catch(error => {
                            var errors = {
                                success: false,
                                msg: error.details[0].message,
                                data: error.name,
                            };
                            return res.status(200).send(errors);
                        });
                })
                .use(this.validateCheckRoleNameDB())
        )
    }

    //********************** ROLE Validate Joi************************************* */
    validateCreateOccationJoi() {
        return (
            compose()
                .use((req, res, next) => {
                    super.validateCreateOccationJoi(req.body)
                        .then(data => {
                            next();
                        }).catch(error => {
                            var errors = {
                                success: false,
                                msg: error.details[0].message,
                                data: error.name,
                            };
                            return res.status(200).send(errors);
                        });
                })
                .use(this.validateCheckOccationNameDB())
        )
    }

    //********************** CATEGORY Validate Joi************************************* */
    validateCreateCategoryJoi() {
        return (
            compose()
                .use((req, res, next) => {
                    super.validateCreateCategoryJoi(req.body)
                        .then(data => {
                            next();
                        }).catch(error => {
                            var errors = {
                                success: false,
                                msg: error.details[0].message,
                                data: error.name,
                            };
                            return res.status(200).send(errors);
                        });
                })
                .use(this.validateCheckCategoryNameDB())
        )
    }

    //********************** LANGUAGE Validate Joi************************************* */
    validateCreateLanguageJoi() {
        return (
            compose()
                .use((req, res, next) => {
                    super.validateCreateLanguageJoi(req.body)
                        .then(data => {
                            next();
                        }).catch(error => {
                            var errors = {
                                success: false,
                                msg: error.details[0].message,
                                data: error.name,
                            };
                            return res.status(200).send(errors);
                        });
                })
                .use(this.validateCheckLanguageNameDB())
        )
    }

    //********************** User Change Password************************************* */
    validateUserChangePassword() {
        return (
            compose()
                .use((req, res, next) => {
                    super.validateUserChangePassword(req.body)
                        .then(data => {
                            next();
                        }).catch(error => {
                            var errors = {
                                success: false,
                                msg: error.details[0].message,
                                data: error.name,
                            };
                            return res.status(200).send(errors);
                        });
                })
                .use(async (req, res, next) => {
                    const passwordChecked = await bcrypt.compare(req.body.oldPassword, req.user.password)
                    console.log(passwordChecked)
                    if (!passwordChecked) {
                        res.status(200).send({ success: false, status: 200, msg: "Old Password Is Incorrect" })
                    }
                    else if (req.body.newPassword == req.body.confirmPassword) {
                        next();
                    } else {
                        res.status(200).send({ success: false, status: 200, msg: "Both Password Must Be Same" })
                    }
                })
        )
    }

    //********************** User Updat Password************************************* */
    validateUserUpdateJoi() {
        return (
            compose()
                .use((req, res, next) => {
                    super.validateUserUpdateJoi(req.body)
                        .then(data => {
                            next();
                        }).catch(error => {
                            var errors = {
                                success: false,
                                msg: error.details[0].message,
                                data: error.name,
                            };
                            return res.status(200).send(errors);
                        });
                })
        )
    }

    //********************** CREATE PACKAGE ************************************* */
    validateCreatePackage() {
        return (
            compose()
                .use((req, res, next) => {
                    super.validateCreatePackage(req.body)
                        .then(data => {
                            next();
                        }).catch(error => {
                            var errors = {
                                success: false,
                                msg: error.details[0].message,
                                data: error.name,
                            };
                            return res.status(200).send(errors);
                        });
                })
                .use(this.validateCheckPackageNameDB())
        )
    }

    //********************** CREATE COMMENT AND RATING PACKAGE ************************************* */
    validateCreateCommentAndRatingJoi() {
        return (
            compose()
                .use((req, res, next) => {
                    super.validateCreateCommentAndRatingJoi(req.body)
                        .then(data => {
                            next();
                        }).catch(error => {
                            var errors = {
                                success: false,
                                msg: error.details[0].message,
                                data: error.name,
                            };
                            return res.status(200).send(errors);
                        });
                })
                .use(this.validateUniqueBookingCheckedDB())
        )
    }

    //********************** CREATE PACKAGE ************************************* */
    validateUserCreatePackageJoi() {
        return (
            compose()
                .use((req, res, next) => {
                    super.validateUserCreatePackageJoi(req.body)
                        .then(data => {
                            next();
                        }).catch(error => {
                            var errors = {
                                success: false,
                                msg: error.details[0].message,
                                data: error.name,
                            };
                            return res.status(200).send(errors);
                        });
                })
                .use(this.validateCheckPackageNameDB())
        )
    }

    //********************** CREATE PACKAGE ************************************* */
    validateUpdatePackage() {
        return (
            compose()
                .use((req, res, next) => {
                    super.validateCreatePackage(req.body)
                        .then(data => {
                            next();
                        }).catch(error => {
                            var errors = {
                                success: false,
                                msg: error.details[0].message,
                                data: error.name,
                            };
                            return res.status(200).send(errors);
                        });
                })
        )
    }

    //********************** BOOKING INTERPRETER Validate Joi************************************* */
    validateCreateBokkingInterpretterJoi() {
        return (
            compose()
                .use((req, res, next) => {
                    super.validateCreateBokkingInterpretterJoi(req.body)
                        .then(data => {
                            next();
                        }).catch(error => {
                            var errors = {
                                success: false,
                                msg: error.details[0].message,
                                data: error.name,
                            };
                            return res.status(200).send(errors);
                        });
                })
                .use(this.validateCheckRoleNameDB())
        )
    }

    //********************** BOOKING ADMIN ACCEPT REQUEST Validate Joi************************************* */
    validateBookingAcceptByAdminJoi() {
        return (
            compose()
                .use((req, res, next) => {
                    super.validateBookingAcceptByAdminJoi(req.body)
                        .then(data => {
                            next();
                        }).catch(error => {
                            var errors = {
                                success: false,
                                msg: error.details[0].message,
                                data: error.name,
                            };
                            return res.status(200).send(errors);
                        });
                })
                .use(async (req, res, next) => {
                    const noLang = await Service.bookingLangService.findByBookingId(req.booking.id);
                    let no = 0;
                    if (noLang.length > 0) {
                        for (let i = 0; i < noLang.length; i++) {
                            no = no + noLang[i].qty;
                        }
                    }
                    // console.log(req.body.interpreters)
                    if (no == req.body.interpreters.length) next()
                    else return res.status(200).send({ success: false, status: 200, msg: "Please Assign Interpreter To All Language" });
                })
        )
    }

    //********************** CREATE INTERPRETER Validate Joi************************************* */
    validateCreateInterpreterJoi() {
        return (
            compose()
                .use((req, res, next) => {
                    super.validateCreateInterpreterJoi(req.body)
                        .then(data => {
                            next();
                        }).catch(error => {
                            var errors = {
                                success: false,
                                msg: error.details[0].message,
                                data: error.name,
                            };
                            return res.status(200).send(errors);
                        });
                })
                .use((req, res, next) => {
                    if (req.body.password == req.body.confirmPassword) {
                        delete req.body.confirmPassword;
                        next();
                    } else {
                        res.status(200).send({ success: false, status: 200, msg: "Both Password Must Be Same" })
                    }
                })
                .use(this.validateInterpreterVerificationDB())
                .use(this.validateVerifyEmailCheckDB1())
                .use(this.validateVerifyPhoneCheckDB1())
                .use(this.validateEmailAndPhoneDB())
        )
    }

    //********************** DATABASE VALIDATION *************************************************************************************************************************************************************** */
    //********************** DATABASE VALIDATION *************************************************************************************************************************************************************** */

    //********************** DATABASE User Email All Ready Exist Checked ************************************* */
    validateVerifyEmailCheckDB() {
        return (
            compose().use(async (req, res, next) => {
                let [RowDataPacket] = await Service.userService.findVerifyEmail(req.body.email);
                if (RowDataPacket) {
                    var errors = {
                        success: false,
                        status: 200,
                        msg: "This Email Is Already Registered"
                    };
                    return res.status(200).send(errors);
                } else {
                    next();
                }
            })
        )
    }

    //********************** DATABASE INTERPRETER Email All Ready Exist Checked ************************************* */
    validateVerifyEmailCheckDB1() {
        return (
            compose().use(async (req, res, next) => {
                let [RowDataPacket] = await Service.userService.findVerifyEmail1(req.body.email);
                if (RowDataPacket) {
                    var errors = {
                        success: false,
                        status: 200,
                        msg: "This Email Is Already Registered"
                    };
                    return res.status(200).send(errors);
                } else {
                    next();
                }
            })
        )
    }

    //********************** DATABASE User Email AUTHENTICATE Checked ************************************* */
    validateUserEmailAuthCheckDB() {
        return (
            compose().use(async (req, res, next) => {
                const [RowDataPacket] = await Service.userService.findByEmail(req.body.email);
                console.log(RowDataPacket)
                if (!RowDataPacket) {
                    var errors = {
                        success: false,
                        status: 200,
                        msg: "No Data Was Found With The Given Email"
                    };
                    return res.status(200).send(errors);
                } else {
                    console.log(req.user)
                    req.user = RowDataPacket
                    next();
                }
            })
        )
    }

    //********************** DATABASE User PHONE NO Al Ready Exist Checked ************************************* */
    validateVerifyPhoneCheckDB() {
        return (
            compose().use(async (req, res, next) => {
                let [RowDataPacket] = await Service.userService.findVerifyPhone(req.body.phone);
                if (RowDataPacket) {
                    var errors = {
                        success: false,
                        status: 200,
                        msg: "This Phone No Is Already Registered"
                    };
                    return res.status(200).send(errors);
                } else {
                    next();
                }
            })
        )
    }

    //********************** DATABASE INTERPRETER PHONE NO Al Ready Exist Checked ************************************* */
    validateVerifyPhoneCheckDB1() {
        return (
            compose().use(async (req, res, next) => {
                let [RowDataPacket] = await Service.userService.findVerifyPhone1(req.body.phone);
                if (RowDataPacket) {
                    var errors = {
                        success: false,
                        status: 200,
                        msg: "This Phone No Is Already Registered"
                    };
                    return res.status(200).send(errors);
                } else {
                    next();
                }
            })
        )
    }

    //********************** DATABASE INTERPRETER PHONE NO Al Ready Exist Checked ************************************* */
    validateVerifyPhoneCheckDB1() {
        return (
            compose().use(async (req, res, next) => {
                let [RowDataPacket] = await Service.userService.findVerifyPhone(req.body.phone);
                if (RowDataPacket) {
                    var errors = {
                        success: false,
                        status: 200,
                        msg: "This Phone No Is Already Registered"
                    };
                    return res.status(200).send(errors);
                } else {
                    next();
                }
            })
        )
    }

    //********************** DATABASE User PHONE NO Al Ready Exist Checked ************************************* */
    validateUserByIdCheckDB() {
        return (
            compose().use(async (req, res, next) => {
                let [RowDataPacket] = await Service.userService.findById(req.user.id);
                if (!RowDataPacket) {
                    var errors = {
                        success: false,
                        status: 200,
                        msg: "No User Found With Given Id"
                    };
                    return res.status(200).send(errors);
                } else {
                    req.user = RowDataPacket;
                    next();
                }
            })
        )
    }

    //********************** DATABASE User PHONE NO Al Ready Exist Checked ************************************* */
    validateUserByIdWithPassCheckDB() {
        return (
            compose().use(async (req, res, next) => {
                let [RowDataPacket] = await Service.userService.findByIdWithPass(req.user.id);
                if (!RowDataPacket) {
                    var errors = {
                        success: false,
                        status: 200,
                        msg: "No User Found With Given Id"
                    };
                    return res.status(200).send(errors);
                } else {
                    req.user = RowDataPacket;
                    next();
                }
            })
        )
    }

    //********************** DATABASE User PHONE NO Al Ready Exist Checked ************************************* */
    validateEmailAndPhoneDB() {
        return (
            compose().use(async (req, res, next) => {
                let [RowDataPacket] = await Service.userService.verifyPhoneAndEmail(req.body.phone, req.body.email);
                if (RowDataPacket) {
                    req.user = RowDataPacket;
                    next();
                } else {
                    next();
                }
            })
        )
    }

    //********************** DATABASE User PHONE NO Al Ready Exist Checked ************************************* */
    validateUserVerificationDB() {
        return (
            compose().use(async (req, res, next) => {
                const { phone, email } = req.body;
                let [RowDataPacket] = await Service.userService.checkedUserVerification(phone, email);
                if (RowDataPacket) {
                    var errors = {
                        success: false,
                        status: 200,
                        msg: "This email or phone is already register"
                    };
                    return res.status(200).send(errors);
                } else {
                    next();
                }
            })
        )
    }

    //********************** DATABASE Interpreter PHONE NO Al Ready Exist Checked ************************************* */
    validateInterpreterVerificationDB() {
        return (
            compose().use(async (req, res, next) => {
                const { phone, email } = req.body;
                let [RowDataPacket] = await Service.userService.checkedUserVerification1(phone, email);
                if (RowDataPacket) {
                    var errors = {
                        success: false,
                        status: 200,
                        msg: "This email or phone is already register"
                    };
                    return res.status(200).send(errors);
                } else {
                    next();
                }
            })
        )
    }

    //********************** DATABASE User Email Varefication ************************************* */
    validateUserByEmailDB() {
        return (
            compose().use(async (req, res, next) => {
                const [RowDataPacket] = await Service.userService.findByEmail(req.body.email);
                delete RowDataPacket.password;
                if (!RowDataPacket) {
                    var errors = {
                        success: false,
                        status: 200,
                        msg: "This Email Was Not Register"
                    };
                    return res.status(200).send(errors);
                } else {
                    req.user = RowDataPacket
                    next();
                }
            })
        )
    }

    //********************** DATABASE User Email Varefication ************************************* */
    validateUserByPhoneDB() {
        return (
            compose().use(async (req, res, next) => {
                const RowDataPacket = await Service.userService.findByPhone(req.body.phone);
                delete RowDataPacket.password;
                console.log(RowDataPacket)
                if (RowDataPacket.length == 0) {
                    var errors = {
                        success: false,
                        status: 200,
                        msg: "This Phone Was Not Register"
                    };
                    return res.status(200).send(errors);
                } else {
                    req.user = RowDataPacket
                    next();
                }
            })
        )
    }

    //********************** DATABASE ROLE NAME CHECK Varefication ************************************* */
    validateCheckRoleNameDB() {
        return (
            compose().use(async (req, res, next) => {
                const [RowDataPacket] = await Service.roleService.findByName(req.body.role_name);
                console.log(RowDataPacket)
                if (RowDataPacket) {
                    var errors = {
                        success: false,
                        status: 200,
                        msg: "Role Name Is Already Existed"
                    };
                    return res.status(200).send(errors);
                } else {
                    next();
                }
            })
        )
    }

    //********************** DATABASE Booking Interpreter CHECK current Booking Varefication ************************************* */
    validateCurrentBookingCheckDB() {
        return (
            compose().use(async (req, res, next) => {

                const [RowDataPacket] = await Service.bookingInterpreterService.findAcceptBooking(req.params.id);

                if (!RowDataPacket) {
                    var errors = {
                        success: false,
                        status: 200,
                        msg: "No Booking Is Found"
                    };
                    return res.status(200).send(errors);
                } else {
                    req.booking = RowDataPacket;
                    next();
                }
            })
        )
    }

    // //********************** DATABASE Booking Interpreter CHECK current Booking completed Varefication ************************************* */
    // validateCurrentBookingCompletedCheckDB() {
    //     return (
    //         compose().use(async (req, res, next) => {

    //             const [RowDataPacket] = await Service.bookingInterpreterService.findCompletedBooking(req.params.id);

    //             if (!RowDataPacket) {
    //                 var errors = {
    //                     success: false,
    //                     status: 200,
    //                     msg: "Booking Is Already Completed"
    //                 };
    //                 return res.status(200).send(errors);
    //             } else {
    //                 // req.booking = RowDataPacket;
    //                 next();
    //             }
    //         })
    //     )
    // }

    //********************** DATABASE ROLE BY ID CHECK Varefication ************************************* */
    validateRoleByIDDB() {
        return (
            compose().use(async (req, res, next) => {
                const [RowDataPacket] = await Service.roleService.findById(req.params.id);
                if (!RowDataPacket) {
                    var errors = {
                        success: false,
                        status: 200,
                        msg: "No Role Is Found With Given Id"
                    };
                    return res.status(200).send(errors);
                } else {
                    req.role = RowDataPacket;
                    next();
                }
            })
        )
    }

    //********************** DATABASE Occation NAME CHECK Varefication ************************************* */
    validateCheckOccationNameDB() {
        return (
            compose().use(async (req, res, next) => {
                const [RowDataPacket] = await Service.occationService.findByName(req.body.name);
                console.log(RowDataPacket)
                if (RowDataPacket) {
                    var errors = {
                        success: false,
                        status: 200,
                        msg: "Occation Name Is Already Existed"
                    };
                    return res.status(200).send(errors);
                } else {
                    next();
                }
            })
        )
    }

    //********************** DATABASE OCCATION BY ID CHECK Varefication ************************************* */
    validateOccationByIDDB() {
        return (
            compose().use(async (req, res, next) => {
                const [RowDataPacket] = await Service.occationService.findById(req.params.id);
                if (!RowDataPacket) {
                    var errors = {
                        success: false,
                        status: 200,
                        msg: "No Occation Is Found With Given Id"
                    };
                    return res.status(200).send(errors);
                } else {
                    req.occation = RowDataPacket;
                    next();
                }
            })
        )
    }

    //********************** DATABASE CATEGORY NAME CHECK Varefication ************************************* */
    validateCheckCategoryNameDB() {
        return (
            compose().use(async (req, res, next) => {
                const [RowDataPacket] = await Service.categoryService.findByName(req.body.category_name);
                console.log(RowDataPacket)
                if (RowDataPacket) {
                    var errors = {
                        success: false,
                        status: 200,
                        msg: "Category Name Is Already Existed"
                    };
                    return res.status(200).send(errors);
                } else {
                    next();
                }
            })
        )
    }

    //********************** DATABASE CATEGORY BY ID CHECK Varefication ************************************* */
    validateCategoryByIDDB() {
        return (
            compose().use(async (req, res, next) => {
                const [RowDataPacket] = await Service.categoryService.findById(req.params.id);
                if (!RowDataPacket) {
                    var errors = {
                        success: false,
                        status: 200,
                        msg: "No Category Is Found With Given Id"
                    };
                    return res.status(200).send(errors);
                } else {
                    req.category = RowDataPacket;
                    next();
                }
            })
        )
    }

    //********************** DATABASE LANGEUAGE NAME CHECK Varefication ************************************* */
    validateCheckLanguageNameDB() {
        return (
            compose().use(async (req, res, next) => {
                const [RowDataPacket] = await Service.languageService.findByName(req.body.language_name);
                console.log(RowDataPacket)
                if (RowDataPacket) {
                    var errors = {
                        success: false,
                        status: 200,
                        msg: "Language Name Is Already Existed"
                    };
                    return res.status(200).send(errors);
                } else {
                    next();
                }
            })
        )
    }

    //********************** DATABASE LANGUAGE BY ID CHECK Varefication ************************************* */
    validateLanguageByIDDB() {
        return (
            compose().use(async (req, res, next) => {
                const [RowDataPacket] = await Service.languageService.findById(req.params.id);
                if (!RowDataPacket) {
                    var errors = {
                        success: false,
                        status: 200,
                        msg: "No Language Is Found With Given Id"
                    };
                    return res.status(200).send(errors);
                } else {
                    req.language = RowDataPacket;
                    next();
                }
            })
        )
    }

    //********************** DATABASE PACKAGE NAME CHECK VALIDATE ************************************* */
    validateCheckPackageNameDB() {
        return (
            compose().use(async (req, res, next) => {
                const [RowDataPacket] = await Service.packagesService.findByName(req.body.name);
                if (RowDataPacket) {
                    var errors = {
                        success: false,
                        status: 200,
                        msg: "Package Name Is Already Existed"
                    };
                    return res.status(200).send(errors);
                } else {
                    next();
                }
            })
        )
    }

    //********************** DATABASE Package BY ID CHECK Varefication ************************************* */
    validatePackageByIDDB() {
        return (
            compose().use(async (req, res, next) => {
                const [RowDataPacket] = await Service.packagesService.findById(req.params.id);
                if (!RowDataPacket) {
                    var errors = {
                        success: false,
                        status: 200,
                        msg: "No Package Is Found With Given Id"
                    };
                    return res.status(200).send(errors);
                } else {
                    req.package = RowDataPacket;
                    next();
                }
            })
        )
    }

    //********************** DATABASE Package BY Body ID CHECK Varefication ************************************* */
    validatePackageByBodyIDDB() {
        return (
            compose().use(async (req, res, next) => {
                const [RowDataPacket] = await Service.packagesService.findById1(req.body.package_id);
                if (!RowDataPacket) {
                    var errors = {
                        success: false,
                        status: 200,
                        msg: "No Package Is Found With Given Id"
                    };
                    return res.status(200).send(errors);
                } else {
                    req.package = RowDataPacket;
                    next();
                }
            })
        )
    }

    //********************** DATABASE Package BY Current Package CHECK Varefication ************************************* */
    validatePackageByCurrentPackageIDDB() {
        return (
            compose().use(async (req, res, next) => {
                const [RowDataPacket] = await Service.packagesService.findById1(req.user.current_package);
                if (!RowDataPacket) {
                    var errors = {
                        success: false,
                        status: 200,
                        msg: "No Package Is Found With Given Id"
                    };
                    return res.status(200).send(errors);
                } else {
                    req.current_package = RowDataPacket;
                    next();
                }
            })
        )
    }

    //********************** DATABASE COMMENT AND RATING CHECKED BY UNIQUE BOOKING COMMENT ************************************* */
    validateUniqueBookingCheckedDB() {
        return (
            compose().use(async (req, res, next) => {
                const { booking, interpreter } = req.body
                const [RowDataPacket] = await Service.commentAndRatingService.findById(booking);
                if (RowDataPacket) {
                    var errors = {
                        success: false,
                        status: 200,
                        msg: "You Already Comment And Rate On This Booking"
                    };
                    return res.status(200).send(errors);
                } else {
                    next();
                }
            })
        )
    }

    //********************** DATABASE COMMENT AND RATING CHECKED BY UNIQUE BOOKING COMMENT ************************************* */
    validateCheckBookingById() {
        return (
            compose().use(async (req, res, next) => {

                const [RowDataPacket] = await Service.bookingInterpreterService.findById(req.params.id);
                if (!RowDataPacket) {
                    var errors = {
                        success: false,
                        status: 200,
                        msg: "No Booking Is Found"
                    };
                    return res.status(200).send(errors);
                } else {
                    req.booking = RowDataPacket;
                    next();
                }
            })
        )
    }

    //********************** THIRD PARTY DATABASE USER validate By Id OR CREATE BY EMAIL ************************************* */
    validateCheckSubscription() {
        return (
            compose().use(async (req, res, next) => {
                try {
                    const { data } = await Service.stripeService.findSubscriptions({ customer: req.user.stripe_c_id, limit: 1 });
                    if (data.length > 0) {
                        return res.status(200).send({ success: false, status: 200, msg: "Your Subscription is Active" });
                    } else {
                        next()
                    }
                } catch (error) {
                    res.status(500).send({ success: false, status: 500, msg: error.message });
                }
            })
        )
    }

    //********************** THIRD PARTY DATABASE SUBSCRIPTION validate By CUSTOMER ************************************* */
    validateSubscriptionById() {
        return (
            compose().use(async (req, res, next) => {
                try {
                    const { data } = await Service.stripeService.findSubscriptions({ customer: req.user.stripe_c_id, limit: 1 });

                    if (data.length > 0) {
                        req.user.subscription = data[0].id;
                        next()
                    } else {
                        return res.status(200).send({ success: false, status: 200, msg: "No Subscription Is Find" });
                    }
                } catch (error) {
                    res.status(500).send({ success: false, status: 500, msg: error.message });
                }
            })
        )
    }

    //********************** DATABASE Current Booking Checked By User Id validate ************************************* */
    validateCurrentBookingByUserId() {
        return (
            compose().use(async (req, res, next) => {
                try {
                    const [data] = await Service.bookingInterpreterService.findCurrentBookingByUserId(req.user.id);

                    if (data) {
                        req.booking = data;
                        next()
                    } else {
                        return res.status(200).send({ success: false, status: 200, msg: "No Booking Has Found" });
                    }
                } catch (error) {
                    res.status(500).send({ success: false, status: 500, msg: error.message });
                }
            })
                .use(this.validateGetAndAttachedLangToBooking())
                .use(this.validateGetAndAttachedInterpreterToBooking())
        )
    }

    //********************** DATABASE Current Booking Checked By User Id validate ************************************* */
    validateCurrentBookingByInterpreterId() {
        return (
            compose()
                .use(async (req, res, next) => {
                    try {
                        const [assign] = await Service.assignInterpreterService.findByInterpreterId(req.user.id);
                        if (!assign) {
                            return res.status(200).send({ success: false, status: 200, msg: "No Booking Has Found" });
                        } else {
                            const data = await Service.bookingInterpreterService.findByBookingId(assign.booking);

                            if (!data) {
                                return res.status(200).send({ success: false, status: 200, msg: "No Booking Has Found" });
                            }
                            const [transLang] = await Service.languageService.findById(assign.language)
                            if (!transLang) transLang = {}


                            let [clientLang] = await Service.speakService.findByUserId(data.user_id);
                            if (!clientLang) clientLang = {}

                            delete data.primary_language

                            req.booking = data;
                            req.booking.requireLanguage = transLang;
                            req.booking.clientLanguage = clientLang;
                            next()
                        }
                    } catch (error) {
                        res.status(500).send({ success: false, status: 500, msg: error.message });
                    }
                })
                .use(async (req, res, next) => {
                    try {
                        const [client] = await Service.userService.findCurrentBookingUser(req.booking.user_id);
                        if (!client) {
                            return res.status(200).send({ success: false, status: 200, msg: "No Client Has Found" });
                        } else {
                            delete req.booking.user_id
                            req.booking.client = client;
                            next()

                        }
                    } catch (error) {
                        res.status(500).send({ success: false, status: 500, msg: error.message });
                    }
                })
        )
    }

    //********************** DATABASE Get And Attached Langeuage To Booking validate ************************************* */
    validateGetAndAttachedLangToBooking() {
        return (
            compose().use(async (req, res, next) => {
                try {
                    const data = await Service.bookingLangService.findByBookingId(req.booking.id);
                    if (data.length > 0) {
                        let modify = [];
                        data.map(async (item, index, arr) => {
                            const [RowDataPacket] = await Service.languageService.findById(item.language)
                            delete item.id;
                            delete item.language;
                            delete item.booking;
                            item.name = RowDataPacket.language_name;
                            modify.push(item)
                            if (index == arr.length - 1) {
                                req.booking.translating_language = modify;
                                next()
                            }
                        })
                    } else {
                        req.booking.translating_language = [];
                        next()
                    }
                } catch (error) {
                    res.status(500).send({ success: false, status: 500, msg: error.message });
                }
            })
        )
    }

    //********************** DATABASE Get And Attached Langeuage To Booking validate ************************************* */
    validateGetAndAttachedInterpreterToBooking() {
        return (
            compose().use(async (req, res, next) => {
                try {
                    const data = await Service.assignInterpreterService.findByBookingId(req.booking.id);
                    if (data.length > 0) {
                        let modify = [];
                        data.map(async (item, index, arr) => {
                            const [RowDataPacket] = await Service.userService.findById(item.interpreter)
                            modify.push(RowDataPacket)
                            if (index == arr.length - 1) {
                                req.booking.interpreter_id = modify;
                                next()
                            }
                        })
                    } else {
                        req.booking.interpreter_id = [];
                        next()
                    }
                } catch (error) {
                    res.status(500).send({ success: false, status: 500, msg: error.message });
                }
            })
        )
    }

    //********************** DATABASE SUBSCRIPTION BY PACKAGE ID CHECK Varefication ************************************* */
    // validatePackageByIDDB() {
    //     return (
    //         compose().use(async (req, res, next) => {
    //             const [RowDataPacket] = await Service.subscriptionService.findById(req.body.package_id);
    //             console.log(RowDataPacket)
    //             if (!RowDataPacket) {
    //                 var errors = {
    //                     success: false,
    //                     status: 200,
    //                     msg: "No Package Is Found With Given Id"
    //                 };
    //                 return res.status(200).send(errors);
    //             } else {
    //                 req.package = RowDataPacket;
    //                 next();
    //             }
    //         })
    //     )
    // }

}