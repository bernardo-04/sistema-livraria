const fs = require("fs/promises");
const { readUsersFile, updateUsersFile } = require("./dataController");

const { findUser } = require("./usersController");
const { findBook } = require("./booksController");

let usersData;
readUsersFile()
    .then((conteudo) => {
        usersData = JSON.parse(conteudo);
    })
    .catch((erro) => {
        console.log(erro);
    });

const checkBookInCart = (userId, bookId) => {
    const user = findUser("id", userId);

    const checkBook = user.carrinho.find((book) => {
        return book.id == bookId;
    });

    if (checkBook) {
        return true;
    } else {
        return false;
    }
};

const cart = async (req, res) => {
    const { id } = req.params;
    const user = findUser("id", id);

    let total = 0;
    if (user.carrinho.length > 0) {
        total = user.carrinho.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.valor * currentValue.quantidade;
        }, 0);
    }

    return res.status(200).json({ carrinho: user.carrinho, valorTotal: total });
};

const addToCart = async (req, res) => {
    const { id, bookId } = req.params;

    const userIndex = usersData.users.findIndex((user) => {
        return user.id == id;
    });

    const bookIndex = usersData.users[userIndex].carrinho.findIndex((book) => {
        return book.id == bookId;
    });

    let book = findBook(bookId);

    if (checkBookInCart(id, bookId)) {
        usersData.users[userIndex].carrinho[bookIndex].quantidade++;
    } else {
        book = {
            ...book,
            quantidade: 1,
        };
        usersData.users[userIndex].carrinho.push(book);
    }

    updateUsersFile(usersData);

    return res.status(201).json({
        mensagem: `${book.titulo} adicionado ao carrinho com sucesso.`,
    });
};

const removeFromCart = async (req, res) => {
    const { id, bookId } = req.params;

    const userIndex = usersData.users.findIndex((user) => {
        return user.id == id;
    });

    const bookIndex = usersData.users[userIndex].carrinho.findIndex((book) => {
        return book.id == bookId;
    });

    const booksAmount =
        usersData.users[userIndex].carrinho[bookIndex].quantidade;

    if (booksAmount > 1) {
        usersData.users[userIndex].carrinho[bookIndex].quantidade--;
    } else {
        usersData.users[userIndex].carrinho.splice(
            usersData.users[userIndex].carrinho[bookIndex],
            1
        );
    }

    updateUsersFile(usersData);

    return res.status(204).json();
};

module.exports = {
    cart,
    addToCart,
    removeFromCart,
};
