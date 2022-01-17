const express = require('express');

const { appMiddleware } = require("../../middleware/app.middleware");
const { authMiddleware } = require("../../middleware/auth.middleware");
const ValidationMiddleware = require("../../middleware/validation.middleware")
const usersController = require("./user.controller");
const usersRouter = express.Router();
const validation = new ValidationMiddleware();


usersRouter.post("/register",
    validation.validateUserRegistration(),
    usersController.register,
);

usersRouter.post("/signin",
    validation.validateUserLogin(),
    usersController.login,
);

// usersRouter.post("/verifyEvent",
//     usersController.checkVerifyEvent,
// );

usersRouter.post("/verify",
    validation.validateUserVerifyJoi(),
    usersController.verify,
);


usersRouter.post("/forgetPassword",
    validation.validateForgetPasswordJoi(),
    usersController.forgetPassword,
);

usersRouter.post("/resetPassword",
    validation.validateResetPasswordJoi(),
    usersController.resetPassword,
);

usersRouter.post("/verifyCode",
    validation.validateVerifyCodeJoi(),
    usersController.verifyCode,
);

usersRouter.delete("/authDel/:id",
    usersController.authDel,
);

usersRouter.delete("/phoneDel/:id",
    usersController.deletePhone,
);

usersRouter.use(
    authMiddleware.isAuthenticated(),
)

usersRouter.post("/profileImage",
    validation.validateUserByIdCheckDB(),
    appMiddleware.upload(),
    usersController.uploadImage,
);

usersRouter.post("/changePassword",
    validation.validateUserByIdWithPassCheckDB(),
    validation.validateUserChangePassword(),
    usersController.changePassword,
);

usersRouter.put("/update",
    validation.validateUserByIdCheckDB(),
    validation.validateUserUpdateJoi(),
    appMiddleware.upload(),
    usersController.updateUser,
);

// usersRouter.get("/renderImage/:path",
//     // authMiddleware.isAuthenticated(),
//     // validation.validateUserByIdCheckDB(),
//     // validation.validateUserUpdate(),
//     usersController.renderImage,
// );
module.exports = usersRouter;