const listado = document.getElementById("listado");
const url = "./public/data.json";
const listadoDeProductos = url;
let carrito = [];
let contenedorProductos = document.getElementById("contenedorProductos");
let datos = [];
let totalCompra = 0;

document.body.style.backgroundColor = '#bfc0c0';

//INICIO DE SESION:

// Obtener referencias a los elementos del DOM
const loginForm = document.getElementById('login-form');
const welcomeMessage = document.getElementById('welcome-message');
const usernameWelcome = document.getElementById('username-welcome');
const forgetButton = document.getElementById('forget-button');
const cuerpoProductos = document.getElementById('cuerpoProductos');

// Comprobar si el usuario ya ha iniciado sesión
if (localStorage.getItem('username')) {
  // Si el usuario ya ha iniciado sesión, mostrar el mensaje de bienvenida
  welcomeMessage.style.display = 'block';
  usernameWelcome.innerText = localStorage.getItem('username');
  cuerpoProductos.style.display = 'block';
} else {
  // Si el usuario no ha iniciado sesión, mostrar el formulario de inicio de sesión
  loginForm.style.display = 'block';
  cuerpoProductos.style.display = 'none';
}

// Agregar un evento de escucha para el envío del formulario de inicio de sesión
loginForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const usernameInput = document.getElementById('username');
  const username = usernameInput.value;
  // Almacenar el nombre de usuario en el almacenamiento local
  localStorage.setItem('username', username);
  // Mostrar el mensaje de bienvenida y ocultar el formulario de inicio de sesión
  loginForm.style.display = 'none';
  welcomeMessage.style.display = 'block';
  usernameWelcome.innerText = username;
  cuerpoProductos.style.display = 'block';

});

// Agregar un evento de escucha para el botón "olvidar usuario"
forgetButton.addEventListener('click', function() {
  // Eliminar el nombre de usuario del almacenamiento local
  localStorage.removeItem('username');
  // Mostrar el formulario de inicio de sesión y ocultar el mensaje de bienvenida
  loginForm.style.display = 'block';
  welcomeMessage.style.display = 'none';
  cuerpoProductos.style.display = 'none';
  });

  
  /*-------------------------------------------------------*/ 

const pedirProd = async () => {
  fetch(listadoDeProductos)
    .then((respuesta) => respuesta.json())
    .then((data) => {
      datos = data;
      data.forEach((producto) => {
        const divProducto = document.createElement("div");
        divProducto.classList.add(
          "card",
          "col-xl-3",
          "col-xl-3",
          "col-xl-3",
        );
        divProducto.innerHTML += `<div>
                <img src="${producto.imagen}" class="card-img-top img-fluid py-3">
                <div class="card-body">
                 <h3 class="card-title">${producto.detalle}</h3>
                 <h4 class="card-text"> Precio: $ ${producto.precio} </h4>
                 <button id="boton${producto.id}" class="btn btn-primary"> Agregar al Carrito </button>
                </div>
            <div>`;
        contenedorProductos.appendChild(divProducto);

        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
          agregarAlCarrito(producto.id);
          console.log("Producto agregado al carrito");
        });
      });
    })
    .catch((error) => console.log(error))
    .finally(() => {
        
        // Cargar el carrito desde el Local Storage, si existe
        const carritoGuardado = localStorage.getItem("carrito");
        if (carritoGuardado) {
          carrito = JSON.parse(carritoGuardado);
          totalCompra = carrito.reduce((total, producto) => total + Number(producto.precio), 0);
          mostrarCarrito();
        }
        console.log("Proceso Finalizado");
      });
  
    
};


const agregarAlCarrito = (id) => {
    const producto = datos.find((producto) => producto.id == id);
    carrito.push(producto);
    totalCompra += Number(producto.precio);
    swal("Producto agregado al carrito", "", "info");
    mostrarCarrito();
 // Guardar el carrito en el Local Storage
 localStorage.setItem("carrito", JSON.stringify(carrito));

};


const mostrarCarrito = () => {
  let mensaje = "El carrito está vacío.";
  if (carrito.length > 0) {
      mensaje = "Productos en el carrito:\n\n";
      carrito.forEach((producto) => {
          mensaje += `${producto.detalle} - Precio: $${producto.precio}\n`;
      });
      const precioCompraTotal = carrito
        .map((producto) => Number(producto.precio))
        .reduce((sumaParcial, precio) => sumaParcial + precio);
      mensaje += `Total de la compra: $${precioCompraTotal}`;
  }
  swal("Carrito de compras", mensaje, "success", {
      buttons: "Cerrar",
  })
}

const eliminarDatoBtn = document.getElementById('vaciarCarrito');

eliminarDatoBtn.addEventListener('click', function() {
  // eliminar el dato del localStorage
  localStorage.removeItem('carrito');
  carrito = []
  mostrarCarrito()
});
const mostrarCarritoBtn = document.getElementById('mostrarCarrito');

mostrarCarritoBtn.addEventListener('click', mostrarCarrito);


pedirProd();


/*-----------------------------------------------*/

const buscarBtn = document.getElementById("buscarBtn");
buscarBtn.addEventListener("click", () => {
  const busqueda = document.getElementById("busqueda").value;
  const resultados = datos.filter((producto) =>
    producto.detalle.toLowerCase().includes(busqueda.toLowerCase())
  );
  mostrarResultados(resultados);
});


const mostrarResultados = (resultados) => {
  contenedorProductos.innerHTML = "";
  if (resultados.length > 0) {
    resultados.forEach((producto) => {
      const divProducto = document.createElement("div");
      divProducto.classList.add(
        "card",
        "col-xl-3",
        "col-xl-3",
        "col-xl-3"
      );
      divProducto.innerHTML += `<div>
                <img src="${producto.imagen}" class="card-img-top img-fluid py-3">
                <div class="card-body">
                 <h3 class="card-title">${producto.detalle}</h3>
                 <h4 class="card-text"> Precio: $ ${producto.precio} </h4>
                 <button id="boton${producto.id}" class="btn btn-primary"> Agregar al Carrito </button>
                </div>
            <div>`;
      contenedorProductos.appendChild(divProducto);

      const boton = document.getElementById(`boton${producto.id}`);
      boton.addEventListener("click", () => {
        agregarAlCarrito(producto.id);
        console.log("Producto agregado al carrito");
      });
    });
  } else {
    contenedorProductos.innerHTML = swal("","No se encontraron resultados","error");
  }
};

/*--------ORDEN------------*/

const ordenAlfabeticoBtn = document.getElementById("ordenAlfabetico");
ordenAlfabeticoBtn.addEventListener("click", () => {
  datos.sort((a, b) => (a.detalle > b.detalle ? 1 : -1));
  mostrarProductos(datos);
});

const ordenPrecioBtn = document.getElementById("ordenPrecio");
ordenPrecioBtn.addEventListener("click", () => {
  datos.sort((a, b) => a.precio - b.precio);
  mostrarProductos(datos);
});


const mostrarProductos = (productos) => {
  contenedorProductos.innerHTML = "";
  productos.forEach((producto) => {
    const divProducto = document.createElement("div");
    divProducto.classList.add("card", "col-xl-3", "col-xl-3", "col-xl-3");
    divProducto.innerHTML += `<div>
          <img src="${producto.imagen}" class="card-img-top img-fluid py-3">
          <div class="card-body">
            <h3 class="card-title">${producto.detalle}</h3>
            <h4 class="card-text"> Precio: $ ${producto.precio} </h4>
            <button id="boton${producto.id}" class="btn btn-primary"> Agregar al Carrito </button>
          </div>
        <div>`;
    contenedorProductos.appendChild(divProducto);

    const boton = document.getElementById(`boton${producto.id}`);
    boton.addEventListener("click", () => {
      agregarAlCarrito(producto.id);
      console.log("Producto agregado al carrito");
    });
  });
};

