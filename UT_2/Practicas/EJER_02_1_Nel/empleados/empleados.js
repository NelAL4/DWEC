const empleados = [
    {
        id: 1,
        nombre: "Sofía Romero",
        departamento: "Contabilidad",
        salario: 31000
    },
    {
        id: 2,
        nombre: "Javier Molina",
        departamento: "Logística",
        salario: 26500
    },
    {
        id: 3,
        nombre: "Elena Ortega",
        departamento: "Contabilidad",
        salario: 36500
    },
    {
        id: 4,
        nombre: "Pablo Navarro",
        departamento: "Soporte",
        salario: 29000
    },
    {
        id: 5,
        nombre: "Lucía Herrera",
        departamento: "Diseño",
        salario: 27500
    }
];

export const agregarEmpleados = (empleado) => {empleados.push(empleado)};

export const eliminarEmpleados = (id) => {
    const index = empleados.findIndex((empleado)=>id===empleado.id);
    if(index !== -1){
        empleados.splice(index,1);
    }
};

export const buscarPorDepartamento = (departamento)=>{
    return empleados.filter((empleado)=>empleado.departamento===departamento)
};

export const calcularSalarioPromedio=()=>{
    return empleados.reduce((retornador,empleado)=>retornador+empleado.salario,0)/empleados.length;
} 

export const obtenerEmpleadosOrdenadosPorSalario=()=>empleados.sort((b,a)=>a.salario - b.salario)