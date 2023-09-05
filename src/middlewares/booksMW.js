const fs = require("fs/promises");
const { findBook } = require("../controllers/booksController");

const checkBookInfo = async (req, res, next) => {
    const { titulo, autor, ano, numPaginas, valor } = req.body;

    if (!titulo) {
        return res.status(400).json({
            mensagem: "É necessário informar o nome do livro para cadastrá-lo.",
        });
    }

    if (!autor) {
        return res.status(400).json({
            mensagem:
                "É necessário informar o nome do autor do livro para cadastrá-lo.",
        });
    }

    if (!ano) {
        return res.status(400).json({
            mensagem: "É necessário informar o ano do livro para cadastrá-lo.",
        });
    }

    if (!numPaginas) {
        return res.status(400).json({
            mensagem:
                "É necessário informar o número de páginas do livro para cadastrá-lo.",
        });
    }

    if (!valor) {
        return res.status(400).json({
            mensagem:
                "É necessário informar o valor (em reais) do livro para cadastrá-lo.",
        });
    }

    next();
};

const checkBookExists = async (req, res, next) => {
    const { id, bookId } = req.params;

    let book;
    if (id) {
        book = findBook(id);
    } else if (bookId) {
        book = findBook(bookId);
    }

    if (!book) {
        return res.status(404).json({ mensagem: "Livro não encontrado." });
    }

    next();
};

module.exports = {
    checkBookInfo,
    checkBookExists,
};
