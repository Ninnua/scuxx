document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navBar = document.getElementById("nav-bar");
  const navigation = document.getElementById("navigation");
  const body = document.body;
  const header = document.querySelector(".header"); // may be null

  // Create a placeholder to prevent content jumping
  const navPlaceholder = document.createElement("div");
  navPlaceholder.style.height = "0px"; // initial height
  navPlaceholder.style.transition = "height 0.3s ease"; // smooth animation
  body.insertBefore(navPlaceholder, body.firstChild);

  // Place nav after header if exists, else top of body
  if (header) {
    header.insertAdjacentElement("afterend", navigation);
  } else {
    body.insertAdjacentElement("afterbegin", navigation);
  }

  // Function to determine if nav is currently overlapping content
  function navIsOverContent() {
    if (window.innerWidth > 768) return false; // desktop: no overlap
    if (!header) return true; // no header: always overlaps
    return window.scrollY > header.offsetHeight; // after header scroll
  }

  // Update placeholder height dynamically
  function updatePlaceholder() {
    if (window.innerWidth <= 768 && navigation.classList.contains("active")) {
      if (!header) {
        navPlaceholder.style.height = `${navigation.offsetHeight}px`;
      } else {
        navPlaceholder.style.height = navIsOverContent()
          ? `${navigation.offsetHeight}px`
          : "0px";
      }
    } else {
      navPlaceholder.style.height = "0px"; // remove on desktop
    }
  }

  // Show nav + hamburger
  function showNavigation() {
    navigation.classList.add("active");
    hamburger.style.display = "flex";
    updatePlaceholder();
  }

  // Hide nav + hamburger
  function hideNavigation() {
    navigation.classList.remove("active");
    navBar.classList.remove("active");
    hamburger.classList.remove("active");
    body.classList.remove("no-scroll");
    hamburger.style.display = "none";
    updatePlaceholder();
  }

  // Initial page logic
  if (!header) {
    // no header: show nav immediately
    showNavigation();
  } else {
    // with header: show nav only after scrolling past header
    window.addEventListener("scroll", () => {
      if (window.scrollY > header.offsetHeight) {
        showNavigation();
      } else {
        hideNavigation();
      }
      updatePlaceholder();
    });
  }

  // Hamburger toggle
  hamburger.addEventListener("click", () => {
    navBar.classList.toggle("active");
    hamburger.classList.toggle("active");

    if (navBar.classList.contains("active")) {
      body.classList.add("no-scroll");
    } else {
      body.classList.remove("no-scroll");
    }

    updatePlaceholder();
  });

  // Recalculate on window resize
  window.addEventListener("resize", updatePlaceholder);

  // Initial placeholder update
  updatePlaceholder();
});
