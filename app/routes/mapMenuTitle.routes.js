const {
    authJwt
} = require("../middlewares");
const MapMenuTitle = require("../controllers/mapMenuTitle.controller.js");

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
        "/api/mapMenuTitle",
        MapMenuTitle.findAll
    );

    // select by id
    app.get(
        "/api/mapMenuTitle/:mapMenuTitleId",
        MapMenuTitle.findOne
    );

    // insert
    app.post(
        "/api/mapMenuTitle/addMapMenuTitle",
        MapMenuTitle.create
    );

    // update
    app.put(
        "/api/mapMenuTitle/updateMapMenuTitle/:mapMenuTitleId",
        MapMenuTitle.update
    );

    // delete
    app.delete(
        "/api/mapMenuTitle/deleteMapMenuTitle/:mapMenuTitleId",
        MapMenuTitle.delete
    );
};