const bookingInterpreterService = require("../../../service/bookingInterpreter.service");
// const { sendToAdmin } = require("../../../constants/notifications");
const { findById: findByIdLang } = require("../../../service/language.service")
const { findById: findOccationById } = require("../../../service/occation.service")
// const bookingLangService = require("../../../service/booking_lang.service")
const assignInterpreterService = require("../../../service/assignInterpreter.service")
const userService = require("../../../service/user.service")
const speakService = require("../../../service/speakLanguage.service")

class InterpreterBookingInterPreter {

    async currentBooking(req, res) {
        try {
            const [occation] = await findOccationById(req.booking.occasion)
            req.booking.occasion = occation;

            res.status(200).send({
                status: 200,
                success: true,
                msg: "Fetched Successfully",
                data: req.booking,
            });

        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };

    async bookingHistory(req, res) {
        try {
            const totalAssign = await assignInterpreterService.findHistoryInterpreterId(req.user.id);
            if (totalAssign.length == 0) res.status(200).send({ status: 200, success: true, msg: "No Data Found", data: [] });

            let result = await bookingInterpreterService.findByArrayId(totalAssign);

            if (result.length > 0) {
                let modify = []
                if (result.length > 0) {
                    result.map(async (item, index, arr) => {
                        if (item) {
                            const [occa] = await findOccationById(item.occasion)
                            item.occasion = occa;

                            const [userLang] = await speakService.findByUserId(item.user_id);

                            const [lang] = await findByIdLang(userLang.language);

                            item.primary_language = lang;

                            const [transLanguage] = await assignInterpreterService.findByBothId(req.user.id, item.id)
                            const [assignLanguage] = await findByIdLang(transLanguage.language);

                            item.translating_language = assignLanguage;

                            const [client] = await userService.findByIdForComment(item.user_id);
                            item.client = client;

                            delete item.user_id

                            modify.push(item)
                        } else {
                            modify.push({})
                        }

                        if (index == arr.length - 1) {
                            return res.status(200).send({
                                status: 200,
                                success: true,
                                msg: "Fetched Succesfully",
                                count: modify.length,
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
}

const InterpreterBookingsController = new InterpreterBookingInterPreter();
module.exports = InterpreterBookingsController;