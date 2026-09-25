(function () {
  "use strict";

  var head = document.querySelector(".site-head");
  var burger = document.querySelector(".nav-burger");
  var menu = document.querySelector(".mobile-menu");
  var year = document.getElementById("year");
  var contactForm = document.getElementById("contactForm");

  if (year) year.textContent = new Date().getFullYear();

  function onScroll() {
    if (!head) return;
    head.classList.toggle("scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function closeMenu() {
    if (!burger || !menu) return;
    burger.classList.remove("open");
    menu.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (burger && menu) {
    burger.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      burger.classList.toggle("open", open);
      document.body.style.overflow = open ? "hidden" : "";
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = document.querySelector(".form-success");
      if (ok) ok.classList.add("show");
      contactForm.reset();
      contactForm.querySelector("button[type=submit]").disabled = true;
      if (window.setTimeout) {
        setTimeout(function () {
          contactForm.querySelector("button[type=submit]").disabled = false;
        }, 4000);
      }
    });
  }
})();