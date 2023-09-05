const fs = require("fs/promises");

const {
    readBooksFile,
    readUsersFile,
    updateBooksFile,
} = require("./dataController");

let booksData;
readBooksFile()
    .then((conteudo) => {
        booksData = JSON.parse(conteudo);
    })
    .catch((erro) => {
        console.log(erro);
    });

let usersData;
readUsersFile()
    .then((conteudo) => {
        usersData = JSON.parse(conteudo);
    })
    .catch((erro) => {
        console.log(erro);
    });

const findBook = (id) => {
    const result = booksData.books.find((book) => {
        return book.id == id;
    });

    return result;
};

const booksList = async (req, res) => {
    return res.status(200).json(booksData.books);
};

const addNewBook = async (req, res) => {
    const { titulo, autor, ano, numPaginas, valor } = req.body;

    const newBook = {
        id: booksData.bookId,
        titulo,
        autor,
        ano,
        numPaginas,
        valor,
    };
    booksData.bookId++;

    booksData.books.push(newBook);

    updateBooksFile(booksData);

    return res.status(201).json({ mensagem: "Livro cadastrado com sucesso." });
};

const editBook = async (req, res) => {
    const { id } = req.params;
    const { titulo, autor, ano, numPaginas, valor } = req.body;

    const book = findBook(id);

    if (titulo) {
        book.titulo = titulo;
    }
    if (autor) {
        book.autor = autor;
    }
    if (ano) {
        book.ano = ano;
    }
    if (numPaginas) {
        book.numPaginas = numPaginas;
    }
    if (valor) {
        book.valor = valor;
    }

    updateBooksFile(booksData);

    return res.status(200).json({ mensagem: "Livro atualizado com sucesso." });
};

const deleteBook = async (req, res) => {
    const { id } = req.params;

    const book = findBook(id);

    booksData.books.splice(booksData.books.indexOf(book), 1);

    updateBooksFile(booksData);

    return res.status(204).json();
};

module.exports = {
    findBook,
    booksList,
    addNewBook,
    editBook,
    deleteBook,
};
