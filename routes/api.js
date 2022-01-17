const express = require("express");
const app = express();

// App Routes
app.use("/bookingInterpreter", require("../app/controller/bookingTranslater"));
app.use("/commentAndRating", require("../app/controller/commentAndRating"));
app.use("/interpreter", require("../app/controller/interperter"));
app.use("/orders", require("../app/controller/order"));
app.use("/occation", require("../app/controller/ocassions"));
app.use("/packages", require("../app/controller/packages"));
app.use("/subscription", require("../app/controller/subscription"));
app.use("/users", require("../app/controller/users"));

//INTERPRETER ROUTES
app.use("/interpreter/commentAndRating", require("../app/controller/commentAndRating/interpreter"));
app.use("/interpreter/bookingInterpreter", require("../app/controller/bookingTranslater/interpreter"));

//webhooks
app.use("/webhook", express.raw({ type: 'application/json' }), require("../app/webhook"));


// ADMIN ROUTES
app.use("/admin/roles", require("../app/controller/roles"));
app.use("/admin/categories", require("../app/controller/categories"));
app.use("/admin/commentAndRating", require("../app/controller/commentAndRating/admin"));
app.use("/admin/language", require("../app/controller/language"));
app.use("/admin/packages", require("../app/controller/packages/admin"));
app.use("/admin/bookingInterpreter", require("../app/controller/bookingTranslater/admin"));
app.use("/admin/users", require("../app/controller/users/admin"));
app.use("/admin/interpreter", require("../app/controller/interperter/admin"));
app.use("/admin/occation", require("../app/controller/ocassions/admin"));

module.exports = app;