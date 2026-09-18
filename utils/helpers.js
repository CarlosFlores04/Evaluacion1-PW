// Cuenta los estados con reduce en una sola pasada
function calcularEstadisticas(incidencias) {
    const conteoInicial = {
        pendientes: 0,
        enProceso: 0,
        resueltas: 0,
        canceladas: 0
    };

    const conteoPorEstado = incidencias.reduce(
        (acumulador, incidencia) => {
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
        },
        conteoInicial
    );

    return {
        totalIncidencias: incidencias.length,
        pendientes: conteoPorEstado.pendientes,
        enProceso: conteoPorEstado.enProceso,
        resueltas: conteoPorEstado.resueltas,
        canceladas: conteoPorEstado.canceladas
    };
}
