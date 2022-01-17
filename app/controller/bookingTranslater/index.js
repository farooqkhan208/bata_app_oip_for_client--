const express = require('express');
const bookingTranslaterController = require("./bookingInterpreter.controller");

const { authMiddleware } = require("../../middleware/auth.middleware");
const { roleMiddleware } = require("../../middleware/role.middleware");
const ValidationMiddleware = require("../../middleware/validation.middleware")
const validation = new ValidationMiddleware();

const bookingTranslaterRouter = express.Router();

bookingTranslaterRouter.use(
    authMiddleware.isAuthenticated(),
    validation.validateUserByIdCheckDB(),
    roleMiddleware.isUser()
);

bookingTranslaterRouter.post("/create",
    validation.validateCreateBokkingInterpretterJoi(),
    bookingTranslaterController.create
);

bookingTranslaterRouter.get("/clientBooking",
    bookingTranslaterController.clientBooking
);

bookingTranslaterRouter.get("/currentBooking",
    validation.validateCurrentBookingByUserId(),
    bookingTranslaterController.currentBooking
);
bookingTranslaterRouter.put("/completed/:id",
    validation.validateCurrentBookingCheckDB(),
    bookingTranslaterController.complete
);

module.exports = bookingTranslaterRouter;