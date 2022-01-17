const adminOccationService = require("../../../service/occation.service")

class AdminOccations {

    async create(req, res) {
        try {
            const result = await adminOccationService.create(req)
            res.status(200).send({
                status: 200,
                success: true,
                msg: "Occation Has Been Created",
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };

    async activeOrInactive(req, res) {
        try {
            const [result] = await adminOccationService.findById(req.params.id);
            console.log(result)
            let msg;
            if (result.status == 1) {
                await adminOccationService.update(req.params.id, { status: 0 });
                msg = 'Inactive Successfully'

            } else if (result.status == 0) {
                await adminOccationService.update(req.params.id, { status: 1 });
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

    // async gets(req, res) {
    //     try {

    //         const result = await adminOccationService.find();
    //         res.status(200).send({
    //             status: 200,
    //             success: true,
    //             msg: "All Occations Has Been Fetched",
    //             totalRole: result.length,
    //             data: result,
    //         });
    //     } catch (error) {
    //         res.status(500).send({ success: false, msg: error.message });
    //     }
    // };

    async delete(req, res) {
        try {

            const result = await adminOccationService.delete(req.params.id)
            res.status(200).send({
                status: 200,
                success: true,
                msg: "Occation Has Been Deleted",
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };

    async update(req, res) {
        try {

            const result = await adminOccationService.update(req.params.id, req.body)
            console.log(req.body)
            res.status(200).send({
                status: 200,
                success: true,
                msg: "Occation Has Been Updated",
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };
}

const adminOccationsController = new AdminOccations();
module.exports = adminOccationsController;