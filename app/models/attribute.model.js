const {
    request,
    response
} = require("express");
const pool = require("./db.js");

// constructor
const Attribute = function (attribute) {
    this.attribute_id = attribute.attribute_id;
    this.attribute_name = attribute.attribute_name;
    this.attribute_type_id = attribute.attribute_type_id;
    this.is_active = 1;
    this.created_by = attribute.created_by;
    this.created_at = attribute.created_at;
    this.updated_by = attribute.updated_by;
    this.updated_at = attribute.updated_at;
};

// search by attribute id
Attribute.findById = (AttributeId, result) => {
    pool.query(`SELECT * FROM tm_attribute WHERE attribute_id = $1`, [AttributeId], (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.rows.length) {
            console.log("found Attribute : ", res.rows);
            result(null, res.rows);
            return;
        }

        result({
            kind: "not_found"
        }, null);
    });
};

// create attribute
Attribute.create = (newAttribute, result) => {
    pool.query("INSERT INTO tm_attribute (attribute_name,attribute_type_id,is_active,created_by,created_at,updated_by,updated_at)" +
        "VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, $5, CURRENT_TIMESTAMP)", [
            newAttribute.attribute_name, newAttribute.attribute_type_id, newAttribute.is_active, newAttribute.created_by, newAttribute.updated_by
        ], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("created attribute: ", {
                id: res.insertId,
                ...newAttribute
            });
            result(null, {
                id: res.insertId,
                ...newAttribute
            });
        })
}

// update attribute
Attribute.update = (AttributeId, updateAttribute, result) => {
    pool.query(`UPDATE tm_attribute SET attribute_name = $1, attribute_type_id =$2, updated_by = $3, updated_at = CURRENT_TIMESTAMP WHERE attribute_id = ${AttributeId}`, [
        updateAttribute.attribute_name, updateAttribute.attribute_type_id, updateAttribute.updated_by
    ], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({
                kind: "not found"
            }, null);
            return;
        }

        console.log("updated attribute: ", {
            id: res.AttributeId,
            ...updateAttribute
        });
        result(null, {
            id: res.AttributeId,
            ...updateAttribute
        });
    })
}

// delete attribute_type
Attribute.delete = (AttributeId, result) => {
    pool.query(`DELETE FROM tm_attribute WHERE attribute_id = ${AttributeId}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.affectedRows == 0) {
            result({
                kind: "not found"
            }, null);
            return;
        }

        console.log("deleted attribute: ", AttributeId);
        result(null, res);
    })
}

// select all data Attribute
Attribute.getAll = result => {
    pool.query("SELECT a.*, b.attribute_type_id, b.attribute_type FROM tm_attribute a LEFT JOIN tm_attribute_type b ON a.attribute_type_id = b.attribute_type_id", (err, res) => {
        if (err) {
            console.log("Error ", err);
            result(null, err);
            return;
        }

        console.log('attribute_type : ', res.rows);
        result(null, res.rows);
    })
}

module.exports = Attribute;