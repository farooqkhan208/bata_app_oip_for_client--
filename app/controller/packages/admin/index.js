const express = require('express');
const adminPackegesController = require("./packages.controller");

const { authMiddleware } = require("../../../middleware/auth.middleware");
const { roleMiddleware } = require("../../../middleware/role.middleware");
const ValidationMiddleware = require("../../../middleware/validation.middleware")
const validation = new ValidationMiddleware();

const adminPackagessRouter = express.Router();

adminPackagessRouter.use(
    authMiddleware.isAuthenticated(),
    validation.validateUserByIdCheckDB(),
    roleMiddleware.isUser()
);

adminPackagessRouter.get("/gets",
    adminPackegesController.gets
);

adminPackagessRouter.post("/create",
    validation.validateCreatePackage(),
    adminPackegesController.create
);

adminPackagessRouter.delete("/delete/:id",
    validation.validatePackageByIDDB(),
    adminPackegesController.delete
);

adminPackagessRouter.put("/update/:id",
    validation.validatePackageByIDDB(),
    validation.validateUpdatePackage(),
    adminPackegesController.update
);

module.exports = adminPackagessRouter;