const {
    request,
    response
} = require("express");
const pool = require("./db.js");

// constructor
const MapAttributeValue = function (mapattributevalue) {
    this.map_attribute_user_id = mapattributevalue.map_attribute_user_id;
    this.map_attribute_id = mapattributevalue.map_attribute_id;
    this.user_id = mapattributevalue.user_id;
    this.attribute_value = mapattributevalue.attribute_value;
    this.created_by = mapattributevalue.created_by;
    this.created_at = mapattributevalue.created_at;
    this.updated_by = mapattributevalue.updated_by;
    this.updated_at = mapattributevalue.updated_at;
};

// search by MapAttributeValue id
MapAttributeValue.findById = (MapAttributeValueId, result) => {
    pool.query(`SELECT * FROM map_attribute_value WHERE map_attribute_user_id = $1`, [MapAttributeValueId], (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.rows.length) {
            console.log("found MapAttributeValue : ", res.rows);
            result(null, res.rows);
            return;
        }

        result({
            kind: "not_found"
        }, null);
    });
};

// create MapAttributeValue
MapAttributeValue.create = (newMapAttributeValue, result) => {
    pool.query("INSERT INTO map_attribute_value (map_attribute_id,user_id,attribute_value,created_by,created_at,updated_by,updated_at)" +
        "VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, $5, CURRENT_TIMESTAMP)", [
            newMapAttributeValue.map_attribute_id, newMapAttributeValue.user_id, newMapAttributeValue.attribute_value, newMapAttributeValue.created_by, newMapAttributeValue.updated_by
        ], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("created MapAttributeValue: ", {
                id: res.insertId,
                ...newMapAttributeValue
            });
            result(null, {
                id: res.insertId,
                ...newMapAttributeValue
            });
        })
}

// update MapAttributeValue
MapAttributeValue.update = (MapAttributeValueId, updateMapAttributeValue, result) => {
    pool.query(`UPDATE map_attribute_value SET map_attribute_id = $1, user_id = $2, attribute_value = $3, updated_by = $4, updated_at = CURRENT_TIMESTAMP WHERE map_attribute_user_id = ${MapAttributeValueId}`, [
        updateMapAttributeValue.map_attribute_id, updateMapAttributeValue.user_id, updateMapAttributeValue.attribute_value, updateMapAttributeValue.updated_by
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

        console.log("updated MapAttributeValue: ", {
            id: res.MapAttributeValueId,
            ...updateMapAttributeValue
        });
        result(null, {
            id: res.MapAttributeValueId,
            ...updateMapAttributeValue
        });
    })
}

// delete MapAttributeValue_type
MapAttributeValue.delete = (MapAttributeValueId, result) => {
    pool.query(`DELETE FROM map_attribute_value WHERE map_attribute_user_id = ${MapAttributeValueId}`, (err, res) => {
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

        console.log("deleted MapAttributeValue: ", MapAttributeValueId);
        result(null, res);
    })
}

// select all data MapAttributeValue
MapAttributeValue.getAll = result => {
    pool.query("SELECT a.*, b.map_attribute_id, c.username FROM map_attribute_value a, map_attribute b, tm_users c WHERE a.map_attribute_id = b.map_attribute_id AND a.user_id = c.user_id", (err, res) => {
        if (err) {
            console.log("Error ", err);
            result(null, err);
            return;
        }

        console.log('MapAttributeValue : ', res.rows);
        result(null, res.rows);
    })
}

module.exports = MapAttributeValue;