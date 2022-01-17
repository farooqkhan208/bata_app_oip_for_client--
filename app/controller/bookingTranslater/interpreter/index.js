const express = require('express');
const InterpreterBookingTranslaterController = require("./interpreterBookingInterpreter.controller");

const { authMiddleware } = require("../../../middleware/auth.middleware");
const { roleMiddleware } = require("../../../middleware/role.middleware");
const ValidationMiddleware = require("../../../middleware/validation.middleware")
const validation = new ValidationMiddleware();

const bookingTranslaterRouter = express.Router();

bookingTranslaterRouter.use(
    authMiddleware.isAuthenticated(),
    validation.validateUserByIdCheckDB(),
    roleMiddleware.isInterpreter()
);

bookingTranslaterRouter.get("/currentBooking",
    validation.validateCurrentBookingByInterpreterId(),
    InterpreterBookingTranslaterController.currentBooking
);

bookingTranslaterRouter.get("/bookingHistory",
    // validation.validateCurrentBookingByInterpreterId(),
    InterpreterBookingTranslaterController.bookingHistory
);



module.exports = bookingTranslaterRouter;