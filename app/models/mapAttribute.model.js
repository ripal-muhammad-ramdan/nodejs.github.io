const {
    request,
    response
} = require("express");
const pool = require("./db.js");

// constructor
const MapAttribute = function (mapattribute) {
    this.map_attribute_id = mapattribute.map_attribute_id;
    this.attribute_id = mapattribute.attribute_id;
    this.role_id = mapattribute.role_id;
    this.created_by = mapattribute.created_by;
    this.created_at = mapattribute.created_at;
    this.updated_by = mapattribute.updated_by;
    this.updated_at = mapattribute.updated_at;
};

// search by MapAttribute id
MapAttribute.findById = (MapAttributeId, result) => {
    pool.query(`SELECT * FROM map_attribute WHERE map_attribute_id = $1`, [MapAttributeId], (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.rows.length) {
            console.log("found MapAttribute : ", res.rows);
            result(null, res.rows);
            return;
        }

        result({
            kind: "not_found"
        }, null);
    });
};

// create MapAttribute
MapAttribute.create = (newMapAttribute, result) => {
    pool.query("INSERT INTO map_attribute (attribute_id,role_id,created_by,created_at,updated_by,updated_at)" +
        "VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $4, CURRENT_TIMESTAMP)", [
            newMapAttribute.attribute_id, newMapAttribute.role_id, newMapAttribute.created_by, newMapAttribute.updated_by
        ], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("created MapAttribute: ", {
                id: res.insertId,
                ...newMapAttribute
            });
            result(null, {
                id: res.insertId,
                ...newMapAttribute
            });
        })
}

// update MapAttribute
MapAttribute.update = (MapAttributeId, updateMapAttribute, result) => {
    pool.query(`UPDATE map_attribute SET attribute_id = $1, role_id =$2, updated_by = $3, updated_at = CURRENT_TIMESTAMP WHERE map_attribute_id = ${MapAttributeId}`, [
        updateMapAttribute.attribute_id, updateMapAttribute.role_id, updateMapAttribute.updated_by
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

        console.log("updated MapAttribute: ", {
            id: res.MapAttributeId,
            ...updateMapAttribute
        });
        result(null, {
            id: res.MapAttributeId,
            ...updateMapAttribute
        });
    })
}

// delete MapAttribute_type
MapAttribute.delete = (MapAttributeId, result) => {
    pool.query(`DELETE FROM map_attribute WHERE map_attribute_id = ${MapAttributeId}`, (err, res) => {
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

        console.log("deleted MapAttribute: ", MapAttributeId);
        result(null, res);
    })
}

// select all data MapAttribute
MapAttribute.getAll = result => {
    pool.query("SELECT a.*, b.attribute_name, c.role_name FROM map_attribute a, tm_attribute b, tm_role c WHERE a.attribute_id = b.attribute_id AND a.role_id = c.role_id", (err, res) => {
        if (err) {
            console.log("Error ", err);
            result(null, err);
            return;
        }

        console.log('MapAttribute : ', res.rows);
        result(null, res.rows);
    })
}

module.exports = MapAttribute;