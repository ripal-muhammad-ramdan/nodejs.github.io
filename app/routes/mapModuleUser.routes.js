const {
    authJwt
} = require("../middlewares");
const MapModuleUser = require("../controllers/mapModuleUser.controller.js");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    // select
    app.get(
        "/api/mapModuleUser",
        MapModuleUser.findAll
    );

    // select by id
    app.get(
        "/api/mapModuleUser/:mapModuleUserId",
        MapModuleUser.findOne
    );

    // insert
    app.post(
        "/api/mapModuleUser/addMapModuleUser",
        MapModuleUser.create
    );

    // update
    app.put(
        "/api/mapModuleUser/updateMapModuleUser/:mapModuleUserId",
        MapModuleUser.update
    );

    // delete
    app.delete(
        "/api/mapModuleUser/deleteMapModuleUser/:mapModuleUserId",
        MapModuleUser.delete
    );
};