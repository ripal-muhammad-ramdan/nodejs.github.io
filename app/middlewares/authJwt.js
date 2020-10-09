const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const User = require("../models/users.model.js");

verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];

    if (!token) {
        return res.status(403).send({
        message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

isAdmin = (req, res) => {
    User.findById(req.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.userId
                });
            }
            return;
        } else {
            if (data.role_id === 2) {
                return;
            }
            res.status(403).send({
                message: "Require Admin Role!"
            });
            return;
        }
    });
};

isHelpdesk = (req, res, next) => {
    User.findById(req.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.userId
                });
            }
            return;
        } else {
            if (data.role_id === 3) {
                return;
            }
            res.status(403).send({
                message: "Require Admin Role!"
            });
            return;
        }
    });
};

isCustmoer = (req, res) => {
    User.findById(req.userId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Customer with id ${req.userId}.`
                });
            } else {
                res.status(500).send({
                    message: "Error retrieving Customer with id " + req.userId
                });
            }
            return;
        } else {
            if (data.role_id === 4) {
                return;
            }
            res.status(403).send({
                message: "Require Admin Role!"
            });
            return;
        }
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin,
    isHelpdesk: isHelpdesk,
    isCustmoer: isCustmoer
};
module.exports = authJwt;