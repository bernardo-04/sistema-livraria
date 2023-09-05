const express = require("express");
const users = require("./routes/usersRoute");
const books = require("./routes/booksRoute");

const app = express();

app.use(express.json());
app.use(users);
app.use(books);

app.listen(3000);
