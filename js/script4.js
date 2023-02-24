const listado = document.getElementById("listado");
const url = "./public/data.json";
const listadoDeProductos = url;
let carrito = [];
let contenedorProductos = document.getElementById("contenedorProductos");
let datos = [];
let totalCompra = 0;





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
          "col-md-6",
          "col-md-12"
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
        mensaje += `Total de la compra: $${totalCompra}`;
    }
    swal("Carrito de compras", mensaje, "success", {
        button: "Cerrar",
        footer: '<button id="vaciarCarrito" class="btn btn-danger">Vaciar Carrito</button>'
    }).then((result) => {
        if (result.isConfirmed) {
            const vaciarCarrito= document.getElementById("vaciarCarrito");
            vaciarCarrito.addEventListener("click", vaciarCarrito);
        }
    });
};




pedirProd();