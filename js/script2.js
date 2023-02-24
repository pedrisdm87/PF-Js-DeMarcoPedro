//INICIO DE SESION:


document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;
  
    // Almacenar los datos de inicio de sesión en el localStorage
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
  });
  
  // Recuperar datos de inicio de sesion:
  
  const userNameGuardado = console.log("Usuario: " + localStorage.getItem("username"));
  
  


//OBTENGO LOS DATOS DESDE JSON

const listado = document.getElementById("listado")
const url="./public/data.json"
const listadoDeProductos = url


let contenedorProductos = document.getElementById('contenedorProductos');


//MUESTRO LOS PRODUCTOS MODIFICANDO EL DOM


const pedirProd = async ()  => {
fetch(listadoDeProductos)
.then(respuesta => respuesta.json())
.then(datos => {
    datos.forEach(producto => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('card', 'col-xl-3', 'col-md-6', 'col-md-12');
            divProducto.innerHTML += 
            `<div> 
                <img src="${producto.imagen}" class="card-img-top img-fluid py-3">
                <div class="card-body">
                 <h2 class="card-title">${producto.detalle}</h2>
                 <h3 class="card-text"> Precio: $ ${producto.precio} </h3>
                 <button id="boton${producto.id}" class="btn btn-primary"> Agregar al Carrito </button>
                </div>
            <div>`
        contenedorProductos.appendChild(divProducto);
    })
})
.catch (error => console.log(error))
.finally(() => console.log ("Proceso Finalizado"))

}

pedirProd()
/* 
------------------------------------------------------------------ */

const boton = document.getElementById(`boton${producto.id}`);
  boton.addEventListener('click', () => {
    agregarAlCarrito(producto.id);
    console.log("carrito agregado")
  }
  )


















/* 
const agregarAlCarrito = (id) => {
    const producto = datos.find(producto => producto.id == id);
    carrito.push(producto);
    mostrarCarrito();
  };
  
  






function actualizarCarrito() {
  let aux = '';
  carrito.forEach((producto) => {
    aux += `
                  <div class="card col-xl-3 col-md-6 col-sm-12">
                  <img src="${producto.imagen}"  class="card-img-top img-fluid py-3">
                  <h2>  </h2>
                  <div class="card-body">
                      <h3 class="card-title"> ${producto.nombre} </h3>
                      <p class="card-text"> ${producto.precio} </p>
                      <button onClick = "eliminarDelCarrito(${producto.id})" class="btn btn-primary"> Eliminar del Carrito </button>
                  </div>
              </div>
              `;
              localStorage.setItem("carrito", JSON.stringify(carrito)) //ALMACENO EL CARRITO ACTUALIZADO
  });

  contenedorCarrito.innerHTML = aux;
  calcularTotalCompra();
}
  */