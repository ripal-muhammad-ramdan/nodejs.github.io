const MapMenuTitle = require("../models/mapMenuTitle.model.js");
var bcrypt = require("bcryptjs");


// Find a single MapMenuTitle with a mapMenuTitleId
exports.findOne = (req, res) => {
    MapMenuTitle.findById(req.params.mapMenuTitleId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found MapMenuTitle with mapMenuTitleId ${req.params.mapMenuTitleId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving MapMenuTitle with mapMenuTitleId " + req.params.mapMenuTitleId
                });
            }
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
    MapMenuTitle.getAll((err, data) => {
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
    // Create a MapMenuTitle
    const mapmenutitle = new MapMenuTitle({
        map_attribute_id: req.body.map_attribute_id,
        menu_id: req.body.menu_id,
        menu_title_id: req.body.menu_title_id,
        created_by: req.body.userby,
        updated_by: req.body.userby
    });

    // Save MapMenuTitle in the database
    MapMenuTitle.create(mapmenutitle, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Users."
            });
        else res.send(data);
    });
}

// Update MapMenuTitle in the database 
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    MapMenuTitle.update(req.params.mapMenuTitleId, new MapMenuTitle(req.body),
        (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Users."
                });
            else res.send(data);
        });
};

// Delete MapMenuTitle in the database
exports.delete = (req, res) => {
    MapMenuTitle.delete(req.params.mapMenuTitleId,
        (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Users."
                });
            else res.send(data);
        });
};