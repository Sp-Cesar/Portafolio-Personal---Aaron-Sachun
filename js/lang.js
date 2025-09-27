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

    // Cambiar bandera si existe <img id="currentFlag">
    const currentFlag = document.getElementById("currentFlag");
    if (currentFlag) {
      currentFlag.src = `./assets/icons/flag-${lang}.png`;
    }
  } catch (err) {
    console.error("Error cargando idioma:", err);
  }
}

// Reutilizable para header y footer
function setupDropdown(btnId, menuId) {
  const btn = document.getElementById(btnId);
  const menu = document.getElementById(menuId);

  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.add("hidden");
    }
  });
}

// Al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("lang") || "es";
  setLanguage(savedLang);

  // Activa dropdowns de header y footer
  setupDropdown("langBtn", "langMenu");
  setupDropdown("langBtnFooter", "langMenuFooter");
});
