
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

class Producto {
    constructor(id, nombre, precio, cantidad, imagen) {
      this.id = id;
      this.nombre = nombre;
      this.precio = precio;
      this.cantidad = cantidad;
      this.imagen = imagen;
    }
  }


//CREO LOS PRODUCTOS Y LOS ALMACENO EN UN ARRAY

const producto1 = new Producto(1, 'Tubo', 300000, 1,'img/tubo.webp');
const producto2 = new Producto(2, 'Controladora', 220000, 1, 'img/controladora.jpg');
const producto3 = new Producto(3, 'Lente', 15000, 1, 'img/lente.jpg');
const producto4 = new Producto(4, 'Fuente', 125, 1,'img/fuente.webp');

const productos = [producto1, producto2, producto3, producto4];

//MUESTRO LOS PRODUCTOS MODIFICANDO EL DOM

const contenedorProductos = document.getElementById('contenedorProductos');

productos.forEach((producto) => {
  const divProducto = document.createElement('div');
  divProducto.classList.add('card', 'col-xl-3', 'col-md-6', 'col-sm-12');
  divProducto.innerHTML = `
                          <div>
                              <img src="${producto.imagen}" class="card-img-top img-fluid py-3"> 
                              <div class="card-body">
                                  <h3 class="card-title"> ${producto.nombre} </h3>
                                  <p class="card-text"> ${producto.precio} </p>
                                  <button id="boton${producto.id}" class="btn btn-primary"> Agregar al Carrito </button>
                              </div>
                          </div>`;
  contenedorProductos.appendChild(divProducto);


  //Evento del Boton de agregar al carrito:

  const boton = document.getElementById(`boton${producto.id}`);
  boton.addEventListener('click', () => {
    agregarAlCarrito(producto.id);
  });
});

//Carrito de compras y una función que busque el producto por id y lo agregue al carrito.

const carrito = [];

const agregarAlCarrito = (id) => {
  const producto = productos.find((producto) => producto.id === id);
  const productoEnCarrito = carrito.find((producto) => producto.id === id);
  
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push(producto);
  }
  actualizarCarrito();
  
};

//Veo el carrito de compras modificando el DOM.

const contenedorCarrito = document.getElementById('contenedorCarrito');
const verCarrito = document.getElementById('verCarrito');

verCarrito.addEventListener('click', actualizarCarrito);

function actualizarCarrito() {
  let aux = '';
  carrito.forEach((producto) => {
    aux += `
              <div class="card col-xl-3 col-md-6 col-sm-12">
                  <img src="${producto.imagen}"  class="card-img-top img-fluid py-3">
                  <div class="card-body">
                      <h3 class="card-title"> ${producto.nombre} </h3>
                      <p class="card-text"> ${producto.precio} </p>
                      <button onClick = "eliminarDelCarrito(${producto.id})" class="btn btn-primary"> Eliminar del Carrito </button>
                  </div>
              </div>
              `;
              localStorage.setItem("carrito", JSON.stringify(carrito))
  });

  contenedorCarrito.innerHTML = aux;
  calcularTotalCompra();
}
//Función que elimine el producto del carrito:

const eliminarDelCarrito = (id) => {
    const producto = carrito.find((producto) => producto.id === id);
    carrito.splice(carrito.indexOf(producto), 1);
    localStorage.setItem("carrito", JSON.stringify(carrito))
    actualizarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito))
  };
  


//Función para vaciar el carrito:

const vaciarCarrito = document.getElementById('vaciarCarrito');
vaciarCarrito.addEventListener('click', () => {
  carrito.splice(0, carrito.length);
  localStorage.setItem("carrito", JSON.stringify(carrito))
  actualizarCarrito();
  
});



//funcion para calcular el total del carrito:

const totalCompra = document.getElementById('totalCompra');

const calcularTotalCompra = () => {
  let total = 0;
  carrito.forEach((producto) => {
    total += producto.precio * producto.cantidad;
  });
  totalCompra.innerHTML = total;
};


saludo()
login()

localStorage.setItem("nombreUsuario",usuario)

