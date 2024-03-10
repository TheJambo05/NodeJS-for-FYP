const userrouter = require("express").Router();
const userController = require("../controllers/userController");

userrouter.post("/addUser", userController.createUser);

module.exports = userrouter;


// const UserRoutes = require('express').Router();
// const UserController = require('./../controllers/user_controller');

// UserRoutes.post("/createAccount", UserController.createAccount);
// UserRoutes.post("/signIn", UserController.signIn);

// module.exports = UserRoutes;
