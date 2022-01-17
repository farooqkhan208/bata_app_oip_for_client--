const express = require('express');
const adminInterpretersController = require("./adminInterpreter.controller");

const { authMiddleware } = require("../../../middleware/auth.middleware");
const { roleMiddleware } = require("../../../middleware/role.middleware");
const ValidationMiddleware = require("../../../middleware/validation.middleware")
const validation = new ValidationMiddleware();

const adminInterpretersRouter = express.Router();

adminInterpretersRouter.use(
    authMiddleware.isAuthenticated(),
    validation.validateUserByIdCheckDB(),
    roleMiddleware.isAdmin()
);

adminInterpretersRouter.post("/create",
    validation.validateCreateInterpreterJoi(),
    adminInterpretersController.create
);

adminInterpretersRouter.get("/activeInterpreter",
    adminInterpretersController.activeInterpreter
);

// rolesRouter.get("/get/:id",
//     rolesController.get
// );

// adminInterpretersRouter.get("/gets",
//     adminInterpretersController.gets
// );

// adminInterpretersRouter.delete("/delete/:id",
//     validation.validateRoleByIDDB(),
//     adminInterpretersController.delete
// );

// adminInterpretersRouter.put("/update/:id",
//     validation.validateRoleByIDDB(),
//     validation.validateCreateRoleJoi(),
//     adminInterpretersController.update
// );

module.exports = adminInterpretersRouter;