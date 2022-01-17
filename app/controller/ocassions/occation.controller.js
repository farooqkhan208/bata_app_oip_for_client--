const occationService = require("../../service/occation.service")

class Occations {

    async gets(req, res) {
        try {

            const result = await occationService.find();
            res.status(200).send({
                status: 200,
                success: true,
                msg: "All Occations Has Been Fetched",
                count: result.length,
                data: result,
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };
}

const occationsController = new Occations();
module.exports = occationsController;