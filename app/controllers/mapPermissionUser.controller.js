const MapPermissionUser = require("../models/mapPermissionUser.model.js");
var bcrypt = require("bcryptjs");


// Find a single MapPermissionUser with a MapPermissionUserId
exports.findOne = (req, res) => {
    MapPermissionUser.findById(req.params.mapPermissionUserId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found MapPermissionUser with mapPermissionUserId ${req.params.mapPermissionUserId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving MapPermissionUser with mapPermissionUserId " + req.params.mapPermissionUserId
                });
            }
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
    MapPermissionUser.getAll((err, data) => {
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
    // Create a MapPermissionUser
    const mappermissionuser = new MapPermissionUser({
        map_permission_user_id: req.body.map_permission_user_id,
        role_id: req.body.role_id,
        permission_id: req.body.permission_id,
        created_by: req.body.userby,
        updated_by: req.body.userby
    });

    // Save MapPermissionUser in the database
    MapPermissionUser.create(mappermissionuser, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Users."
            });
        else res.send(data);
    });
}

// Update MapPermissionUser in the database 
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    MapPermissionUser.update(req.params.mapPermissionUserId, new MapPermissionUser(req.body),
        (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Users."
                });
            else res.send(data);
        });
};

// Delete MapPermissionUser in the database
exports.delete = (req, res) => {
    MapPermissionUser.delete(req.params.mapPermissionUserId,
        (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Users."
                });
            else res.send(data);
        });
};