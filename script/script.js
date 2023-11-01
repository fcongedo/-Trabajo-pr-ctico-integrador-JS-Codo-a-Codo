let validNameRegex = /^[A-Za-zÁáÉéÍíÓóÚúÑñ]+$/;
let validEmailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

let validateEmail = (email) => {
  return validEmailRegex.test(email);
};

let validateName = (name) => {
  return validNameRegex.test(name) && name.trim() !== '';
};

let validateFields = () => {
  const camposDeEntrada = [nombre, surname, email, cantidad];
  let hasError = false;

  camposDeEntrada.forEach(input => {
    input.style.borderColor = "";

    if (input === cantidad) {
      if (input.value.trim() === '' || parseFloat(input.value) <= 0) {
        input.style.borderColor = "red";
        hasError = true;
      }
    } else if (input === email) {
      if (!validateEmail(input.value)) {
        input.style.borderColor = "red";
        hasError = true;
      }
    } else {
      if (!validateName(input.value)) {
        input.style.borderColor = "red";
        hasError = true;
      }
    }
  });

  return !hasError;
};

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

resume.addEventListener("click", (e) => {
  e.preventDefault();

  if (validateFields()) {
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
  } else {
    Swal.fire({
      icon: "error",
      title: "Por favor, complete todos los campos obligatorios correctamente",
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

const botonBorrar = document.querySelector('input[type="reset"]');
botonBorrar.addEventListener("click", function() {
  const camposDeEntrada = [nombre, surname, email, cantidad];
  camposDeEntrada.forEach(function(input) {
    input.style.borderColor = "";
  });
});
