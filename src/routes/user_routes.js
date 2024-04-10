const UserRoutes = require('express').Router();
const UserController = require('./../controllers/user_controller');

UserRoutes.post("/createAccount", UserController.createAccount);
UserRoutes.post("/signIn", UserController.signIn);
UserRoutes.put("/:id", UserController.updateUser);
UserRoutes.put("/:id/changePassword", UserController.changePassword);
UserRoutes.get("/", UserController.fetchAllUsers);
UserRoutes.delete("/:id", UserController.removeUser);

module.exports = UserRoutes;