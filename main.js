// Visit counter
(function () {
  const el = document.getElementById("visitCounter");
  if (!el) return;

  const key = "hai-visit-count";
  let count = Number(localStorage.getItem(key) || "0");
  count++;
  localStorage.setItem(key, count);
  el.textContent = count;
})();

// Contact form
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Nachricht gesendet!");
    form.reset();
  });
});
