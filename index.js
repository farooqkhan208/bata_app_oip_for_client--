#!/usr/bin/env node

/**
 * Module dependencies.
 */
require('dotenv').config()
var Spinner = require("cli-spinner").Spinner;
var fs = require("fs");
var http = require("http");
var app = require("./startUp/app");
var moment = require("moment");
const config = require('config');
const sql = require("./startUp/connection")

/**
 * Get port from environment and store in Express.
 */
var port = normalizePort(
    process.env.PORT ||
    "6000");
app.set("port", port);
/**
 * Create HTTP server.
 */
// var server = http.createServer(app);
if (process.env.NODE_ENV == 'development') {
    // HTTP1.1 Server Start
    var server = http.createServer(app);
} else if (process.env.NODE_ENV == 'production') {
    var server = http.createServer(app);
} else {
    console.error(`❌ Server Stopped (listening on PORT : ${port})`);
    console.error("ENV not defined. Killing server process")
    process.exit();
}

/* Make sure to change URI before deployment */


Spinner.setDefaultSpinnerString(19);
var spinner = new Spinner("Connecting to database.. %s");
spinner.start();
sql
    .connect((err) => {
        if (err) {
            console.clear();
            spinner.stop(true);
            console.error(`❌ Server Stopped (listening on PORT : ${port})`);
            console.info(`⌚`, moment().format("DD-MM-YYYY hh:mm:ss a"));
            console.error("❗️ Could not connect to database...", err);
            process.exit();
        } else {
            console.clear();
            spinner.stop(true);
            console.info(`✔️ Database Connected (${process.env.NODE_ENV})`);

            /**
             * Listen on provided port, on all network interfaces.
             */
            server.listen(port, function (error) {
                if (error) {
                    console.error(`❌ Server Stopped (listening on PORT : ${port})`);
                    console.error(error)
                    process.exit();
                }

                if (process.env.NODE_ENV == 'development') {
                    // HTTP1.1 Server Start
                    console.info(`✔️ HTTP/1.1 Server Started (listening on PORT : ${port})`);
                } else if (process.env.NODE_ENV == 'production') {
                    // HTTP2 Server Start 
                    console.info(`✔️ HTTPS/2 Server Started (listening on PORT : ${port})`);
                }
                console.info(`⌚`, moment().format("DD-MM-YYYY hh:mm:ss a"));
            });
        }
    });

/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function terminate(server, options = { coredump: false, timeout: 500 }) {
    // Exit function
    const exit = (code) => {
        options.coredump ? process.abort() : process.exit(code);
    };

    return (code, reason) => (err, promise) => {
        if (err && err instanceof Error) {
            // Log error information, use a proper logging library here :)
            fs.appendFileSync("access.log", err.message);
            console.log(err.message, err.stack);
        }

        // Attempt a graceful shutdown
        server.close(exit);
        setTimeout(exit, options.timeout).unref();
    };
}

const exitHandler = terminate(server, {
    coredump: false,
    timeout: 500,
});
process.on("uncaughtException", (err) => {
    fs.appendFile("access.log", `Uncaught Exception: ${err.message}`, () => { });
    console.log(`Uncaught Exception: ${err.message}`);
});
process.on("unhandledRejection", (reason, promise) => {
    fs.appendFile(
        "access.log",
        `Unhandled rejection, reason: ${reason}`,
        () => { }
    );
    console.log("Unhandled rejection at", promise, `reason: ${reason}`);
});
process.on("SIGTERM", exitHandler(0, "SIGTERM"));
process.on("SIGINT", exitHandler(0, "SIGINT"));