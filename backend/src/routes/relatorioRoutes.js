const express = require("express");

const RelatorioController = require("../controllers/RelatorioController");

const {
    autenticarToken,
    autorizarAdmin
} = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(
    autenticarToken,
    autorizarAdmin
);

router.get(
    "/disciplinas",
    RelatorioController.disciplinasMatriculadas
);

module.exports = router;