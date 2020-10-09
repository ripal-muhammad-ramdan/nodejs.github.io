const {
    request,
    response
} = require("express");
const pool = require("./db.js");

// constructor
const MapMenuTitle = function (mapmenuitle) {
    this.map_menu_title_id = mapmenuitle.map_menu_title_id;
    this.menu_id = mapmenuitle.menu_id;
    this.menu_title_id = mapmenuitle.menu_title_id;
    this.created_by = mapmenuitle.created_by;
    this.created_at = mapmenuitle.created_at;
    this.updated_by = mapmenuitle.updated_by;
    this.updated_at = mapmenuitle.updated_at;
};

// search by MapMenuTitle id
MapMenuTitle.findById = (MapMenuTitleId, result) => {
    pool.query(`SELECT * FROM map_menu_title WHERE map_menu_title_id = $1`, [MapMenuTitleId], (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.rows.length) {
            console.log("found MapMenuTitle : ", res.rows);
            result(null, res.rows);
            return;
        }

        result({
            kind: "not_found"
        }, null);
    });
};

// create MapMenuTitle
MapMenuTitle.create = (newMapMenuTitle, result) => {
    pool.query("INSERT INTO map_menu_title (menu_id,menu_title_id,created_by,created_at,updated_by,updated_at)" +
        "VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $4, CURRENT_TIMESTAMP)", [
            newMapMenuTitle.menu_id, newMapMenuTitle.menu_title_id, newMapMenuTitle.created_by, newMapMenuTitle.updated_by
        ], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("created MapMenuTitle: ", {
                id: res.insertId,
                ...newMapMenuTitle
            });
            result(null, {
                id: res.insertId,
                ...newMapMenuTitle
            });
        })
}

// update MapMenuTitle
MapMenuTitle.update = (MapMenuTitleId, updateMapMenuTitle, result) => {
    pool.query(`UPDATE map_menu_title SET menu_id = $1, menu_title_id =$2, updated_by = $3, updated_at = CURRENT_TIMESTAMP WHERE map_menu_title_id = ${MapMenuTitleId}`, [
        updateMapMenuTitle.menu_id, updateMapMenuTitle.menu_title_id, updateMapMenuTitle.updated_by
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

        console.log("updated MapMenuTitle: ", {
            id: res.MapMenuTitleId,
            ...updateMapMenuTitle
        });
        result(null, {
            id: res.MapMenuTitleId,
            ...updateMapMenuTitle
        });
    })
}

// delete MapMenuTitle
MapMenuTitle.delete = (MapMenuTitleId, result) => {
    pool.query(`DELETE FROM map_menu_title WHERE map_menu_title_id = ${MapMenuTitleId}`, (err, res) => {
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

        console.log("deleted MapMenuTitle: ", MapMenuTitleId);
        result(null, res);
    })
}

// select all data MapMenuTitle
MapMenuTitle.getAll = result => {
    pool.query("SELECT a.*, b.menu_name, c.menu_title_name FROM map_menu_title a, tm_menu b, tm_menu_title c WHERE a.menu_id = b.menu_id AND a.menu_title_id = c.menu_title_id", (err, res) => {
        if (err) {
            console.log("Error ", err);
            result(null, err);
            return;
        }

        console.log('MapMenuTitle : ', res.rows);
        result(null, res.rows);
    })
}

module.exports = MapMenuTitle;