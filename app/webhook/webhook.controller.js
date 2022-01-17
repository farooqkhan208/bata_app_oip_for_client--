const { webhook } = require('../service/stripe.service')
const stripe = require('stripe')

const stripeKey = 'whsec_qlEkbNZQHBOPi62qHCeh9ayoZf31JpLk';

class WebHook {

    async webHook(req, res) {
        // console.log("kkjkjkjkjkj")
        const sig = req.headers['stripe-signature'];
        let event;
        try {
            event = await stripe.webhooks.constructEvent(req.body, sig, stripeKey);
            console.log(event, "oooooo")
            // return
        } catch (err) {
            console.log(err.message)
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }

        // Handle the event
        switch (event.type) {
            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                console.log(paymentIntent)
                // Then define and call a function to handle the event payment_intent.succeeded
                break;
            // ... handle other event types
            default:
                console.log(`Unhandled event type ${event.type}`);
        }

        // Return a 200 response to acknowledge receipt of the event
        res.send();
    }

}

const webHooksController = new WebHook();
module.exports = webHooksController;