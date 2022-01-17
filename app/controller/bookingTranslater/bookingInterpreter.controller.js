const bookingInterpreterService = require("../../service/bookingInterpreter.service");
const { sendToAdmin } = require("../../constants/notifications");
const { findByArray: findLanguage, findById: findByIdLang, findLanguageArrayId } = require("../../service/language.service")
const { findById: findOccationById } = require("../../service/occation.service")
const bookingLangService = require("../../service/booking_lang.service")
const assignInterpreterService = require("../../service/assignInterpreter.service")
const userService = require("../../service/user.service")

class BookingInterPreter {

    async create(req, res) {
        try {
            const translating_language = req.body.translating_language
            delete req.body.translating_language

            req.body.user_id = req.user.id;

            delete req.body.primary_language

            const { insertId: bookingOrder } = await bookingInterpreterService.create(req);
            console.log(bookingOrder)
            const result2 = await sendToAdmin(93, "Booking Successfully", { user_id: req.body.user_id, booking_id: bookingOrder, type: 'bookingInterPreter' });
            translating_language.map(async (item) => {
                req.body = { booking: bookingOrder, language: item.language, qty: item.qty }
                await bookingLangService.create(req)
            });
            userService.update(req.user.id, { status: 'active' })

            res.status(200).send({
                status: 200,
                success: true,
                msg: "Booking Request Sent",
                result2
            });
        } catch (error) {
            res.status(500).send({ success: false, status: 500, msg: error.message });
        }
    };

    async currentBooking(req, res) {
        try {

            const [lang] = await findLanguage(JSON.parse(req.booking.primary_language));
            console.log(lang)

            req.booking.primary_language = lang;

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

    async clientBooking(req, res) {
        try {
            let result = await bookingInterpreterService.findByUserId(req.user.id);
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

                        modify.push(item)

                        if (index == arr.length - 1) {
                            return res.status(200).send({
                                status: 200,
                                success: true,
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

    async complete(req, res) {
        try {

            // const result = await bookingInterpreterService.findCheckedBookingInterpreter(r);
            // console.log(result)
            const complete = await bookingInterpreterService.updateStatusCompleted(req.params.id, { status: "completed" });
            const assign = await assignInterpreterService.findByBookingId(req.params.id);
            assign.map(async (item) => {
                await userService.update(item.interpreter, { status: 'inactive' })
            });

            userService.update(req.user.id, { status: 'inactive' })
            assignInterpreterService.update(req.params.id, { active: 0 });

            res.status(200).send({
                status: 200,
                success: true,
                msg: "Event Completed",
                data: { booking: req.params.id }
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };
}

const rolesController = new BookingInterPreter();
module.exports = rolesController;