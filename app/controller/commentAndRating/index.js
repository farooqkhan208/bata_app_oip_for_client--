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
    roleMiddleware.isUser()
);

commentAndRatingsRouter.get("/getInterpreterReview",
    commentAndRatingsController.getInterpreterReview
);

commentAndRatingsRouter.post("/create",
    validation.validateCreateCommentAndRatingJoi(),
    commentAndRatingsController.create
);

commentAndRatingsRouter.delete("/delete/:id",
    validation.validatePackageByIDDB(),
    commentAndRatingsController.delete
);

commentAndRatingsRouter.put("/update/:id",
    validation.validatePackageByIDDB(),
    validation.validateUpdatePackage(),
    commentAndRatingsController.update
);

module.exports = commentAndRatingsRouter;