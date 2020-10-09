const Role = require("../models/roles.model.js");
var bcrypt = require("bcryptjs");

exports.findAll = (req, res) => {
    Role.getAll((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Users."
            });
        else res.send(data);
    });
};

// Find a single role with a roleId
exports.findOne = (req, res) => {
    Role.findById(req.params.roleId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Role with roleId ${req.params.roleId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Role with roleId " + req.params.roleId
                });
            }
        } else res.send(data);
    });
};

exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    // Create a Role
    const roles = new Role({
        role_id: req.body.role_id,
        role_name: req.body.role_name,
        created_by: req.body.userby,
        updated_by: req.body.userby,
        is_active: req.body.is_active
    });

    // Save Role in the database
    Role.create(roles, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Users."
            });
        else res.send(data);
    });
}

// Update Role in the database 
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Role.update(req.params.roleId, new Role(req.body),
        (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Users."
                });
            else res.send(data);
        });
};

// Delete Role in the database
exports.delete = (req, res) => {
    Role.delete(req.params.roleId,
        (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Users."
                });
            else res.send(data);
        });
};