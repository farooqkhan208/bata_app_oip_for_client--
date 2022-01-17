const express = require('express');
const commentAndRatingsController = require("./commentAndRatings.controller");

const { authMiddleware } = require("../../middleware/auth.middleware");
const { roleMiddleware } = require("../../middleware/role.middleware");
const ValidationMiddleware = require("../../middleware/validation.middleware")
const validation = new ValidationMiddleware();

const commentAndRatingsRouter = express.Router();


commentAndRatingsRouter.use(
    authMiddleware.isAuthenticated(),
    validation.validateUserByIdCheckDB(),
    roleMiddleware.isInterpreter()
);

commentAndRatingsRouter.get("/reviewAndRate",
    commentAndRatingsController.getReviewAndRateForInterpreter
);

commentAndRatingsRouter.get("/reviewOfUser",
    commentAndRatingsController.getReviewOfUserForInterpreter
);

commentAndRatingsRouter.get("/reviewOfUser",
    commentAndRatingsController.getReviewOfUserForInterpreter
);

module.exports = commentAndRatingsRouter;