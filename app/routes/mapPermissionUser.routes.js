const {
    authJwt
} = require("../middlewares");
const MapPermissionUser = require("../controllers/mapPermissionUser.controller.js");

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
        "/api/mapPermissionUser",
        MapPermissionUser.findAll
    );

    // select by id
    app.get(
        "/api/mapPermissionUser/:mapPermissionUserId",
        MapPermissionUser.findOne
    );

    // insert
    app.post(
        "/api/mapPermissionUser/addMapPermissionUser",
        MapPermissionUser.create
    );

    // update
    app.put(
        "/api/mapPermissionUser/updateMapPermissionUser/:mapPermissionUserId",
        MapPermissionUser.update
    );

    // delete
    app.delete(
        "/api/mapPermissionUser/deleteMapPermissionUser/:mapPermissionUserId",
        MapPermissionUser.delete
    );
};