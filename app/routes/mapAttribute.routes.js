const {
    authJwt
} = require("../middlewares");
const MapAttribute = require("../controllers/mapAttribute.controller.js");

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
        "/api/mapAttribute",
        MapAttribute.findAll
    );

    // select by id
    app.get(
        "/api/mapAttribute/:mapAttributeId",
        MapAttribute.findOne
    );

    // insert
    app.post(
        "/api/mapAttribute/addMapAttribute",
        MapAttribute.create
    );

    // update
    app.put(
        "/api/mapAttribute/updateMapAttribute/:mapAttributeId",
        MapAttribute.update
    );

    // delete
    app.delete(
        "/api/mapAttribute/deleteMapAttribute/:mapAttributeId",
        MapAttribute.delete
    );
};