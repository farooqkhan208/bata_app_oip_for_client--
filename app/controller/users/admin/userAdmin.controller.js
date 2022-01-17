const userService = require("../../../service/user.service")

class UserAdmin {

    // async create(req, res) {
    //     try {
    //         const result = await userService.create(req)
    //         res.status(200).send({
    //             status: 200,
    //             success: true,
    //             msg: "InterPreter Has Been Created",
    //         });
    //     } catch (error) {
    //         res.status(500).send({ success: false, msg: error.message });
    //     }
    // };

    async block(req, res) {
        try {
            const [user] = await userService.findById(req.params.id);
            let msg;
            if (user.blocked == 1) {
                const result = await userService.updateByUserId(req.params.id, { blocked: 0 });
                msg = 'Unblocked Successfully'
            } else if (user.blocked == 0) {
                const result = await userService.updateByUserId(req.params.id, { blocked: 1 });
                msg = 'blocked Successfully'
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

    async gets(req, res) {
        try {

            const result = await userService.findAllUsersWithPagination();
            res.status(200).send({
                status: 200,
                success: true,
                msg: "All Users Has Been Fetched",
                count: result.length,
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
            console.log(req.body)
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

const rolesController = new UserAdmin();
module.exports = rolesController;