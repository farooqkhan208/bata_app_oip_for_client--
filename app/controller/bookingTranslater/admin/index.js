const express = require('express');
const bookingTranslaterController = require("./bookingInterpreter.controller");

const { authMiddleware } = require("../../../middleware/auth.middleware");
const { roleMiddleware } = require("../../../middleware/role.middleware");
const ValidationMiddleware = require("../../../middleware/validation.middleware")
const validation = new ValidationMiddleware();

const bookingTranslaterRouter = express.Router();

bookingTranslaterRouter.use(
    authMiddleware.isAuthenticated(),
    validation.validateUserByIdCheckDB(),
    roleMiddleware.isUser()
);

bookingTranslaterRouter.get("/gets",
    bookingTranslaterController.gets
);

bookingTranslaterRouter.get("/get/:id",
    bookingTranslaterController.get
);

bookingTranslaterRouter.put("/accept/:id",
    validation.validateCheckBookingById(),
    validation.validateBookingAcceptByAdminJoi(),
    bookingTranslaterController.accept
);

bookingTranslaterRouter.put("/reject/:id",
    bookingTranslaterController.reject
);

module.exports = bookingTranslaterRouter;