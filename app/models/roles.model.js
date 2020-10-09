const pool = require("./db.js");

// constructor
const Role = function (role) {
    this.role_id = role.role_id;
    this.role_name = role.role_name;
    this.created_by = role.created_by;
    this.created_at = role.created_at;
    this.updated_by = role.updated_by;
    this.updated_at = role.updated_at;
    this.is_active = role.is_active;
};

Role.findById = (roleId, result) => {
    pool.query(`SELECT * FROM tm_role WHERE role_id = $1`, [roleId], (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.rows.length) {
            console.log("found Role : ", res.rows);
            result(null, res.rows);
            return;
        }

        result({
            kind: "not_found"
        }, null);
    });
};

// create role
Role.create = (newRole, result) => {
    pool.query("INSERT INTO tm_role (role_name,created_by,created_at,updated_by,updated_at,is_active)" +
        "VALUES ($1, $2, CURRENT_TIMESTAMP, $3, CURRENT_TIMESTAMP, $4)", [
            newRole.role_name, newRole.created_by, newRole.updated_by, newRole.is_active
        ], (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("created role: ", {
                id: res.insertId,
                ...newRole
            });
            result(null, {
                id: res.insertId,
                ...newRole
            });
        })
}

// update role
Role.update = (RoleId, updateRole, result) => {
    pool.query(`UPDATE tm_role SET role_name = $1, updated_by = $2, is_active = $3, updated_at = CURRENT_TIMESTAMP WHERE role_id = ${RoleId}`, [
        updateRole.attribute_name, updateRole.updated_by, updateRole.is_active
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

        console.log("updated role: ", {
            id: res.RoleId,
            ...updateRole
        });
        result(null, {
            id: res.RoleId,
            ...updateRole
        });
    })
}

// delete role
Role.delete = (RoleId, result) => {
    pool.query(`DELETE FROM tm_role WHERE role_id = ${RoleId}`, (err, res) => {
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

        console.log("deleted role: ", RoleId);
        result(null, res);
    })
}

// select all data role
Role.getAll = result => {
    pool.query("SELECT * FROM tm_role", (err, res) => {
        if (err) {
            console.log("Error ", err);
            result(null, err);
            return;
        }

        console.log('role : ', res.rows);
        result(null, res.rows);
    })
}

module.exports = Role;