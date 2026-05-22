'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// whatsapp


const toggleButton = document.getElementById('toggleButton');
const whatsappLogo = document.getElementById('whatsappLogo');
const crossLogo = document.getElementById('crossLogo');
const popup = document.getElementById('popup');

let isWhatsappActive = false;

toggleButton.addEventListener('click', () => {
    isWhatsappActive = !isWhatsappActive;

    if (isWhatsappActive) {
        whatsappLogo.style.display = 'none';
        crossLogo.style.display = 'block';
        popup.style.display = 'block';
        // Aplicar una transición suave de opacidad al mostrar el pop-up
        setTimeout(() => {
            popup.style.opacity = 1;
        }, 10); // Selecciona un valor de retardo adecuado
    } else {
        whatsappLogo.style.display = 'block';
        crossLogo.style.display = 'none';
        popup.style.opacity = 0; // Aplicar una transición suave de opacidad al ocultar el pop-up
        setTimeout(() => {
            popup.style.display = 'none';
        }, 300); // Selecciona un valor de retardo adecuado
    }
});

// Pre-cargar fecha de alta con hoy
  (function () {
    const join = document.getElementById('join_date');
    if (join && !join.value) {
      const today = new Date().toISOString().split('T')[0];
      join.value = today;
    }
  })();

  // Validación global de formulario
  document.getElementById('altaSocioForm').addEventListener('submit', function (e) {
    const form = this;
    const dobInput = form.querySelector('input[name="dob"]');
    let valid = true;
    let missingFields = [];

    // 🔹 Verifica campos vacíos
    form.querySelectorAll('input[required], textarea[required], select[required]').forEach(el => {
      if (!el.value.trim() || (el.type === 'checkbox' && !el.checked)) {
        valid = false;
        const label = form.querySelector(`label[for="${el.id}"]`);
        const fieldName = label ? label.textContent.trim() : el.name;
        missingFields.push(fieldName);
        el.classList.add('error-field');
      } else {
        el.classList.remove('error-field');
      }
    });

    // 🔹 Validación de edad mínima (21 años)
    if (dobInput && dobInput.value) {
      const dob = new Date(dobInput.value);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear() -
        ((today.getMonth() < dob.getMonth()) ||
        (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate()) ? 1 : 0);
      if (age < 21) {
        valid = false;
        alert('Debes ser mayor de 21 años para darte de alta.');
        dobInput.focus();
        e.preventDefault();
        return;
      }
    }

    // 🔹 Si faltan campos
    if (!valid) {
      e.preventDefault();
      alert("Por favor, completa todos los campos obligatorios antes de enviar.");
      form.querySelector('.error-field')?.focus();
    }
  });