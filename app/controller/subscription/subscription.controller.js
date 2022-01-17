const subscriptionService = require("../../service/subscription.service")
const { attachedTokenToCustomer, createSubscription, createOrGetCustomer4, deleteSubscription, createProduct, createPlan } = require("../../service/stripe.service")
const { update: userUpdate } = require("../../service/user.service");
const packageService = require("../../service/packages.service")

class Subscription {

    async create(req, res) {
        try {
            const { id: customerId } = await createOrGetCustomer4({ name: req.user.first_name, email: req.user.email })
            const { default_source } = await attachedTokenToCustomer(customerId, req.body.stripeToken)
            delete req.body.stripeToken;
            const { id: packageId, price, stripe_p_id } = req.package
            const _data = {
                customer: customerId,
                items: [
                    { plan: stripe_p_id }
                ]
            }
            const { id: subsId } = await createSubscription(_data);

            req.body.client_id = req.user.id;
            req.body.amount = price;
            req.body.stripe_s_id = subsId;

            delete req.body.stripe_p_id;

            await subscriptionService.create(req);
            userUpdate(req.user.id, { current_package: packageId, previous_package: req.user.current_package })

            res.status(200).send({
                status: 200,
                success: true,
                msg: "Subscribed Successfully",
                data: req.package
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };

    async customSubcribe(req, res) {
        try {
            //create Custom package
            req.body.name = "Custom Package";
            const stripeToken = req.body.stripeToken;
            delete req.body.stripeToken;
            req.body.description = [];
            const { id: productId } = await createProduct({ name: req.body.name });
            const { id: planId } = await createPlan({
                amount: req.body.price * 100,
                currency: "usd",
                interval: "month",
                product: productId
            });

            req.body.stripe_p_id = planId;
            req.body.created_by = req.user.id;
            req.body.description = JSON.stringify(req.body.description);

            const { insertId } = await packageService.create(req)
            const [packages] = await packageService.findById1(insertId)

            //create Custom package end//////////////////////////
            const { id: customerId } = await createOrGetCustomer4({ name: req.user.first_name, email: req.user.email })
            // const { default_source } = await attachedTokenToCustomer(customerId, req.body.stripeToken)
            const { id: packageId, price, stripe_p_id } = packages;

            const _data = {
                customer: customerId,
                items: [
                    { plan: planId }
                ]
            }
            const { id: subsId } = await createSubscription(_data);
            req.body.client_id = req.user.id;
            req.body.amount = price;
            req.body.stripe_s_id = subsId;
            req.body.package_id = packageId;

            delete req.body.stripe_p_id;
            delete req.body.price;
            delete req.body.package_limit;
            delete req.body.name;
            delete req.body.description;
            delete req.body.created_by

            subscriptionService.create(req);
            userUpdate(req.user.id, { current_package: packageId, previous_package: req.user.current_package })

            res.status(200).send({
                status: 200,
                success: true,
                msg: "Subscribed Successfully",
                data: packages
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };

    async get(req, res) {
        try {

            res.status(200).send({
                status: 200,
                success: true,
                msg: "Subscribed Successfully",
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };

    async cancel(req, res) {
        try {
            await deleteSubscription(req.user.subscription);
            await userUpdate(req.user.id, { current_package: null, previous_package: req.user.current_package });
            subscriptionService.update(req.user.id, req.params.id, { status: 0 });
            res.status(200).send({
                status: 200,
                success: true,
                msg: "Canceled Successfully",
                data: { current_package: null, previous_package: req.current_package.id }
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };

    async update(req, res) {
        try {
            await deleteSubscription(req.user.subscription);
            await userUpdate(req.user.id, { current_package: null, previous_package: req.user.current_package });
            subscriptionService.update(req.user.id, req.user.current_package, { status: 0 });

            // const { id: customerId } = await createOrGetCustomer4({ name: req.user.first_name, email: req.user.email })
            // const { default_source } = await attachedTokenToCustomer(customerId, req.body.stripeToken)
            delete req.body.stripeToken
            const { id: packageId, price, stripe_p_id } = req.package
            const _data = {
                customer: req.user.stripe_c_id,
                items: [
                    { plan: stripe_p_id }
                ]
            }
            const { id: subsId } = await createSubscription(_data);
            req.body.client_id = req.user.id;
            req.body.amount = price;
            req.body.stripe_s_id = subsId;

            subscriptionService.create(req);
            userUpdate(req.user.id, { current_package: packageId, previous_package: req.user.current_package });

            res.status(200).send({
                status: 200,
                success: true,
                msg: "Updated Successfully",
                data: req.package
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };
}

const subscriptionsController = new Subscription();
module.exports = subscriptionsController;