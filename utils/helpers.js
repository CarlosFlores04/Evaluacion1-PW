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

// Pasa el estado a minúsculas y lo compara
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

module.exports = {
    esTextoValido,
    esPrioridadValida,
    normalizarEstado
};
