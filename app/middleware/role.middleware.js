const compose = require("composable-middleware");

class RoleMiddleware {
    isAdmin() {
        return (
            compose()
                // Attach user to request
                .use((req, res, next) => {
                    if (req.user.role_id == 1) {
                        next();
                    } else {
                        res.status(400).send({ success: false, status: 400, msg: "Insufficient privileges." });
                        return
                    }
                })
        )
    }
    isUser() {
        return (
            compose()
                // Attach user to request
                .use((req, res, next) => {
                    if (req.user.role_id == 2 || req.user.role_id == 1) {
                        next();
                    } else {
                        res.status(400).send({ success: false, status: 400, msg: "Insufficient privileges." });
                        return
                    }
                })
        )
    }

    isInterpreter() {
        return (
            compose()
                // Attach user to request
                .use((req, res, next) => {
                    if (req.user.role_id == 3 || req.user.role_id == 1) {
                        delete req.user.previous_package;
                        delete req.user.current_package;
                        delete req.user.stripe_c_id;
                        delete req.user.service_type;
                        delete req.user.interpreter_id;
                        next();
                    } else {
                        res.status(400).send({ success: false, status: 400, msg: "Insufficient privileges." });
                        return
                    }
                })
        )
    }
}

module.exports.roleMiddleware = new RoleMiddleware();