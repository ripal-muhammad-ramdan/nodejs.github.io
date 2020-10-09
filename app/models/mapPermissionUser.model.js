const {
    request,
    response
} = require("express");
const pool = require("./db.js");

// constructor
const MapPermissionUser = function (mappermissionuser) {
    this.map_permission_user_id = mappermissionuser.map_permission_user_id;
    this.role_id = mappermissionuser.role_id;
    this.permission_id = mappermissionuser.permission_id;
    this.created_by = mappermissionuser.created_by;
    this.created_at = mappermissionuser.created_at;
    this.updated_by = mappermissionuser.updated_by;
    this.updated_at = mappermissionuser.updated_at;
};

// search by MapPermissionUserId
MapPermissionUser.findById = (MapPermissionUserId, result) => {
    pool.query(`SELECT * FROM map_permission_user WHERE map_permission_user_id = $1`, [MapPermissionUserId], (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.rows.length) {
            console.log("found MapPermissionUser : ", res.rows);
            result(null, res.rows);
            return;
        }

        result({
            kind: "not_found"
        }, null);
    });
};

// create MapPermissionUser
MapPermissionUser.create = (newMapPermissionUser, result) => {
    pool.query("INSERT INTO map_permission_user (role_id,permission_id,created_by,created_at,updated_by,updated_at)" +
        "VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $4, CURRENT_TIMESTAMP)", [
            newMapPermissionUser.role_id, newMapPermissionUser.permission_id, newMapPermissionUser.created_by, newMapPermissionUser.updated_by
        ], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("created MapPermissionUser: ", {
                id: res.insertId,
                ...newMapPermissionUser
            });
            result(null, {
                id: res.insertId,
                ...newMapPermissionUser
            });
        })
}

// update MapPermissionUser
MapPermissionUser.update = (MapPermissionUserId, updateMapPermissionUser, result) => {
    pool.query(`UPDATE map_permission_user SET role_id = $1, permission_id =$2, updated_by = $3, updated_at = CURRENT_TIMESTAMP WHERE map_permission_user_id = ${MapPermissionUserId}`, [
        updateMapPermissionUser.role_id, updateMapPermissionUser.permission_id, updateMapPermissionUser.updated_by
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

        console.log("updated MapPermissionUser: ", {
            id: res.MapPermissionUserId,
            ...updateMapPermissionUser
        });
        result(null, {
            id: res.MapPermissionUserId,
            ...updateMapPermissionUser
        });
    })
}

// delete MapPermissionUser
MapPermissionUser.delete = (MapPermissionUserId, result) => {
    pool.query(`DELETE FROM map_permission_user WHERE map_permission_user_id = ${MapPermissionUserId}`, (err, res) => {
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

        console.log("deleted MapPermissionUser: ", MapPermissionUserId);
        result(null, res);
    })
}

// select all data MapPermissionUser
MapPermissionUser.getAll = result => {
    pool.query("SELECT a.*, b.role_name, c.permission FROM map_permission_user a, tm_role b, tm_permission c WHERE a.role_id = b.role_id AND a.permission_id = c.permission_id", (err, res) => {
        if (err) {
            console.log("Error ", err);
            result(null, err);
            return;
        }

        console.log('MapPermissionUser : ', res.rows);
        result(null, res.rows);
    })
}

module.exports = MapPermissionUser;