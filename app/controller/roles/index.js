const express = require('express');
const rolesController = require("./role.controller");

const { authMiddleware } = require("../../middleware/auth.middleware");
const { roleMiddleware } = require("../../middleware/role.middleware");
const ValidationMiddleware = require("../../middleware/validation.middleware")
const validation = new ValidationMiddleware();

const rolesRouter = express.Router();

rolesRouter.get("/gets",
    rolesController.gets
);

rolesRouter.use(
    authMiddleware.isAuthenticated(),
    validation.validateUserByIdCheckDB(),
    roleMiddleware.isAdmin()
);

rolesRouter.post("/create",
    validation.validateCreateRoleJoi(),
    rolesController.create
);

rolesRouter.delete("/delete/:id",
    validation.validateRoleByIDDB(),
    rolesController.delete
);

rolesRouter.put("/update/:id",
    validation.validateRoleByIDDB(),
    validation.validateCreateRoleJoi(),
    rolesController.update
);

module.exports = rolesRouter;