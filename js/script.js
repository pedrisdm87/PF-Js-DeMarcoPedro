let nombre = "";
let cantidadProductos=0

let total=0
let iva=1.21
let valor=0


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


//COMPRA

function compra (){

    cantidadProductos=Number(prompt("Ingrese cantidad de productos"))

    for (let i= 0; i<cantidadProductos; i++) {
         let producto=prompt(`ingrese el NOMBRE del producto ${i} o ESC para CANCELAR`)
         let up = producto.toUpperCase()
         if (up=="ESC") {
         break
         }
         let valor=Number(prompt(`ingrese el VALOR del producto ${i+1}`))
        
        total=total+valor
        listaDeProductos=listaDeProductos +" "+ producto + ","
        }
}

//INFORME
function informes(){

console.log("Los productos comprados por el usuario :" + usuario + " fueron: ", listaDeProductos)
console.log("El monto total sin IVA es ", total) 
console.log("El Total con IVA es: ", agregaIva(total,iva))

}


saludo()
login()
compra()
informes()


//CONSTRUCTOR PRODUCTO

class producto {
    constructor(nombreProducto, valorProducto) {
        this.nombreProducto = nombreProducto;
        this.valorProducto = valorProducto;
    }
}


