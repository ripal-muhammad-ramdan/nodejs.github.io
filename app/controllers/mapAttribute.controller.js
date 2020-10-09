const MapAttribute = require("../models/mapAttribute.model.js");
var bcrypt = require("bcryptjs");


// Find a single MapAttribute with a MapAttributeId
exports.findOne = (req, res) => {
    MapAttribute.findById(req.params.mapAttributeId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found MapModuleUser with mapAttributeId ${req.params.mapAttributeId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving MapModuleUser with mapAttributeId " + req.params.mapAttributeId
                });
            }
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
    MapAttribute.getAll((err, data) => {
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
    // Create a MapAttribute
    const mapattribute = new MapAttribute({
        map_attribute_id: req.body.map_attribute_id,
        attribute_id: req.body.attribute_id,
        role_id: req.body.role_id,
        created_by: req.body.userby,
        updated_by: req.body.userby
    });

    // Save MapAttribute in the database
    MapAttribute.create(mapattribute, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Users."
            });
        else res.send(data);
    });
}

// Update MapAttribute in the database 
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    MapAttribute.update(req.params.mapAttributeId, new MapAttribute(req.body),
        (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Users."
                });
            else res.send(data);
        });
};

// Delete MapAttribute in the database
exports.delete = (req, res) => {
    MapAttribute.delete(req.params.mapAttributeId,
        (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Users."
                });
            else res.send(data);
        });
};