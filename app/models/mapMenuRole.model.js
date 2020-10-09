const {
    request,
    response
} = require("express");
const pool = require("./db.js");

// constructor
const MapMenuRole = function (mapmenurole) {
    this.map_menu_role_id = mapmenurole.map_menu_role_id;
    this.role_id = mapmenurole.role_id;
    this.menu_id = mapmenurole.menu_id;
    this.created_by = mapmenurole.created_by;
    this.created_at = mapmenurole.created_at;
    this.updated_by = mapmenurole.updated_by;
    this.updated_at = mapmenurole.updated_at;
};

// search by MapMenuRoleId
MapMenuRole.findById = (MapMenuRoleId, result) => {
    pool.query(`SELECT * FROM map_menu_role WHERE map_menu_role_id = $1`, [MapMenuRoleId], (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.rows.length) {
            console.log("found MapMenuRole : ", res.rows);
            result(null, res.rows);
            return;
        }

        result({
            kind: "not_found"
        }, null);
    });
};

// create MapMenuRole
MapMenuRole.create = (newMapMenuRole, result) => {
    pool.query("INSERT INTO map_menu_role (role_id,menu_id,created_by,created_at,updated_by,updated_at)" +
        "VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $4, CURRENT_TIMESTAMP)", [
            newMapMenuRole.role_id, newMapMenuRole.menu_id, newMapMenuRole.created_by, newMapMenuRole.updated_by
        ], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("created MapMenuRole: ", {
                id: res.insertId,
                ...newMapMenuRole
            });
            result(null, {
                id: res.insertId,
                ...newMapMenuRole
            });
        })
}

// update MapMenuRole
MapMenuRole.update = (MapMenuRoleId, updateMapMenuRole, result) => {
    pool.query(`UPDATE map_menu_role SET role_id = $1, menu_id =$2, updated_by = $3, updated_at = CURRENT_TIMESTAMP WHERE map_menu_role_id = ${MapMenuRoleId}`, [
        updateMapMenuRole.role_id, updateMapMenuRole.menu_id, updateMapMenuRole.updated_by
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

        console.log("updated MapMenuRole: ", {
            id: res.MapMenuRoleId,
            ...updateMapMenuRole
        });
        result(null, {
            id: res.MapMenuRoleId,
            ...updateMapMenuRole
        });
    })
}

// delete MapMenuRole
MapMenuRole.delete = (MapMenuRoleId, result) => {
    pool.query(`DELETE FROM map_menu_role WHERE map_menu_role_id = ${MapMenuRoleId}`, (err, res) => {
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

        console.log("deleted MapMenuRole: ", MapMenuRoleId);
        result(null, res);
    })
}

// select all data MapMenuRole
MapMenuRole.getAll = result => {
    pool.query("SELECT a.*, b.role_name, c.menu_name, c.menu_route, c.menu_icon FROM map_menu_role a, tm_role b, tm_menu c WHERE a.role_id = b.role_id AND a.menu_id = c.menu_id", (err, res) => {
        if (err) {
            console.log("Error ", err);
            result(null, err);
            return;
        }

        console.log('MapMenuRole : ', res.rows);
        result(null, res.rows);
    })
}

module.exports = MapMenuRole;