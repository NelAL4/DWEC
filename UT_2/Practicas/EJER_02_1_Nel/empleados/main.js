import{
    agregarEmpleados,
    eliminarEmpleados,
    buscarPorDepartamento,
    calcularSalarioPromedio,
    obtenerEmpleadosOrdenadosPorSalario
} from "./empleados.js";

agregarEmpleados({
    is:6,
    nombre: "Marco Asencio",
    departamento: "fúbol",
    salario:200000
})

eliminarEmpleados(5);
console.log(buscarPorDepartamento("fúbol"));
console.log(calcularSalarioPromedio());
console.log(obtenerEmpleadosOrdenadosPorSalario());
