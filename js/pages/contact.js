document.addEventListener('DOMContentLoaded', () => {
  initPage();

  document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    showToast('Mensaje enviado correctamente. Te responderemos pronto.');
    e.target.reset();
  });
});
