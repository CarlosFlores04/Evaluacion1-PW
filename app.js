const express = require("express");
const incidenciasRouter = require("./routes/incidencias");
const app = express();
const PUERTO = process.env.PORT || 3000;
app.use(express.json());
app.use("/", incidenciasRouter);
app.use((req, res) => {
res.status(404).json({ mensaje: "Ruta no encontrada" });
});
app.listen(PUERTO, () => {
console.log("Servidor de incidencias escuchando en http://localhost:" + PUERTO);
});