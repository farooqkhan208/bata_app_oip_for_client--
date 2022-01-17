const orderService = require("../../service/order.service")

class Orders {

    async create(req, res) {
        try {
            const result = await orderService.create(req)
            res.status(200).send({
                status: 200,
                success: true,
                msg: "Order Has Been Created",
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };

    // async get(req, res) {
    //     try {

    //         const result = await roleService.findOne({ _id: req.params.id })
    //         console.log(req.body)
    //         res.status(200).send({
    //             status: 200,
    //             success: true,
    //             msg: "Role Has Been Fetched",
    //             data: result,
    //         });
    //     } catch (error) {
    //         res.status(500).send({ success: false, msg: error.message });
    //     }
    // };

    async gets(req, res) {
        try {

            const result = await orderService.find();
            res.status(200).send({
                status: 200,
                success: true,
                msg: "All Order Has Been Fetched",
                totalRole: result.length,
                data: result,
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };

    async delete(req, res) {
        try {

            const result = await orderService.delete(req.params.id)
            res.status(200).send({
                status: 200,
                success: true,
                msg: "Order Has Been Deleted",
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };

    async update(req, res) {
        try {

            const result = await orderService.update(req.params.id, req.body)
            console.log(req.body)
            res.status(200).send({
                status: 200,
                success: true,
                msg: "Order Has Been Updated",
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };
}

const ordersController = new Orders();
module.exports = ordersController;