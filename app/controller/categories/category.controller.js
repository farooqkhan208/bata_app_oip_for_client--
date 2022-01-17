const categoryService = require("../../service/category.service")

class Categories {

    async create(req, res) {
        try {
            const result = await categoryService.create(req)
            res.status(200).send({
                status: 200,
                success: true,
                msg: "Category Has Been Created",
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };

    async gets(req, res) {
        try {

            const result = await categoryService.find();
            res.status(200).send({
                status: 200,
                success: true,
                msg: "All Categories Has Been Fetched",
                totalRole: result.length,
                data: result,
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };

    async delete(req, res) {
        try {

            const result = await categoryService.delete(req.params.id)
            res.status(200).send({
                status: 200,
                success: true,
                msg: "Category Has Been Deleted",
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };

    async update(req, res) {
        try {

            const result = await categoryService.update(req.params.id, req.body)
            console.log(req.body)
            res.status(200).send({
                status: 200,
                success: true,
                msg: "Category Has Been Updated",
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };
}

const categoriesController = new Categories();
module.exports = categoriesController;