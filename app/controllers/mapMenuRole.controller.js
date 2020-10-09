const MapMenuRole = require("../models/mapMenuRole.model.js");
var bcrypt = require("bcryptjs");


// Find a single MapMenuRole with a MapMenuRoleId
exports.findOne = (req, res) => {
    MapMenuRole.findById(req.params.mapMenuRoleId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found MapModuleUser with mapMenuRoleId ${req.params.mapMenuRoleId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving MapModuleUser with mapMenuRoleId " + req.params.mapMenuRoleId
                });
            }
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
    MapMenuRole.getAll((err, data) => {
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
    // Create a MapMenuRole
    const mapmenurole = new MapMenuRole({
        map_menu_role_id: req.body.map_menu_role_id,
        role_id: req.body.role_id,
        menu_id: req.body.menu_id,
        created_by: req.body.userby,
        updated_by: req.body.userby
    });

    // Save MapMenuRole in the database
    MapMenuRole.create(mapmenurole, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Users."
            });
        else res.send(data);
    });
}

// Update MapMenuRole in the database 
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    MapMenuRole.update(req.params.mapMenuRoleId, new MapMenuRole(req.body),
        (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Users."
                });
            else res.send(data);
        });
};

// Delete MapMenuRole in the database
exports.delete = (req, res) => {
    MapMenuRole.delete(req.params.mapMenuRoleId,
        (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Users."
                });
            else res.send(data);
        });
};