const {
    authJwt
} = require("../middlewares");
const roles = require("../controllers/roles.controller.js");

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
        "/api/roles",
        roles.findAll
    );

    // select by id
    app.get(
        "/api/roles/:roleId",
        roles.findOne
    );

    // insert
    app.post(
        "/api/roles/addRole",
        roles.create
    );

    // update
    app.put(
        "/api/roles/updateRole/:roleId",
        roles.update
    );

    // delete
    app.delete(
        "/api/roles/deleteRole/:roleId",
        roles.delete
    );
};