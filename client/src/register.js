// ! REALIZAR LA LÓGICA DE REGISTRO DE USUARIOS AQUÍ

import "./style.css";

const registerForm = document.getElementById("register-form");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(registerForm);
  const userData = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("http://localhost:4321/api/auth/sign-up", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Error en el registro");
    }

    const data = await response.json();
    alert("Registro exitoso: " + JSON.stringify(data.user));

  
    window.location.href = "/pages/login.html"; 
  } catch (error) {
    alert("Error: " + error.message);
  }
});

