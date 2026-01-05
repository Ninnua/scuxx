document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navBar = document.getElementById("nav-bar");
  const navigation = document.getElementById("navigation");
  const body = document.body;
  const header = document.querySelector(".header"); // may be null

  // Function to show sticky bar and hamburger
  function showNavigation() {
    navigation.classList.add("active");
    hamburger.style.display = "flex";
  }

  // Function to hide sticky bar and hamburger (used if header exists)
  function hideNavigation() {
    navigation.classList.remove("active");
    navBar.classList.remove("active");
    hamburger.classList.remove("active");
    body.classList.remove("no-scroll");
    hamburger.style.display = "none";
  }

  if (!header) {
    // Page has no header → show nav immediately
    showNavigation();
  } else {
    // Page has header → show nav only after scrolling past header
    window.addEventListener("scroll", () => {
      if (window.scrollY > header.offsetHeight) {
        showNavigation();
      } else {
        hideNavigation();
      }
    });
  }

  // Toggle menu overlay
  hamburger.addEventListener("click", () => {
    navBar.classList.toggle("active");
    hamburger.classList.toggle("active");

    // Disable scroll when menu is open
    if (navBar.classList.contains("active")) {
      body.classList.add("no-scroll");
    } else {
      body.classList.remove("no-scroll");
    }
  });
});
