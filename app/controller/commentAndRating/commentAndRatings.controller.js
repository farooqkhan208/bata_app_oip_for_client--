const commentAndRateService = require("../../service/commentAndRatings.service");
const userService = require("../../service/user.service");
const { findById1: findUser } = require("../../service/user.service");
const assignService = require("../../service/assignInterpreter.service");

class CommentAndRate {

    async create(req, res) {
        try {
            req.body.client = req.user.id;
            const comment = await commentAndRateService.create(req)
            res.status(200).send({
                status: 200,
                success: true,
                msg: "Created Successfully",
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };

    async getReviewAndRateForInterpreter(req, res) {
        try {
            const booking = await assignService.findHistoryInterpreterId(req.user.id)
            const data = await commentAndRateService.findByBookingArray(booking);
            let rate = 0;
            data.map((item) => {

                rate = rate + item.rate;
            })
            const aveRate = rate / data.length
            res.status(200).send({
                status: 200,
                success: true,
                msg: "Fetched Successfully",
                data: { rate: aveRate, comment: data.length }
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };

    async getReviewOfUserForInterpreter(req, res) {
        try {
            const booking = await assignService.findHistoryInterpreterId(req.user.id)
            const data = await commentAndRateService.findByBookingArray(booking);
            if (data.length > 0) {
                data.map(async (item, index, arr) => {
                    delete item.interpreter;
                    const [commenter] = await userService.findByIdForComment(item.client);
                    item.client = commenter;
                    if (index == arr.length - 1) {
                        res.status(200).send({
                            status: 200,
                            success: true,
                            msg: "Fetched Successfully",
                            data
                        });
                    }

                })
            } else {
                res.status(200).send({
                    status: 200,
                    success: true,
                    msg: "No Data Found",
                    data: []
                });
            }
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };

    async getInterpreterReview(req, res) {
        try {
            const comment = await commentAndRateService.findByInterpreter(1);
            const user = await findUser(comment.client);
            console.log(user, "lklk")
            // comment.interpreter = await findUser(comment.interpreter);
            res.status(200).send({
                status: 200,
                success: true,
                msg: "Fetched Successfully",
                count: comment.length,
                data: comment,
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };

    async delete(req, res) {
        try {
            const { id: productId } = await stripeService.deletePlan({ name: req.body.name });
            // const result = await packageService.delete(req.params.id)
            res.status(200).send({
                status: 200,
                success: true,
                msg: "Deleted Successfully",
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };

    async update(req, res) {
        try {

            req.body.description = JSON.stringify(req.body.description);
            const result = await commentAndRateService.update(req.params.id, req.body)
            res.status(200).send({
                status: 200,
                success: true,
                msg: "Updated Successfully",
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };
}

const commentAndRateController = new CommentAndRate();
module.exports = commentAndRateController;