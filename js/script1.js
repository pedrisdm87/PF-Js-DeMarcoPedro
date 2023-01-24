let valorProducto= 0
let nombreProducto= ""
let total=0
let iva=1.21

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
        nombreProducto=prompt(`Ingrese el NOMBRE del Producto ${i+1}`)
        valorProducto=Number(prompt(`Ingrese el VALOR del producto ${i+1}`))
        total=valorProducto+total
        productos.push(new Productos(nombreProducto,valorProducto));
        
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
    }

