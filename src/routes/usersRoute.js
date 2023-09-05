const { Router } = require("express");

const {
    checkRegisterInfo,
    checkUserExists,
} = require("../middlewares/usersMW");

const {
    usersList,
    addNewUser,
    editUser,
    deleteUser,
} = require("../controllers/usersController");

const {
    checkSystemPassword,
    checkUserPassword,
} = require("../middlewares/authentication");

const rotas = Router();

rotas.get("/usuarios", checkSystemPassword, usersList);
rotas.post("/usuarios", checkRegisterInfo, addNewUser);

rotas.patch("/usuarios/:id", checkUserExists, checkUserPassword, editUser);

rotas.delete("/usuarios/:id", checkUserExists, checkUserPassword, deleteUser);

module.exports = rotas;
