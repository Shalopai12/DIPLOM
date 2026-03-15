(function () {
  // --- helpers ---
  function openModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.classList.add("is-open");
    m.setAttribute("aria-hidden", "false");
  }

  function closeModal(id) {
    const m = document.getElementById(id);
    if (!m) return;
    m.classList.remove("is-open");
    m.setAttribute("aria-hidden", "true");
  }

  document.querySelectorAll("[data-close-crud]").forEach(el => {
    el.addEventListener("click", () => closeModal(el.getAttribute("data-close-crud")));
  });

  // --- open modal buttons ---
  document.querySelectorAll("[data-open-modal]").forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.getAttribute("data-open-modal"); // user/category/product/shop
      const mode = btn.getAttribute("data-mode"); // add/edit

      if (type === "user") {
        const modalId = "crudModalUser";
        const form = document.getElementById("crudUserForm");
        document.getElementById("crudUserTitle").textContent = mode === "add" ? "Добавить пользователя" : "Изменить пользователя";
        document.getElementById("crudUserSubmit").textContent = "Сохранить";

        form.action = (mode === "add") ? "/admin/users/add" : "/admin/users/edit";

        document.getElementById("user_id").value = btn.dataset.id || "";
        document.getElementById("user_email").value = btn.dataset.email || "";
        document.getElementById("user_full_name").value = btn.dataset.full_name || "";
        document.getElementById("user_phone").value = btn.dataset.phone || "";
        document.getElementById("user_role").value = btn.dataset.role || "customer";
        document.getElementById("user_is_active").value = btn.dataset.is_active || "1";
        document.getElementById("user_password").value = ""; // always blank

        openModal(modalId);
        return;
      }

      if (type === "category") {
        const modalId = "crudModalCategory";
        const form = document.getElementById("crudCategoryForm");
        document.getElementById("crudCategoryTitle").textContent = mode === "add" ? "Добавить категорию" : "Изменить категорию";
        form.action = (mode === "add") ? "/admin/categories/add" : "/admin/categories/edit";

        document.getElementById("cat_id").value = btn.dataset.id || "";
        document.getElementById("cat_name").value = btn.dataset.name || "";
        document.getElementById("cat_slug").value = btn.dataset.slug || "";
        document.getElementById("cat_is_active").value = btn.dataset.is_active || "1";

        openModal(modalId);
        return;
      }

      if (type === "product") {
        const modalId = "crudModalProduct";
        const form = document.getElementById("crudProductForm");
        document.getElementById("crudProductTitle").textContent = mode === "add" ? "Добавить продукт" : "Изменить продукт";
        form.action = (mode === "add") ? "/admin/products/add" : "/admin/products/edit";

        document.getElementById("prod_id").value = btn.dataset.id || "";
        document.getElementById("prod_category_id").value = btn.dataset.category_id || "";
        document.getElementById("prod_name").value = btn.dataset.name || "";
        document.getElementById("prod_slug").value = btn.dataset.slug || "";
        document.getElementById("prod_description").value = btn.dataset.description || "";
        document.getElementById("prod_price_rub").value = btn.dataset.price_rub || "";
        document.getElementById("prod_is_available").value = btn.dataset.is_available || "1";

        // image modal controls
        const fileInput = document.getElementById("prod_image_file");
        const img = document.getElementById("prod_preview_img");
        const empty = document.getElementById("prod_preview_empty");
        const removeBtn = document.getElementById("prod_remove_btn");
        const removeFlag = document.getElementById("prod_remove_image");
        const currentUrl = document.getElementById("prod_current_image_url");

        function setPreview(src) {
          if (src) {
            img.src = src;
            img.classList.remove("hidden");
            empty.classList.add("hidden");
          } else {
            img.src = "";
            img.classList.add("hidden");
            empty.classList.remove("hidden");
          }
        }

        // reset state on each open
        if (fileInput) fileInput.value = "";
        if (removeFlag) removeFlag.value = "0";

        if (mode === "edit") {
          const url = btn.dataset.image_url || "";
          if (currentUrl) currentUrl.value = url;
          setPreview(url);
        } else {
          if (currentUrl) currentUrl.value = "";
          setPreview("");
        }

        // attach once (avoid multiple)
        if (fileInput && !fileInput.dataset.bound) {
          fileInput.addEventListener("change", () => {
            const f = fileInput.files && fileInput.files[0];
            if (!f) return;
            const url = URL.createObjectURL(f);
            setPreview(url);
            removeFlag.value = "0";
          });
          fileInput.dataset.bound = "1";
        }

        if (removeBtn && !removeBtn.dataset.bound) {
          removeBtn.addEventListener("click", () => {
            if (fileInput) fileInput.value = "";
            setPreview("");

            // if there is current image, mark remove=1
            if (currentUrl && currentUrl.value) {
              removeFlag.value = "1";
            }
          });
          removeBtn.dataset.bound = "1";
        }

        openModal(modalId);
        return;
      }

      if (type === "shop") {
        const modalId = "crudModalShop";
        const form = document.getElementById("crudShopForm");
        document.getElementById("crudShopTitle").textContent = mode === "add" ? "Добавить кофейню" : "Изменить кофейню";
        form.action = (mode === "add") ? "/admin/shops/add" : "/admin/shops/edit";

        document.getElementById("shop_id").value = btn.dataset.id || "";
        document.getElementById("shop_name").value = btn.dataset.name || "";
        document.getElementById("shop_city").value = btn.dataset.city || "";
        document.getElementById("shop_address").value = btn.dataset.address || "";
        document.getElementById("shop_phone").value = btn.dataset.phone || "";
        document.getElementById("shop_work_hours").value = btn.dataset.work_hours || "";
        document.getElementById("shop_is_active").value = btn.dataset.is_active || "1";

        openModal(modalId);
        return;
      }
    });
  });

  // ESC close any opened
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    ["crudModalUser", "crudModalCategory", "crudModalProduct", "crudModalShop"].forEach(closeModal);
  });
})();
