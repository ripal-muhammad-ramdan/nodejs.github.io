const pool = require("./db.js");

// constructor
const User = function(user) {
    this.role_id = user.role_id;
    this.username = user.username;
    this.password = user.password;
    this.is_active = 1;
    this.created_by = user.userby;
    this.created_at = Date(Date.now());
    this.updated_by = user.userby;
    this.updated_at = Date(Date.now());
};

User.create = (newUser, result) => {
    pool.query("INSERT INTO tm_users (username, role_id, password, is_active, created_by, updated_by) " +
            "VALUES ($1, $2, $3, $4, $5, $6)", 
            [newUser.username, newUser.role_id, newUser.password, newUser.is_active, 
                newUser.created_by, newUser.updated_by], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

User.findByUsername = (username, result) => {
    
    pool.query("SELECT username, password FROM tm_users WHERE username = $1",[username], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.rows.length) {
            console.log("found users: ", res.rows);
            result(null, res.rows);
            return;
        }
        
        result({ kind: "not_found" }, null);
    });
};

User.getAll = result => {
    pool.query("SELECT * FROM tm_users", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("users: ", res.rows);
        result(null, res.rows);
    });
};

module.exports = User;