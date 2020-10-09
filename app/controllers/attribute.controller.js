const Attribute = require("../models/attribute.model.js");
var bcrypt = require("bcryptjs");


// Find a single Attribute with a attributeId
exports.findOne = (req, res) => {
    Attribute.findById(req.params.attributeId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Attribute with attributeId ${req.params.attributeId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Attribute with attributeId " + req.params.attributeId
                });
            }
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
    Attribute.getAll((err, data) => {
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
    // Create a Attribute
    const attribute = new Attribute({
        attribute_id: req.body.attribute_id,
        attribute_name: req.body.attribute_name,
        attribute_type_id: req.body.attribute_type_id,
        is_active: req.body.is_active,
        created_by: req.body.userby,
        updated_by: req.body.userby
    });

    // Save Attribute in the database
    Attribute.create(attribute, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Users."
            });
        else res.send(data);
    });
}

// Update Attribute in the database 
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Attribute.update(req.params.attributeId, new Attribute(req.body),
        (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Users."
                });
            else res.send(data);
        });
};

// Delete Attribute in the database
exports.delete = (req, res) => {
    Attribute.delete(req.params.attributeId,
        (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Users."
                });
            else res.send(data);
        });
};