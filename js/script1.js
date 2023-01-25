let valorProducto= 0
let nombreProducto= ""
let total=0
let iva=1.21
let lista=""

//IVA
function agregaIva(total,iva){
    
    return (total * iva)
}

//SALUDO

function saludo(){
    console.log("Hola, bienvenido al Carrito de compras")
    }

//LOGIN

function login(){
    usuario = prompt("Ingrese su nombre de Usuario")
    
    if(usuario == ""){
        alert("INGRESE UN USUARIO VALIDO")
    }
    return console.log("Usuario INGRESADO:"+" "+usuario)
    
    }

//CONSTRUCTOR PRODUCTO

class Productos {
    constructor(nombreProducto, valorProducto) {
        this.nombreProducto = nombreProducto;
        this.valorProducto = parseFloat(valorProducto);
    }
}


//DECLARACION DE ARRAY VACIA

const productos = [];



// FUNCION COMPRA

function compra (){

    cantidadProductos=Number(prompt("Ingrese cantidad de productos"))

    for (let i= 0; i<cantidadProductos; i++) {
        nombreProducto=prompt(`Ingrese el NOMBRE del Producto ${i+1} o ESC para CANCELAR`)
        if (nombreProducto == "esc" || nombreProducto == "ESC") {
        break
        }
        valorProducto=Number(prompt(`Ingrese el VALOR del producto ${i+1}`))
        productos.push(new Productos(nombreProducto,valorProducto));

        total=valorProducto+total
    }
}






saludo()
login()
compra()
informes()





//INFORME

function informes(){

    console.log("El monto total sin IVA es ", total) 
    console.log("El Total con IVA es: ", agregaIva(total,iva))
    productos.forEach((productos) => console.log("Productos comprados: " + (productos.nombreProducto)));
}

let buscar = prompt("Que producto desea buscar?")

const resultado = productos.find((producto) => producto.nombreProducto === buscar)

console.log(resultado)