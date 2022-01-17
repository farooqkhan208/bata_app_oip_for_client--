const assignInterpreterService = require("./assignInterpreter.service");
const bookingLangService = require("./booking_lang.service");
const occationService = require("./occation.service");
const bookingInterpreterService = require("./bookingInterpreter.service");
const categoryService = require("./category.service");
const commentAndRatingService = require("./commentAndRatings.service");
const languageService = require("./language.service");
const packagesService = require("./packages.service");
const roleService = require("./role.service");
const stripeService = require("./stripe.service");
const subscriptionService = require("./subscription.service");
const userService = require("./user.service");
const speakService = require("./speakLanguage.service");

module.exports = {
    //     authService,
    //     bookService,
    //     bookmarkService,
    //     coverService,
    assignInterpreterService,
    bookingLangService,
    bookingInterpreterService,
    categoryService,
    commentAndRatingService,
    languageService,
    packagesService,
    roleService,
    occationService,
    stripeService,
    subscriptionService,
    userService,
    speakService
}