const listado = document.getElementById("listado");
const url = "./public/data.json";
const listadoDeProductos = url;
let carrito = [];
let contenedorProductos = document.getElementById("contenedorProductos");
let datos = [];
let totalCompra = 0;

document.body.style.backgroundColor = '#bfc0c0';

//INICIO DE SESION:


document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const username = document.querySelector("#username").value;
    const password = document.querySelector("#password").value;

 // Validación de campos vacíos
 if (!username || !password) {
    swal("","Por favor complete todos los campos", "error");
    return;
  }

  // Validación de longitud de contraseña
  if (password.length < 8) {
    swal("","La contraseña debe tener al menos 8 caracteres","error");
    return;
  }

  // Validación de caracteres especiales en username
  const regex = /^[a-zA-Z0-9]+$/;
  if (!regex.test(username)) {
    swal("","El nombre de usuario solo puede contener letras y números","error");
    return;
  }

  
    // Almacenar los datos de inicio de sesión en el localStorage
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
  });
  
  /* // Recuperar datos de inicio de sesion:
  
  const userNameGuardado = console.log("Usuario: " + localStorage.getItem("username")); */
  

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

