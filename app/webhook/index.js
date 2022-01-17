const express = require('express');
const webhooksController = require("./webhook.controller");

const { authMiddleware } = require("../middleware/auth.middleware");
const { roleMiddleware } = require("../middleware/role.middleware");
const ValidationMiddleware = require("../middleware/validation.middleware")

const validation = new ValidationMiddleware();

const webhooksRouter = express.Router();

// webhooksRouter.use(
//     authMiddleware.isAuthenticated(),
//     validation.validateUserByIdCheckDB(),
//     roleMiddleware.isAdmin()
// );

webhooksRouter.post("/",

    webhooksController.webHook
);

module.exports = webhooksRouter;