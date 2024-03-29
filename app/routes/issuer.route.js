const express = require("express");
const issuers = require("../controllers/issuer.controller");

const router = express.Router();

router.route("/")
    .get(issuers.findAll)
    .post(issuers.create)
    .delete(issuers.deleteAll);

router.route("/:id")
    .get(issuers.findOne)
    .put(issuers.update)
    .delete(issuers.delete);

module.exports = router;