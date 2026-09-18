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
module.exports = {
esTextoValido,
esPrioridadValida
};
