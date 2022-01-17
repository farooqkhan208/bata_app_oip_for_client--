const express = require('express');
const adminCommentAndRatingsController = require("./commentAndRatings.controller");

const { authMiddleware } = require("../../../middleware/auth.middleware");
const { roleMiddleware } = require("../../../middleware/role.middleware");
const ValidationMiddleware = require("../../../middleware/validation.middleware")
const validation = new ValidationMiddleware();

const adminCommentAndRatingsRouter = express.Router();

adminCommentAndRatingsRouter.use(
    authMiddleware.isAuthenticated(),
    validation.validateUserByIdCheckDB(),
    roleMiddleware.isUser()
);

adminCommentAndRatingsRouter.get("/gets",
    adminCommentAndRatingsController.gets
);

module.exports = adminCommentAndRatingsRouter;