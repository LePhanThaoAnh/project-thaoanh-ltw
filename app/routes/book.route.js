const express = require("express");
const books = require("../controllers/book.controller");
// const { Middleware } = require("../middlewares/index");
// const mid = new Middleware();
// // Middleware ensureAuthenticated sẽ được áp dụng cho tất cả các tuyến trong router này
// router.use(mid.ensureAuthenticated);
const router = express.Router();


router.route("/")
    .get(books.findAll)
    .post(books.create)
    .delete(books.deleteAll);

router.route("/:id")
    .get(books.findOne)
    .put(books.update)
    .delete(books.delete);

module.exports = router;
