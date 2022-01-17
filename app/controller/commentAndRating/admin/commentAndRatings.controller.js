const adminCommentAndRateService = require("../../../service/commentAndRatings.service")

class AdminCommentAndRate {

    async gets(req, res) {
        try {

            const result = await adminCommentAndRateService.adminFind();

            res.status(200).send({
                status: 200,
                success: true,
                msg: "Fetched Successfully",
                totalRole: result.length,
                data: result,
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };

}

const adminPackageController = new AdminCommentAndRate();
module.exports = adminPackageController;