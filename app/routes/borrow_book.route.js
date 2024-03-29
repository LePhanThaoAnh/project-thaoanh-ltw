const express = require("express");
const borrowBooks = require("../controllers/borrow_book.controller");

const router = express.Router();

router.route("/")
    .get(borrowBooks.findAll)
    .post(borrowBooks.create)
    .delete(borrowBooks.deleteAll);

router.route("/:id")
    .get(borrowBooks.findOne)
    .put(borrowBooks.update)
    .delete(borrowBooks.delete);

module.exports = router;