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


/* //CREO LOS PRODUCTOS Y LOS ALMACENO EN UN ARRAY

const producto1 = new Producto(1, 'Tubo 100W', 300000, 1,'img/tubo.webp');
const producto2 = new Producto(2, 'Controladora 6445', 220000, 1, 'img/controladora.jpg');
const producto3 = new Producto(3, 'Lente D.Focal 101mm', 15000, 1, 'img/lente.jpg');
const producto4 = new Producto(4, 'Fuente 100w', 185000, 1,'img/fuente.webp');
const producto5 = new Producto(5, 'Tubo 90W', 200000, 1,'img/tubo.webp');
const producto6 = new Producto(6, 'Controladora 6442', 220000, 1, 'img/controladora 2.jpg');
const producto7 = new Producto(7, 'Lente D.Focal 76mm', 15000, 1, 'img/lente.jpg');
const producto8 = new Producto(8, 'Fuente 90w', 150000, 1,'img/fuente.webp');
const producto9 = new Producto(9, 'Tubo 80W', 180000, 1,'img/tubo.webp');
const producto10 = new Producto(10, 'Puntero Láser', 220000, 1, 'img/puntero.jpg');
const producto11 = new Producto(11, 'Lente D.Focal 63mm', 15000, 1, 'img/lente.jpg');
const producto12 = new Producto(12, 'Fuente 80w', 125000, 1,'img/fuente.webp');
const producto13 = new Producto(13, 'Fuente 50w', 75000, 1,'img/fuente.webp');
const producto14 = new Producto(14, 'Tubo 65W', 110000, 1,'img/tubo.webp');
const producto15 = new Producto(15, 'Correa 3M', 3500, 1, 'img/correa.webp');
const producto16 = new Producto(16, 'Lente D.Focal 50mm', 15000, 1, 'img/lente.jpg');
const producto17 = new Producto(17, 'Fuente 65w', 80000, 1,'img/fuente.webp');
const producto18 = new Producto(18, 'Tubo 50W', 70000, 1,'img/tubo.webp');
const producto19 = new Producto(19, 'Polea', 4000, 1, 'img/polea.jpg');
const producto20 = new Producto(20, 'Lente D.Focal 30mm', 15000, 1, 'img/lente.jpg');


const productos = [producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10, producto11, producto12, producto13, producto14, producto15, producto16, producto17, producto18, producto19, producto20];
 */




const url = "./public/data.json"

const getDatos = async()=> {
  const resp = await fetch(url)
      .then((res) => res.json())
      .then((data) => {
        return data;
      })
      return resp
  }
   
  


//MUESTRO LOS PRODUCTOS MODIFICANDO EL DOM

let contenedorProductos = document.getElementById('contenedorProductos');

const pedirProd = async ()  => { 
  const productosjson = await getDatos()
  productosjson.forEach((producto) => {
  const divProducto = document.createElement('div');
  divProducto.classList.add('card', 'col-xl-3', 'col-md-6', 'col-sm-12');
  divProducto.innerHTML = `
                          <div>
                              <img src="${producto.imagen}" class="card-img-top img-fluid py-3"> 
                              <div class="card-body">
                                  <h4 class="card-title"> ${producto.detalle} </h4>
                                  <p class="card-text"> $ ${producto.precio} </p>
                                  <button id="boton${producto.id}" class="btn btn-primary"> Agregar al Carrito </button>
                              </div>
                          </div>`;
  contenedorProductos.appendChild(divProducto);
 

  }); 
}

 pedirProd()



   //Evento del Boton de agregar al carrito:

   const boton = document.getElementById(`boton${producto.id}`);
  boton.addEventListener('click', () => {
    agregarAlCarrito(producto.id);
    console.log("carrito agregado")
  }
  )

//Carrito de compras y una función que busque el producto por id y lo agregue al carrito.

const carrito = [];

const agregarAlCarrito = (id) => {
  const producto = producto.find((producto) => producto.id == id);
  const productoEnCarrito = carrito.find((producto) => producto.id == id);
  swal("Agregado!", "Su producto fue agregado al carrito", "success");
  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    carrito.push(producto);
  }
  actualizarCarrito();
  
};

//Veo el carrito de compras modificando el DOM.

const contenedorCarrito = document.getElementById('contenedorCarrito');



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


