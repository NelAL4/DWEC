import resumenInventario,{crearProducto as cp,
                        filtrarPorCategoria as fpc,
                        listarProductosAgotados as lpa, 
                        calcularValorTotalInventario as cvti,
                        mostrarProductos as mp
                        } from "./EJ_6_inventario.js";

const inventario = [
    cp("Monitores mk2", "periférico", 399.99, 7),
    cp("Teclado Gamivo", "periférico", 38.99, 16),
    cp("Hajime no Ippo","libro", 24, 0),
    cp("Coldbox t20", "sobremesa",1299.99, 0),
    cp("Gygabyte g5", "portátil", 899.99, 2),
    cp("Metro 2033", "libro", 19.99, 0)
]

const periferico = fpc(inventario,"periférico");
console.log("\nPeriféricos: "); mp(periferico) //mostrarProducto() o mp() ya lleva el console.log incorporado 

const agotados = lpa(inventario);
console.log("\nAgotados: "), mp(agotados)

console.log("\nCoste inventario: "+ cvti(inventario));

resumenInventario(inventario) //resumenInventario() ya lleva el console.log incorporado 

