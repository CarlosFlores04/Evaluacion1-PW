function cambiarEstadoIncidencia(req, res) {
    const id = Number(req.params.id);

    const incidenciaEncontrada = incidencias.find(
        (incidencia) => incidencia.id === id
    );

    if (!incidenciaEncontrada) {
        return res.status(404).json({
            mensaje: "Incidencia no encontrada"
        });
    }

    const estadoRecibido = req.body.estado;

    if (!helpers.esTextoValido(estadoRecibido)) {
        return res.status(400).json({
            mensaje: "El estado es obligatorio"
        });
    }

    const estadoNormalizado = helpers.normalizarEstado(estadoRecibido);

    if (!estadoNormalizado) {
        return res.status(400).json({
            mensaje:
                "Estado no valido. Los estados permitidos son: Pendiente, En Proceso, Resuelta, Cancelada"
        });
    }

    incidenciaEncontrada.estado = estadoNormalizado;

    res.status(200).json({
        mensaje: "Estado actualizado correctamente",
        incidencia: incidenciaEncontrada
    });
}
