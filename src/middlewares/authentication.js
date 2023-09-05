const { readUsersFile } = require("../controllers/dataController");
const { findUser } = require("../controllers/usersController");

let usersData;
readUsersFile()
    .then((conteudo) => {
        usersData = JSON.parse(conteudo);
    })
    .catch((erro) => {
        console.log(erro);
    });

const checkSystemPassword = async (req, res, next) => {
    const { senha } = req.query;

    if (senha != usersData.system_password || !senha) {
        return res.status(401).json({ mensagem: "Não autorizado." });
    }

    next();
};

const checkUserPassword = async (req, res, next) => {
    const { senha } = req.query;
    const { id } = req.params;

    const user = findUser("id", id);

    if (senha != user.senha) {
        return res
            .status(401)
            .json({ mensagem: "Erro na autenticação do usuário." });
    }

    next();
};

module.exports = {
    checkSystemPassword,
    checkUserPassword,
};
