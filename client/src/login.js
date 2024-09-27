import "./style.css";

// Obtener el formulario de inicio de sesión
const $form = document.getElementById("login-form");

// Añadir un evento de submit al formulario
$form.addEventListener("submit", async (e) => {
  // Evitar que el formulario recargue la página
  e.preventDefault();

  // Crear un objeto FormData con los datos del formulario
  const formData = new FormData($form);

  // Convertir el objeto FormData a un objeto plano
  const entries = Object.fromEntries(formData.entries());

  try {
    // Realizar una solicitud POST a la API de inicio de sesión
    const response = await fetch("http://localhost:4321/api/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entries),
    });

    if (response.ok) {
      const data = await response.json();
      alert("Inicio de sesión exitoso: " + JSON.stringify(data.user));

      // Redirigir al usuario a la página principal
      window.location.href = "/pages/home.html"; // Cambia esta URL según sea necesario
    } else {
      const errorData = await response.json();
      alert("Error: " + (errorData.message || "Credenciales inválidas"));
    }
  } catch (error) {
    alert("Error: " + error.message);
  }
});

