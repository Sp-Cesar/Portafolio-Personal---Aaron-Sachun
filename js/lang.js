
async function setLanguage(lang) {
  try {
    const res = await fetch(`./assets/lang/${lang}.json`);
    const translations = await res.json();

    document.querySelectorAll("[data-key]").forEach(el => {
      const key = el.getAttribute("data-key");
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });

    // Guardar preferencia
    localStorage.setItem("lang", lang);
  } catch (err) {
    console.error("Error cargando idioma:", err);
  }
}

// Al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "es";
  setLanguage(savedLang);
});



// Manejo del dropdown y cambio de bandera
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "es";
  setLanguage(savedLang);

  // Dropdown toggle
  const btn = document.getElementById("langBtn");
  const menu = document.getElementById("langMenu");
  const currentFlag = document.getElementById("currentFlag");

  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  // Cambiar bandera cuando cambia idioma
  window.setLanguage = async function(lang) {
    const res = await fetch(`./assets/lang/${lang}.json`);
    const translations = await res.json();

    document.querySelectorAll("[data-key]").forEach(el => {
      const key = el.getAttribute("data-key");
      if (translations[key]) {
        el.textContent = translations[key];
      }
    });

    // Guardar preferencia y actualizar bandera
    localStorage.setItem("lang", lang);
    currentFlag.src = `./assets/icons/flag-${lang}.png`;

    // Cerrar menú
    menu.classList.add("hidden");
  };
});

// Dropdown HEADER
const langBtn = document.getElementById("langBtn");
const langMenu = document.getElementById("langMenu");

// Dropdown FOOTER
const langBtnFooter = document.getElementById("langBtnFooter");
const langMenuFooter = document.getElementById("langMenuFooter");

function toggleMenu(button, menu) {
    button.addEventListener("click", () => {
        menu.classList.toggle("hidden");
    });

    document.addEventListener("click", (e) => {
        if (!button.contains(e.target) && !menu.contains(e.target)) {
            menu.classList.add("hidden");
        }
    });
}

// Activar ambos
toggleMenu(langBtn, langMenu);
toggleMenu(langBtnFooter, langMenuFooter);
