const fs = require("fs/promises");
const { readUsersFile, updateUsersFile } = require("./dataController");

let usersData;
readUsersFile()
    .then((conteudo) => {
        usersData = JSON.parse(conteudo);
    })
    .catch((erro) => {
        console.log(erro);
    });

const findUser = (parame, value) => {
    const result = usersData.users.find((user) => {
        if (parame == "cpf") {
            return user.cpf == value;
        }
        if (parame == "email") {
            return user.email == value;
        }
        if (parame == "id") {
            return user.id == value;
        }
    });

    return result;
};

const usersList = async (req, res) => {
    return res.status(200).json(usersData.users);
};

const addNewUser = async (req, res) => {
    const { cpf, nome, email, telefone, senha } = req.body;

    const newUser = {
        id: usersData.userId,
        cpf,
        nome,
        email,
        telefone,
        senha,
        carrinho: [],
    };
    usersData.userId++;

    usersData.users.push(newUser);

    updateUsersFile(usersData);

    return res
        .status(201)
        .json({ mensagem: "Cadastro finalizado com sucesso." });
};

const editUser = async (req, res) => {
    const { id } = req.params;
    const { cpf, nome, email, telefone } = req.body;
    const user = findUser("id", id);

    if (cpf) {
        user.cpf = cpf;
    }
    if (nome) {
        user.nome = nome;
    }
    if (email) {
        user.email = email;
    }
    if (telefone) {
        user.telefone = telefone;
    }

    updateUsersFile(usersData);

    return res.status(200).json({ mensagem: "Usuário atualizado com sucesso" });
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = findUser("id", id);

    usersData.users.splice(usersData.users.indexOf(user), 1);

    updateUsersFile(usersData);

    return res.status(204).json();
};

module.exports = {
    findUser,
    usersList,
    addNewUser,
    editUser,
    deleteUser,
};
