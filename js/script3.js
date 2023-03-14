// Obtener referencias a los elementos del DOM
const loginForm = document.getElementById('login-form');
const welcomeMessage = document.getElementById('welcome-message');
const usernameWelcome = document.getElementById('username-welcome');
const forgetButton = document.getElementById('forget-button');

// Comprobar si el usuario ya ha iniciado sesión
if (localStorage.getItem('username')) {
  // Si el usuario ya ha iniciado sesión, mostrar el mensaje de bienvenida
  welcomeMessage.style.display = 'block';
  usernameWelcome.innerText = localStorage.getItem('username');
} else {
  // Si el usuario no ha iniciado sesión, mostrar el formulario de inicio de sesión
  loginForm.style.display = 'block';
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
});

// Agregar un evento de escucha para el botón "olvidar usuario"
forgetButton.addEventListener('click', function() {
  // Eliminar el nombre de usuario del almacenamiento local
  localStorage.removeItem('username');
  // Mostrar el formulario de inicio de sesión y ocultar el mensaje de bienvenida
  loginForm.style.display = 'block';
  welcomeMessage.style.display = 'none';
});
