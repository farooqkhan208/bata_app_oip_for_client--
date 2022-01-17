const packageService = require("../../service/packages.service")
const stripeService = require("../../service/stripe.service")

class Package {

    async create(req, res) {
        try {
            req.body.name = "Custom Package";
            const { id: productId } = await stripeService.createProduct({ name: req.body.name });
            const { id: planId } = await stripeService.createPlan({
                amount: req.body.price * 100,
                currency: "usd",
                interval: "month",
                product: productId
            });
            req.body.stripe_p_id = planId;
            req.body.created_by = req.user.id;
            const result = await packageService.create(req)
            res.status(200).send({
                status: 200,
                success: true,
                msg: "Package Has Been Created",
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };

    async gets(req, res) {
        try {

            const result = await packageService.find();

            result.map((items) => {
                let dest = JSON.parse(items.description)
                return items.description = dest
            })
            res.status(200).send({
                status: 200,
                success: true,
                msg: "All Package Has Been Fetched",
                count: result.length,
                data: result,
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
                msg: "Package Has Been Deleted",
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };

    async update(req, res) {
        try {

            req.body.description = JSON.stringify(req.body.description);
            const result = await packageService.update(req.params.id, req.body)
            res.status(200).send({
                status: 200,
                success: true,
                msg: "Package Has Been Updated",
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };
}

const packageController = new Package();
module.exports = packageController;