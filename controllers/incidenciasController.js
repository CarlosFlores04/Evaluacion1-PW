const incidencias = [];
let siguienteId = 1;

function registrarIncidencia(req, res) {
const { empleado, area, descripcion, prioridad } = req.body;
if (!empleado || empleado.trim() === "") {
return res.status(400).json({ mensaje: "El campo empleado es obligatorio y no puede estar vacio"
});
} else if (!area || area.trim() === "") {
return res.status(400).json({ mensaje: "El campo area es obligatorio y no puede estar vacio"
} else if (!descripcion || descripcion.trim() === "") {
return res.status(400).json({ mensaje: "El campo descripcion es obligatorio y no puede estar
vacio" });
} else if (!prioridad || prioridad.trim() === "") {
return res.status(400).json({ mensaje: "El campo prioridad es obligatorio y no puede estar vacio"
});
}
const nuevaIncidencia = {
id: siguienteId,
empleado: empleado.trim(),
area: area.trim(),
descripcion: descripcion.trim(),
prioridad: prioridad.trim(),
estado: "Pendiente"
};
incidencias.push(nuevaIncidencia);
siguienteId++;
res.status(201).json({ mensaje: "Incidencia registrada correctamente" });
}
function listarIncidencias(req, res) {
res.status(200).json(incidencias);
}
function buscarIncidenciaPorId(req, res) {
const id = Number(req.params.id);
const incidenciaEncontrada = incidencias.find((incidencia) => incidencia.id === id);
if (!incidenciaEncontrada) {
return res.status(404).json({ mensaje: "Incidencia no encontrada" });
}
res.status(200).json(incidenciaEncontrada);
}
module.exports = {
registrarIncidencia,
listarIncidencias,
buscarIncidenciaPorId
};