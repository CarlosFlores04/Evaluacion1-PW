const helpers = require("../utils/helpers");

const incidencias = [];

// busca el primer id libre, revisando desde el 1 hacia arriba
function obtenerSiguienteIdDisponible() {
    let candidato = 1;
    while (incidencias.some((incidencia) => incidencia.id === candidato)) {
        candidato++;
    }
    return candidato;
}

function registrarIncidencia(req, res) {
    const { empleado, area, descripcion, prioridad } = req.body;

    if (!helpers.esTextoValido(empleado)) {
        return res.status(400).json({ mensaje: "El campo empleado es obligatorio y no puede estar vacio" });
    } else if (!helpers.esTextoValido(area)) {
        return res.status(400).json({ mensaje: "El campo area es obligatorio y no puede estar vacio" });
    } else if (!helpers.esTextoValido(descripcion)) {
        return res.status(400).json({ mensaje: "El campo descripcion es obligatorio y no puede estar vacio" });
    } else if (!helpers.esTextoValido(prioridad)) {
        return res.status(400).json({ mensaje: "El campo prioridad es obligatorio y no puede estar vacio" });
    } else if (!helpers.esPrioridadValida(prioridad)) {
        return res.status(400).json({ mensaje: "La prioridad debe ser Alta, Media o Baja" });
    }

    const nuevaIncidencia = {
        id: obtenerSiguienteIdDisponible(),
        empleado: empleado.trim(),
        area: area.trim(),
        descripcion: descripcion.trim(),
        prioridad: prioridad.trim(),
        estado: "Pendiente"
    };

    incidencias.push(nuevaIncidencia);

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

function cambiarEstadoIncidencia(req, res) {
    const id = Number(req.params.id);
    const incidenciaEncontrada = incidencias.find((incidencia) => incidencia.id === id);

    if (!incidenciaEncontrada) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    const estadoRecibido = req.body.estado;

    if (!helpers.esTextoValido(estadoRecibido)) {
        return res.status(400).json({ mensaje: "El estado es obligatorio" });
    }

    const estadoNormalizado = helpers.normalizarEstado(estadoRecibido);

    if (!estadoNormalizado) {
        return res.status(400).json({ mensaje: "Estado no valido. Los estados permitidos son: Pendiente, En Proceso, Resuelta, Cancelada" });
    }

    incidenciaEncontrada.estado = estadoNormalizado;

    res.status(200).json({ mensaje: "Estado actualizado correctamente", incidencia: incidenciaEncontrada });
}

function eliminarIncidencia(req, res) {
    const id = Number(req.params.id);
    const indice = incidencias.findIndex((incidencia) => incidencia.id === id);

    if (indice === -1) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    incidencias.splice(indice, 1);

    res.status(200).json({ mensaje: "Incidencia eliminada correctamente" });
}

function obtenerEstadisticas(req, res) {
    const estadisticas = helpers.calcularEstadisticas(incidencias);
    res.status(200).json(estadisticas);
}

function obtenerClasificacion(req, res) {
    const id = Number(req.params.id);
    const incidenciaEncontrada = incidencias.find((incidencia) => incidencia.id === id);

    if (!incidenciaEncontrada) {
        return res.status(404).json({ mensaje: "Incidencia no encontrada" });
    }

    const clasificacion = helpers.obtenerClasificacionPorPrioridad(incidenciaEncontrada.prioridad);

    res.status(200).json({ id: incidenciaEncontrada.id, clasificacion: clasificacion });
}

module.exports = {
    registrarIncidencia,
    listarIncidencias,
    buscarIncidenciaPorId,
    cambiarEstadoIncidencia,
    eliminarIncidencia,
    obtenerEstadisticas,
    obtenerClasificacion
};