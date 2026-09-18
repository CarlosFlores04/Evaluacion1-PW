const express = require("express");
const router = express.Router();
const incidenciasController = require("../controllers/incidenciasController");
router.post("/incidencias", incidenciasController.registrarIncidencia);
router.get("/incidencias", incidenciasController.listarIncidencias);
router.get("/incidencias/:id", incidenciasController.buscarIncidenciaPorId);
router.put("/incidencias/:id/estado", incidenciasController.cambiarEstadoIncidencia);
module.exports = router;
