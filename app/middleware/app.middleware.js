const compose = require("composable-middleware");
const multer = require('multer');
const { upload } = require("../constants/multer")

class AppMiddleware {
    upload() {
        return (
            compose()
                // Attach user to request
                .use((req, res, next) => {
                    upload(req, res, function (err) {
                        try {
                            if (err instanceof multer.MulterError) {
                                return res.status(400).send({
                                    success: false,
                                    msg: err.message,
                                    status: 400,
                                });
                            } else if (err) {
                                console.log()
                                return res.status(400).send({
                                    success: false,
                                    status: 400,
                                    msg: err.message,
                                });
                            }
                            next()
                        } catch (error) {
                            return res.status(500).send({
                                success: false,
                                status: 500,
                                msg: err.message,
                            });
                        }
                        // Everything went fine.
                    })
                })
        )
    }
}

module.exports.appMiddleware = new AppMiddleware();