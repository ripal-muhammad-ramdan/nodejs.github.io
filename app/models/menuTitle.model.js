const {
    request,
    response
} = require("express");
const pool = require("./db.js");

// constructor
const MenuTitle = function (menutitle) {
    this.menu_title_id = menutitle.menu_title_id;
    this.menu_title_name = menutitle.menu_title_name;
    this.created_by = menutitle.created_by;
    this.created_at = menutitle.created_at;
    this.updated_by = menutitle.updated_by;
    this.updated_at = menutitle.updated_at;
};

// search by MenuTitle id
MenuTitle.findById = (MenuTitleId, result) => {
    pool.query(`SELECT * FROM tm_menu_title WHERE menu_title_id = $1`, [MenuTitleId], (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.rows.length) {
            console.log("found MenuTitle : ", res.rows);
            result(null, res.rows);
            return;
        }

        result({
            kind: "not_found"
        }, null);
    });
};

// create MenuTitle
MenuTitle.create = (newMenuTitle, result) => {
    pool.query("INSERT INTO tm_menu_title (menu_title_name,created_by,created_at,updated_by,updated_at)" +
        "VALUES ($1, $2, CURRENT_TIMESTAMP, $3, CURRENT_TIMESTAMP)", [
            newMenuTitle.menu_title_name, newMenuTitle.created_by, newMenuTitle.updated_by
        ], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("created MenuTitle: ", {
                id: res.insertId,
                ...newMenuTitle
            });
            result(null, {
                id: res.insertId,
                ...newMenuTitle
            });
        })
}

// update MenuTitle
MenuTitle.update = (MenuTitleId, updateMenuTitle, result) => {
    pool.query(`UPDATE tm_menu_title SET menu_title_name = $1, updated_by = $2, updated_at = CURRENT_TIMESTAMP WHERE menu_title_id = ${MenuTitleId}`, [
        updateMenuTitle.menu_title_name, updateMenuTitle.updated_by
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

        console.log("updated MenuTitle: ", {
            id: res.MenuTitleId,
            ...updateMenuTitle
        });
        result(null, {
            id: res.MenuTitleId,
            ...updateMenuTitle
        });
    })
}

// delete MenuTitle
MenuTitle.delete = (MenuTitleId, result) => {
    pool.query(`DELETE FROM tm_menu_title WHERE menu_title_id = ${MenuTitleId}`, (err, res) => {
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

        console.log("deleted MenuTitle: ", MenuTitleId);
        result(null, res);
    })
}

// select all data MenuTitle
MenuTitle.getAll = result => {
    pool.query("SELECT * FROM tm_menu_title", (err, res) => {
        if (err) {
            console.log("Error ", err);
            result(null, err);
            return;
        }

        console.log('MenuTitle : ', res.rows);
        result(null, res.rows);
    })
}

module.exports = MenuTitle;