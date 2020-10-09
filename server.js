const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
    //origin: "http://localhost:3000"
    origin: "*"
};

app.use(cors(corsOptions));
// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// simple route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Rest Api UserMgt."
    });
});

require("./app/routes/auth.routes.js")(app);
require("./app/routes/users.routes.js")(app);
require("./app/routes/attribute.routes.js")(app);
require("./app/routes/roles.routes.js")(app);
require("./app/routes/mapPermissionUser.routes.js")(app);
require("./app/routes/mapModuleUser.routes.js")(app);
require("./app/routes/mapMenuRole.routes.js")(app);
require("./app/routes/mapAttribute.routes.js")(app);
require("./app/routes/mapAttributeValue.routes.js")(app);
require("./app/routes/menuTitle.routes.js")(app);
require("./app/routes/mapMenuTitle.routes.js")(app);
// set port, listen for requests
app.listen(8081, () => {
    console.log("Server is running on port 8081.");
});