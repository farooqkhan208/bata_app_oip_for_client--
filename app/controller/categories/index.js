const express = require('express');
const categoriesController = require("./category.controller");

const { authMiddleware } = require("../../middleware/auth.middleware");
const { roleMiddleware } = require("../../middleware/role.middleware");
const ValidationMiddleware = require("../../middleware/validation.middleware")

const validation = new ValidationMiddleware();

const categoriesRouter = express.Router();

categoriesRouter.use(
    authMiddleware.isAuthenticated(),
    validation.validateUserByIdCheckDB(),
    roleMiddleware.isAdmin()
);

categoriesRouter.post("/create",
    validation.validateCreateCategoryJoi(),
    categoriesController.create
);

categoriesRouter.get("/gets",
    categoriesController.gets
);

categoriesRouter.delete("/delete/:id",
    validation.validateCategoryByIDDB(),
    categoriesController.delete
);

categoriesRouter.put("/update/:id",
    validation.validateCategoryByIDDB(),
    validation.validateCreateCategoryJoi(),
    categoriesController.update
);

module.exports = categoriesRouter;