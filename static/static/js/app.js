(function () {
  const modal = document.getElementById("authModal");

  // поддержка 2 вариантов открытия:
  // 1) кнопка/ссылка с id="openAuth"
  // 2) любые элементы с атрибутом data-open-auth (рекомендую)
  const openBtn = document.getElementById("openAuth");
  const openBtns = document.querySelectorAll("[data-open-auth]");

  const closeEls = document.querySelectorAll("[data-close-modal]");

  const loginView = document.getElementById("loginView");
  const registerView = document.getElementById("registerView");
  const showRegister = document.getElementById("showRegister");
  const showLogin = document.getElementById("showLogin");

  if (!modal || !loginView || !registerView) return;

  function showLoginView() {
    registerView.classList.add("hidden");
    loginView.classList.remove("hidden");
  }

  function showRegisterView() {
    loginView.classList.add("hidden");
    registerView.classList.remove("hidden");
  }

  function openModal(e) {
    // если это <a href="#"> — не даём прыгать наверх
    if (e && typeof e.preventDefault === "function") e.preventDefault();

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");

    // ВСЕГДА при открытии показываем вход
    showLoginView();
  }

  function closeModal(e) {
    if (e && typeof e.preventDefault === "function") e.preventDefault();

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  }

  // открыть
  if (openBtn) openBtn.addEventListener("click", openModal);
  openBtns.forEach(btn => btn.addEventListener("click", openModal));

  // закрыть (крестик и оверлей)
  closeEls.forEach(el => el.addEventListener("click", closeModal));

  // переключатель: регистрация
  if (showRegister) {
    showRegister.addEventListener("click", (e) => {
      e.preventDefault();
      showRegisterView();
    });
  }

  // переключатель: назад на вход
  if (showLogin) {
    showLogin.addEventListener("click", (e) => {
      e.preventDefault();
      showLoginView();
    });
  }

  // ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
})();
