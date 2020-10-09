const {
    request,
    response
} = require("express");
const pool = require("./db.js");

// constructor
const MapModuleUser = function (mapmodulenuser) {
    this.map_modul_user_id = mapmodulenuser.map_modul_user_id;
    this.module_id = mapmodulenuser.module_id;
    this.role_id = mapmodulenuser.role_id;
    this.created_by = mapmodulenuser.created_by;
    this.created_at = mapmodulenuser.created_at;
    this.updated_by = mapmodulenuser.updated_by;
    this.updated_at = mapmodulenuser.updated_at;
};

// search by MapModuleUserId
MapModuleUser.findById = (MapModuleUserId, result) => {
    pool.query(`SELECT * FROM map_module_user WHERE map_modul_user_id = $1`, [MapModuleUserId], (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.rows.length) {
            console.log("found MapModuleUser : ", res.rows);
            result(null, res.rows);
            return;
        }

        result({
            kind: "not_found"
        }, null);
    });
};

// create MapModuleUser
MapModuleUser.create = (newMapModuleUser, result) => {
    pool.query("INSERT INTO map_module_user (module_id,role_id,created_by,created_at,updated_by,updated_at)" +
        "VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $4, CURRENT_TIMESTAMP)", [
            newMapModuleUser.module_id, newMapModuleUser.role_id, newMapModuleUser.created_by, newMapModuleUser.updated_by
        ], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("created MapModuleUser: ", {
                id: res.insertId,
                ...newMapModuleUser
            });
            result(null, {
                id: res.insertId,
                ...newMapModuleUser
            });
        })
}

// update MapModuleUser
MapModuleUser.update = (MapModuleUserId, updateMapPermissionUser, result) => {
    pool.query(`UPDATE map_module_user SET module_id = $1, role_id =$2, updated_by = $3, updated_at = CURRENT_TIMESTAMP WHERE map_modul_user_id = ${MapModuleUserId}`, [
        updateMapPermissionUser.module_id, updateMapPermissionUser.role_id, updateMapPermissionUser.updated_by
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
            id: res.MapModuleUserId,
            ...updateMapPermissionUser
        });
        result(null, {
            id: res.MapModuleUserId,
            ...updateMapPermissionUser
        });
    })
}

// delete MapModuleUser
MapModuleUser.delete = (MapModuleUserId, result) => {
    pool.query(`DELETE FROM map_module_user WHERE map_modul_user_id = ${MapModuleUserId}`, (err, res) => {
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

        console.log("deleted MapModuleUser: ", MapModuleUserId);
        result(null, res);
    })
}

// select all data MapModuleUser
MapModuleUser.getAll = result => {
    pool.query("SELECT a.*, b.module_name, b.module_route, b.module_icon, c.role_name FROM map_module_user a, tm_module b, tm_role c WHERE a.module_id = b.module_id AND a.role_id = c.role_id", (err, res) => {
        if (err) {
            console.log("Error ", err);
            result(null, err);
            return;
        }

        console.log('MapModuleUser : ', res.rows);
        result(null, res.rows);
    })
}

module.exports = MapModuleUser;