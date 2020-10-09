const MenuTitle = require("../models/menuTitle.model.js");
var bcrypt = require("bcryptjs");


// Find a single MenuTitle with a menuTitleId
exports.findOne = (req, res) => {
    MenuTitle.findById(req.params.menuTitleId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found MenuTitle with menuTitleId ${req.params.menuTitleId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving MenuTitle with menuTitleId " + req.params.menuTitleId
                });
            }
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
    MenuTitle.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Users."
            });
        else res.send(data);
    });
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a MenuTitle
    const menutitle = new MenuTitle({
        menu_title_id: req.body.menu_title_id,
        menu_title_name: req.body.menu_title_name,
        created_by: req.body.userby,
        updated_by: req.body.userby
    });

    // Save MenuTitle in the database
    MenuTitle.create(menutitle, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Users."
            });
        else res.send(data);
    });
}

// Update MenuTitle in the database 
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    MenuTitle.update(req.params.menuTitleId, new MenuTitle(req.body),
        (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Users."
                });
            else res.send(data);
        });
};

// Delete MenuTitle in the database
exports.delete = (req, res) => {
    MenuTitle.delete(req.params.menuTitleId,
        (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Users."
                });
            else res.send(data);
        });
};