const express = require('express');
const interpretersController = require("./interpreter.controller");

const { authMiddleware } = require("../../middleware/auth.middleware");
const { roleMiddleware } = require("../../middleware/role.middleware");
const ValidationMiddleware = require("../../middleware/validation.middleware")
const validation = new ValidationMiddleware();

const interpretersRouter = express.Router();

interpretersRouter.use(
    authMiddleware.isAuthenticated(),
    validation.validateUserByIdCheckDB(),
    roleMiddleware.isInterpreter()
);

interpretersRouter.get("/getAllInterpreter",
    interpretersController.gets
);

interpretersRouter.put("/onlineOrOffline",
    interpretersController.onlineOrOffline
);

module.exports = interpretersRouter;