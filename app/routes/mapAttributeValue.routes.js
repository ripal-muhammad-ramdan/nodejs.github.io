const {
    authJwt
} = require("../middlewares");
const MapAttributeValue = require("../controllers/mapAttributeValue.controller.js");

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
        "/api/mapAttributeValue",
        MapAttributeValue.findAll
    );

    // select by id
    app.get(
        "/api/mapAttributeValue/:mapAttributeValueId",
        MapAttributeValue.findOne
    );

    // insert
    app.post(
        "/api/mapAttributeValue/addMapAttributeValue",
        MapAttributeValue.create
    );

    // update
    app.put(
        "/api/mapAttributeValue/updateMapAttributeValue/:mapAttributeValueId",
        MapAttributeValue.update
    );

    // delete
    app.delete(
        "/api/mapAttributeValue/deleteMapAttributeValue/:mapAttributeValueId",
        MapAttributeValue.delete
    );
};