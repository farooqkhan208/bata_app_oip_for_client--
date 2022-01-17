const interpreterService = require("../../service/user.service")

class Interpreters {


    async gets(req, res) {
        try {

            const result = await interpreterService.find();
            res.status(200).send({
                status: 200,
                success: true,
                msg: "All Interpreter Has Been Fetched",
                count: result.length,
                data: result,
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };

    async onlineOrOffline(req, res) {
        try {
            const [result] = await interpreterService.findById(req.user.id);

            let msg;
            if (result.online_status == 1) {
                await interpreterService.update(req.user.id, { online_status: 0 });
                msg = 'Inactive Successfully'
            } else if (result.online_status == 0) {
                await interpreterService.update(req.user.id, { online_status: 1 });
                msg = 'Active Successfully'
            }

            res.status(200).send({
                status: 200,
                success: true,
                msg
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };
}

const interpretersController = new Interpreters();
module.exports = interpretersController;