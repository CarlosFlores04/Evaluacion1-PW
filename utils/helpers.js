function esTextoValido(valor) {
    return typeof valor === "string" && valor.trim() !== "";
}

function esPrioridadValida(prioridad) {
    if (!esTextoValido(prioridad)) {
        return false;
    }

    switch (prioridad.trim()) {
        case "Alta":
        case "Media":
        case "Baja":
            return true;
        default:
            return false;
    }
}
//pasa el estado a minusculas y lo compara
function normalizarEstado(estadoRecibido) {
    const estadoLimpio = estadoRecibido.trim().toLowerCase();

    switch (estadoLimpio) {
        case "pendiente":
            return "Pendiente";
        case "en proceso":
            return "En Proceso";
        case "resuelta":
            return "Resuelta";
        case "cancelada":
            return "Cancelada";
        default:
            return null;
    }
}

function obtenerClasificacionPorPrioridad(prioridad) {
    switch (prioridad) {
        case "Alta":
            return "Crítica";
        case "Media":
            return "Importante";
        case "Baja":
            return "Normal";
        default:
            return "Sin clasificar";
    }
}

//cuenta los estados con reduce en una sola pasada
function calcularEstadisticas(incidencias) {
    const conteoInicial = { pendientes: 0, enProceso: 0, resueltas: 0, canceladas: 0 };

    const conteoPorEstado = incidencias.reduce((acumulador, incidencia) => {
        switch (incidencia.estado) {
            case "Pendiente":
                acumulador.pendientes++;
                break;
            case "En Proceso":
                acumulador.enProceso++;
                break;
            case "Resuelta":
                acumulador.resueltas++;
                break;
            case "Cancelada":
                acumulador.canceladas++;
                break;
        }
        return acumulador;
    }, conteoInicial);

    return {
        totalIncidencias: incidencias.length,
        pendientes: conteoPorEstado.pendientes,
        enProceso: conteoPorEstado.enProceso,
        resueltas: conteoPorEstado.resueltas,
        canceladas: conteoPorEstado.canceladas
    };
}

module.exports = {
    esTextoValido,
    esPrioridadValida,
    normalizarEstado,
    obtenerClasificacionPorPrioridad,
    calcularEstadisticas
};
