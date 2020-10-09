const { authJwt } = require("../middlewares");
const users = require("../controllers/users.controller.js");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //app.get("/api/test/all", controller.allAccess);

    app.get(
        "/api/users",
        //[authJwt.verifyToken],
        users.findAll
    );

    /*app.get(
        "/api/test/mod",
        [authJwt.verifyToken, authJwt.isModerator],
        controller.moderatorBoard
    );

    app.get(
        "/api/test/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );*/
};