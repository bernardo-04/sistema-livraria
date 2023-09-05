const { Router } = require("express");

const {
    booksList,
    addNewBook,
    editBook,
    deleteBook,
} = require("../controllers/booksController");

const { checkBookInfo, checkBookExists } = require("../middlewares/booksMW");

const {
    checkSystemPassword,
    checkUserPassword,
} = require("../middlewares/authentication");

const {
    cart,
    addToCart,
    removeFromCart,
} = require("../controllers/cartController");

const { checkUserExists } = require("../middlewares/usersMW");

const rotas = Router();

rotas.get("/livros", booksList);
rotas.post("/livros", checkSystemPassword, checkBookInfo, addNewBook);
rotas.patch("/livros/:id", checkSystemPassword, checkBookExists, editBook);
rotas.delete("/livros/:id", checkSystemPassword, checkBookExists, deleteBook);

rotas.get("/livros/carrinho/:id", checkUserExists, checkUserPassword, cart);
rotas.post(
    "/livros/:bookId/comprar/:id",
    checkUserExists,
    checkUserPassword,
    checkBookExists,
    addToCart
);
rotas.delete(
    "/carrinho/:id/:bookId",
    checkUserExists,
    checkUserPassword,
    removeFromCart
);

module.exports = rotas;
