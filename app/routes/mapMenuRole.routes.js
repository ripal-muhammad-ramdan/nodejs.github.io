const {
    authJwt
} = require("../middlewares");
const MapMenuRole = require("../controllers/mapMenuRole.controller.js");

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
        "/api/mapMenuRole",
        MapMenuRole.findAll
    );

    // select by id
    app.get(
        "/api/mapMenuRole/:mapMenuRoleId",
        MapMenuRole.findOne
    );

    // insert
    app.post(
        "/api/mapMenuRole/addMapMenuRole",
        MapMenuRole.create
    );

    // update
    app.put(
        "/api/mapMenuRole/updateMapMenuRole/:mapMenuRoleId",
        MapMenuRole.update
    );

    // delete
    app.delete(
        "/api/mapMenuRole/deleteMapMenuRole/:mapMenuRoleId",
        MapMenuRole.delete
    );
};