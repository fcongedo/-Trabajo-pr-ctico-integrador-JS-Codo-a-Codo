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

let emptyInput = (input) => {
  if (input.value === "") {
    input.style.borderColor = "red";
    return true;
  } else {
    input.style.borderColor = "green";
  }
};

resume.addEventListener("click", (e) => {
  e.preventDefault();

  let hasError = false;

  // Verifica campos vacíos utilizando un switch
  switch (true) {
    case emptyInput(nombre):
      Swal.fire({
        icon: "error",
        title: "Por favor, ingrese su nombre",
      });
      hasError = true;
      break;
    case emptyInput(surname):
      Swal.fire({
        icon: "error",
        title: "Por favor, ingrese su apellido",
      });
      hasError = true;
      break;
    case emptyInput(email):
      Swal.fire({
        icon: "error",
        title: "Por favor, ingrese su correo electrónico",
      });
      hasError = true;
      break;
    case emptyInput(cantidad):
      Swal.fire({
        icon: "error",
        title: "Por favor, ingrese la cantidad",
      });
      hasError = true;
      break;
    default:
      // No hay campos vacíos
      break;
  }

  // Si no hay errores, muestra un mensaje de éxito y permite continuar
  if (!hasError) {
    Swal.fire({
      icon: "success",
      title: "Gracias por realizar tu compra",
      html: `<p>${nombre.value} ${surname.value}</p>
      <p>Hemos enviado la información a: ${email.value}</p>
      <p>${divTotal.textContent}</p>`,
      confirmButtonText: "Continuar",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "./index.html";
      }
    });
  }
});

select.addEventListener("change", (e) => {
  if (e.target.value === "Seleccione categoria") {
    divTotal.textContent = "Total a pagar: $";
  }
  total(cantidad.value, e.target.value, divTotal);
});

cantidad.addEventListener("input", (e) => {
  total(cantidad.value, select.value, divTotal);
});