const express = require('express');
const usersAdminController = require("./userAdmin.controller");

const { authMiddleware } = require("../../../middleware/auth.middleware");
const { roleMiddleware } = require("../../../middleware/role.middleware");
const ValidationMiddleware = require("../../../middleware/validation.middleware")
const validation = new ValidationMiddleware();

const usersAdminRouter = express.Router();

usersAdminRouter.use(
    authMiddleware.isAuthenticated(),
    validation.validateUserByIdCheckDB(),
    roleMiddleware.isAdmin()
);

// usersAdminRouter.post("/create",
//     validation.validateCreateRoleJoi(),
//     usersAdminController.create
// );

usersAdminRouter.put("/block/:id",
    usersAdminController.block
);

usersAdminRouter.get("/getAllUsers",
    usersAdminController.gets
);

usersAdminRouter.delete("/delete/:id",
    validation.validateRoleByIDDB(),
    usersAdminController.delete
);

usersAdminRouter.put("/update/:id",
    validation.validateRoleByIDDB(),
    validation.validateCreateRoleJoi(),
    usersAdminController.update
);

module.exports = usersAdminRouter;