let select = document.querySelector("#select");
let divTotal = document.querySelector(".total");
let cantidad = document.querySelector(".cantidad");
let nombre = document.querySelector(".name");
let surname = document.querySelector(".surname");
let email = document.querySelector(".email");
let resume = document.querySelector(".resume");

let total = (cantidad, categoria, div) => {
  if (categoria === "1") {
    div.textContent = `Total a pagar: $ ${200 * cantidad * 0.2}`;
  }

  if (categoria === "2") {
    div.textContent = `Total a pagar: $ ${200 * cantidad * 0.5}`;
  }

  if (categoria === "3") {
    div.textContent = `Total a pagar: $ ${200 * cantidad * 0.85}`;
  }
};

let emptyInput = (inputs) => {
  let hasError = false;

  inputs.forEach(input => {
    if (input.value === "") {
      input.style.borderColor = "red";
      hasError = true;
    } else {
      input.style.borderColor = "green";
    }
  });

  return hasError;
};

resume.addEventListener("click", (e) => {
  e.preventDefault();

  // Obtén todos los campos de entrada en el formulario
  const camposDeEntrada = [nombre, surname, email, cantidad];

  // Verifica campos vacíos utilizando la función modified emptyInput
  let hasError = emptyInput(camposDeEntrada);

  if (hasError) {
    Swal.fire({
      icon: "error",
      title: "Por favor, complete todos los campos obligatorios",
    });
  } else {
    // No hay campos vacíos, continúa con el proceso
    Swal.fire({
      icon: "success",
      title: "Gracias por realizar tu compra",
      html: `<p>${nombre.value} ${surname.value}</p>
      <p>Hemos enviado la información a: ${email.value}</p>
      <p>${divTotal.textContent}</p>`,
      confirmButtonText: "Continuar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes realizar otras acciones después de completar el proceso
      }
    });
  }
});

select.addEventListener("change", (e) => {
  if (e.target.value === "Seleccione categoria") {
    divTotal.textContent = "Total a pagar: $";
  }
  total(cantidad.value, select.value, divTotal);
});

cantidad.addEventListener("input", (e) => {
  total(cantidad.value, select.value, divTotal);
});

// Agrega un manejador de eventos al botón "Borrar" para restablecer los estilos
const botonBorrar = document.querySelector('input[type="reset"]');
botonBorrar.addEventListener("click", function() {
  const camposDeEntrada = [nombre, surname, email, cantidad];
  camposDeEntrada.forEach(function(input) {
    input.style.borderColor = ""; // Restablece el color de borde
  });
});