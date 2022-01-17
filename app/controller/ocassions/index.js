const express = require('express');
const occationsController = require("./occation.controller");

const { authMiddleware } = require("../../middleware/auth.middleware");
const { roleMiddleware } = require("../../middleware/role.middleware");
const ValidationMiddleware = require("../../middleware/validation.middleware")
const validation = new ValidationMiddleware();

const occationsRouter = express.Router();

occationsRouter.use(
    authMiddleware.isAuthenticated(),
    validation.validateUserByIdCheckDB(),
    roleMiddleware.isUser()
);

occationsRouter.get("/gets",
    occationsController.gets
);

module.exports = occationsRouter;