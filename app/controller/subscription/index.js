const express = require('express');
const subscriptionController = require("./subscription.controller");

const { authMiddleware } = require("../../middleware/auth.middleware");
const { roleMiddleware } = require("../../middleware/role.middleware");
const ValidationMiddleware = require("../../middleware/validation.middleware")
const validation = new ValidationMiddleware();

const subscriptionRouter = express.Router();

subscriptionRouter.use(
    authMiddleware.isAuthenticated(),
    validation.validateUserByIdCheckDB(),
    roleMiddleware.isUser()
);

subscriptionRouter.post("/create",
    validation.validatePackageByBodyIDDB(),
    validation.validateCheckSubscription(),
    subscriptionController.create
);

subscriptionRouter.post("/customSubcribe",
    // validation.validatePackageByBodyIDDB(),
    validation.validateCheckSubscription(),
    subscriptionController.customSubcribe
);

subscriptionRouter.delete("/cancel/:id",
    // validation.validatePackageByBodyIDDB(),
    validation.validatePackageByCurrentPackageIDDB(),
    validation.validateSubscriptionById(),
    subscriptionController.cancel
);

subscriptionRouter.put("/update",
    validation.validatePackageByBodyIDDB(),
    validation.validatePackageByCurrentPackageIDDB(),
    validation.validateSubscriptionById(),
    subscriptionController.update
);

subscriptionRouter.get("/gets",
    subscriptionController.get
);

module.exports = subscriptionRouter;