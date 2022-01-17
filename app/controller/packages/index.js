const express = require('express');
const packegesController = require("./packages.controller");

const { authMiddleware } = require("../../middleware/auth.middleware");
const { roleMiddleware } = require("../../middleware/role.middleware");
const ValidationMiddleware = require("../../middleware/validation.middleware")
const validation = new ValidationMiddleware();

const packagessRouter = express.Router();

packagessRouter.get("/gets",
    packegesController.gets
);

packagessRouter.use(
    authMiddleware.isAuthenticated(),
    validation.validateUserByIdCheckDB(),
    roleMiddleware.isUser()
);


packagessRouter.post("/create",
    validation.validateUserCreatePackageJoi(),
    packegesController.create
);

packagessRouter.delete("/delete/:id",
    validation.validatePackageByIDDB(),
    packegesController.delete
);

packagessRouter.put("/update/:id",
    validation.validatePackageByIDDB(),
    validation.validateUpdatePackage(),
    packegesController.update
);

module.exports = packagessRouter;