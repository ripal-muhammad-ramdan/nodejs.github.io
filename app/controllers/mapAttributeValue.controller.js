const MapAttributeValue = require("../models/mapAttributeValue.model.js");
var bcrypt = require("bcryptjs");


// Find a single MapAttributeValue with a MapAttributeValueId
exports.findOne = (req, res) => {
    MapAttributeValue.findById(req.params.mapAttributeValueId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found MapModuleUser with mapAttributeValueId ${req.params.mapAttributeValueId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving MapModuleUser with mapAttributeValueId " + req.params.mapAttributeValueId
                });
            }
        } else res.send(data);
    });
};

exports.findAll = (req, res) => {
    MapAttributeValue.getAll((err, data) => {
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
    // Create a MapAttributeValue
    const mapattributeValue = new MapAttributeValue({
        map_attribute_user_id: req.body.map_attribute_user_id,
        map_attribute_id: req.body.map_attribute_id,
        user_id: req.body.user_id,
        attribute_value: req.body.attribute_value,
        created_by: req.body.userby,
        updated_by: req.body.userby
    });

    // Save MapAttributeValue in the database
    MapAttributeValue.create(mapattributeValue, (err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Users."
            });
        else res.send(data);
    });
}

// Update MapAttributeValue in the database 
exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    MapAttributeValue.update(req.params.mapAttributeValueId, new MapAttributeValue(req.body),
        (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Users."
                });
            else res.send(data);
        });
};

// Delete MapAttributeValue in the database
exports.delete = (req, res) => {
    MapAttributeValue.delete(req.params.mapAttributeValueId,
        (err, data) => {
            if (err)
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Users."
                });
            else res.send(data);
        });
};