const fs = require("fs/promises");
const { findUser } = require("../controllers/usersController");

const checkRegisterInfo = async (req, res, next) => {
    const { cpf, nome, email, telefone, senha } = req.body;

    if (!cpf) {
        return res.status(400).json({
            mensagem: "É necessário informar o seu CPF para se cadastrar.",
        });
    } else {
        const checkCpf = findUser("cpf", cpf);

        if (checkCpf) {
            return res.status(200).json({
                mensagem: "Já existe uma conta registrada nesse CPF.",
            });
        }
    }

    if (!nome) {
        return res.status(400).json({
            mensagem: "É necessário informar o seu nome para se cadastrar.",
        });
    }

    if (!email) {
        return res.status(400).json({
            mensagem: "É necessário informar o seu email para se cadastrar.",
        });
    } else {
        const checkEmail = findUser("email", email);

        if (checkEmail) {
            return res.status(200).json({
                mensagem: "Já existe uma conta registrada nesse email.",
            });
        }
    }

    if (!telefone) {
        return res.status(400).json({
            mensagem:
                "É necessário informar o seu número de telefone para se cadastrar.",
        });
    }

    if (!senha) {
        return res.status(400).json({
            mensagem: "É necessário informar uma senha para se cadastrar",
        });
    }

    next();
};

const checkUserExists = async (req, res, next) => {
    const { id } = req.params;

    const user = findUser("id", id);

    if (!user) {
        return res.status(404).json({ mensagem: "Usuário não encontrado" });
    }

    next();
};

module.exports = {
    checkRegisterInfo,
    checkUserExists,
};
