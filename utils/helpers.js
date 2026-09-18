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