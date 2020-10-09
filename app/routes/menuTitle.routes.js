const {
    authJwt
} = require("../middlewares");
const MenuTitle = require("../controllers/menuTitle.controller.js");

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
        "/api/menuTitle",
        MenuTitle.findAll
    );

    // select by id
    app.get(
        "/api/menuTitle/:menuTitleId",
        MenuTitle.findOne
    );

    // insert
    app.post(
        "/api/menuTitle/addMenuTitle",
        MenuTitle.create
    );

    // update
    app.put(
        "/api/menuTitle/updateMenuTitle/:menuTitleId",
        MenuTitle.update
    );

    // delete
    app.delete(
        "/api/menuTitle/deleteMenuTitle/:menuTitleId",
        MenuTitle.delete
    );
};