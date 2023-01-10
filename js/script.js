let nombre = "";
let cantidadProductos=0
let listaDeProductos=" "
let total=0
let iva=1.21



//IVA
function agregaIva(total,iva){
    
    return (total * iva)
}




console.log("Hola, bienvenido al Carrito de compras");

usuario = prompt("Ingrese su nombre de Usuario")
console.log("Usuario INGRESADO:"+" "+usuario)

if(usuario == ""){
    alert("INGRESE UN USUARIO VALIDO")
}else{
    alert("USUARIO INGRESADO:"+" "+usuario)
}

cantidadProductos=Number(prompt("Ingrese cantidad de productos"))

for (let i= 0; i<cantidadProductos; i++) {
    let producto=prompt("ingrese el NOMBRE del producto o ESC para CANCELAR")
    let up = producto.toUpperCase()
    if (up=="ESC") {
    break
    }
    let valor=Number(prompt("ingrese el VALOR del producto"))
    total=total+valor
    listaDeProductos=listaDeProductos +" "+ producto + ","

}



console.log("Los productos comprados por el usuario :" + usuario + " fueron: ", listaDeProductos)
console.log("El monto total sin IVA es ", total) 
console.log("El Total con IVA es: ", agregaIva(total,iva))


