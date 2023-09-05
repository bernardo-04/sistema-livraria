const fs = require("fs/promises");

const readUsersFile = async () => {
    try {
        const usersData = await fs.readFile("./src/data/users.json");
        return usersData;
    } catch (error) {
        console.log(error);
    }
};

const readBooksFile = async () => {
    try {
        const booksData = await fs.readFile("./src/data/books.json");
        return booksData;
    } catch (error) {
        console.log(error);
    }
};

const updateUsersFile = async (data) => {
    try {
        await fs.writeFile("./src/data/users.json", JSON.stringify(data));
    } catch (error) {
        console.log(error.message);
    }
};

const updateBooksFile = async (data) => {
    try {
        await fs.writeFile("./src/data/books.json", JSON.stringify(data));
    } catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    readUsersFile,
    readBooksFile,
    updateUsersFile,
    updateBooksFile,
};
