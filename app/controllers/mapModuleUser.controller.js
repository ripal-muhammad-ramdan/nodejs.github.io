const MapModuleUser = require("../models/mapModuleUser.model.js");
var bcrypt = require("bcryptjs");


// Find a single MapModuleUser with a MapModuleUserId
exports.findOne = (req, res) => {
    MapModuleUser.findById(req.params.mapModuleUserId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found MapModuleUser with mapModuleUserId ${req.params.mapModuleUserId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving MapModuleUser with mapModuleUserId " + req.params.mapModuleUserId
                });
            }
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
    MapModuleUser.getAll((err, data) => {
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
    // Create a MapModuleUser
    const mapmoduleuser = new MapModuleUser({
        map_modul_user_id: req.body.map_modul_user_id,
        module_id: req.body.module_id,
        role_id: req.body.role_id,
        created_by: req.body.userby,
        updated_by: req.body.userby
    });

    // Save MapModuleUser in the database
    MapModuleUser.create(mapmoduleuser, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Users."
            });
        else res.send(data);
    });
}

// Update MapModuleUser in the database 
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    MapModuleUser.update(req.params.mapModuleUserId, new MapModuleUser(req.body),
        (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Users."
                });
            else res.send(data);
        });
};

// Delete MapModuleUser in the database
exports.delete = (req, res) => {
    MapModuleUser.delete(req.params.mapModuleUserId,
        (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Users."
                });
            else res.send(data);
        });
};