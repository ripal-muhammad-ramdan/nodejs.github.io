const config = require("../config/auth.config");
const Users = require("../models/users.model.js");
const UsersController = require("../controllers/users.controller.js");
const Roles = require("../models/roles.model.js");

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Save User to Database
    if (!req.body) {
        res.status(400).send({
        message: "Content can not be empty!"
        });
    }

    // Create a Customer
    const users = new Users({
        role_id : req.body.role_id,
        username : req.body.username,
        password : bcrypt.hashSync(req.body.password, 8),
        created_by : req.body.userby,
        updated_by : req.body.userby
    });

    // Save Customer in the database
    Users.create(users, (err, data) => {
        if (err)
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Users."
        });
        else res.status(200).send(data);
    });
    
    /*User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    .then(user => {
        if (req.body.roles) {
            Role.findAll({
            where: {
                name: {
                [Op.or]: req.body.roles
                }
            }
            }).then(roles => {
            user.setRoles(roles).then(() => {
                res.send({ message: "User was registered successfully!" });
            });
            });
        } else {
            // user role = 1
            user.setRoles([1]).then(() => {
            res.send({ message: "User was registered successfully!" });
            });
        }
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });*/
};

exports.signin = (req, res) => {
    Users.findByUsername(req.body.username, (err, data) => {
        if (err) {
            console.log(err.message)
            return res.status(500).send({ message: err.message || "Some error occurred while creating the Users."});
        } else { 
            if (!data) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                data[0].password
            );
    
            if (!passwordIsValid) {
                return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
                });
            }
    
            var token = jwt.sign({ id: data[0].user_id }, config.secret, {
                expiresIn: 86400 // 24 hours
            });
            
            var _id = data[0].user_id;
            var _username = data[0].username;
            var _email = data[0].email;
            res.status(200).send({
                id: _id,
                username: _username,
                email: _email,
                roles: "ROLE_" + data[0].role_id,
                accessToken: token
            });       
        }
    });
};