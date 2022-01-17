const userService = require("../../../service/user.service");
const speaksService = require("../../../service/speakLanguage.service");
const bcrypt = require("bcrypt")

class AdminInterpreter {

    async create(req, res) {
        try {
            const userLanguage = req.body.language;
            delete req.body.language;
            delete req.body.confirmPassword;
            req.body.password = await bcrypt.hash(req.body.password, 10)
            const { insertId } = await userService.create(req);

            speaksService.createOrIgnore(insertId, userLanguage)
            res.status(200).send({
                status: 200,
                success: true,
                msg: "Interpreter Has Been Created",
                // data: req.body
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };

    async activeInterpreter(req, res) {
        try {

            const interpreters = await userService.findActiveInterpreter();
            res.status(200).send({
                status: 200,
                success: true,
                msg: "Fetched Successfully",
                data: interpreters
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

            const result = await userService.find();
            res.status(200).send({
                status: 200,
                success: true,
                msg: "All Role Has Been Fetched",
                totalRole: result.length,
                data: result,
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };

    async delete(req, res) {
        try {

            const result = await userService.delete(req.params.id)
            res.status(200).send({
                status: 200,
                success: true,
                msg: "Role Has Been Deleted",
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };

    async update(req, res) {
        try {

            const result = await userService.update(req.params.id, req.body)
            console.log(result)
            res.status(200).send({
                status: 200,
                success: true,
                msg: "Role Has Been Updated",
            });
        } catch (error) {
            res.status(500).send({ success: false, msg: error.message });
        }
    };
}

const adminInterpretersController = new AdminInterpreter();
module.exports = adminInterpretersController;