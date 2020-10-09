const {
    authJwt
} = require("../middlewares");
const Attribute = require("../controllers/attribute.controller.js");

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
        "/api/attribute",
        Attribute.findAll
    );

    // select by id
    app.get(
        "/api/attribute/:attributeId",
        Attribute.findOne
    );

    // insert
    app.post(
        "/api/attribute/addAttribute",
        Attribute.create
    );

    // update
    app.put(
        "/api/attribute/updateAttribute/:attributeId",
        Attribute.update
    );

    // delete
    app.delete(
        "/api/attribute/deleteAttribute/:attributeId",
        Attribute.delete
    );
};