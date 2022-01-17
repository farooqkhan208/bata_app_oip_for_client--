const express = require('express');
const adminOccationsController = require("./adminOccation.controller");

const { authMiddleware } = require("../../../middleware/auth.middleware");
const { roleMiddleware } = require("../../../middleware/role.middleware");
const ValidationMiddleware = require("../../../middleware/validation.middleware")
const validation = new ValidationMiddleware();

const adminOccationsRouter = express.Router();

adminOccationsRouter.use(
    authMiddleware.isAuthenticated(),
    validation.validateUserByIdCheckDB(),
    roleMiddleware.isAdmin()
);

adminOccationsRouter.post("/create",
    validation.validateCreateOccationJoi(),
    adminOccationsController.create
);

adminOccationsRouter.put("/activeOrInactive/:id",
    adminOccationsController.activeOrInactive
);

adminOccationsRouter.delete("/delete/:id",
    validation.validateOccationByIDDB(),
    adminOccationsController.delete
);

adminOccationsRouter.put("/update/:id",
    validation.validateOccationByIDDB(),
    validation.validateCreateOccationJoi(),
    adminOccationsController.update
);

module.exports = adminOccationsRouter;