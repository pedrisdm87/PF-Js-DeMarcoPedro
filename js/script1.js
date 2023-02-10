let valorProducto= 0
let nombreProducto= ""
let total=0
let totalIva=0
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
        total = productos.reduce((acc, value) => acc + value.valorProducto, 0)
    }
}



//INFORME

function informes(){

    console.log("El monto total sin IVA es ", total) 
    console.log("El Total con IVA es: ", totalIva = productos.reduce((acc, value) => acc + value.valorProducto * 1.21, 0))
    productos.forEach((productos) => console.log("Productos comprados: " + (productos.nombreProducto)));
}


// BUSCAR PRODUCTO

function buscarProducto(){
    let buscar = prompt("Que producto desea buscar?")
	const resultado = productos.find((producto) => producto.nombreProducto === buscar)
    console.log(resultado)

}   

//ELIMINAR PRODUCTO

function eliminarProd(id,nombre){
    resultado = prompt("Que producto desea ELIMINAR?")
	resultado = productos.filter(producto => nombreProducto != nombre)
	resultado = productos.filter(producto => producto.id != id)
}

//MUESTRA LISTA DE PRODUCTOS




saludo()
login()
compra()
informes()
buscarProducto()
//eliminarProd()



let div = document.getElementById("prueba") 
console.log(div)
div.innerHTML= productos.map(productos => `<h3>${nombreProducto}</h3>`)
