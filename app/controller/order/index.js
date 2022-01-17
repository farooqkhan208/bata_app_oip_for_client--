const express = require('express');
const ordersController = require("./order.controller");

const { authMiddleware } = require("../../middleware/auth.middleware");
const { roleMiddleware } = require("../../middleware/role.middleware");
const ValidationMiddleware = require("../../middleware/validation.middleware")
const validation = new ValidationMiddleware();

const ordersRouter = express.Router();

// ordersRouter.use(
//     authMiddleware.isAuthenticated(),
//     validation.validateUserByIdCheckDB(),
//     roleMiddleware.isAdmin()
// );

ordersRouter.post("/create",
    // validation.validateCreateRoleJoi(),
    ordersController.create
);

// rolesRouter.get("/get/:id",
//     rolesController.get
// );

ordersRouter.get("/gets",
    ordersController.gets
);

// ordersRouter.delete("/delete/:id",
//     validation.validateRoleByIDDB(),
//     ordersController.delete
// );

module.exports = ordersRouter;