
let valorProducto= 0
let nombreProducto= ""
let total=0


//CONSTRUCTOR PRODUCTO

class Productos {
    constructor(nombreProducto, valorProducto) {
        this.nombreProducto = nombreProducto;
        this.valorProducto = parseFloat(valorProducto);
    }
}


// FUNCION COMPRA


function compra (){

    cantidadProductos=Number(prompt("Ingrese cantidad de productos"))

    for (let i= 0; i<cantidadProductos; i++) {
        const Productos = new Productos (prompt(`Ingrese el NOMBRE del Producto ${i+1}`), prompt(`Ingrese el VALOR del producto ${i+1}`))
        cantidadProductos=cantidadProductos+1
        }
}

compra()