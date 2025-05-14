// js/script.js

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM w pełni załadowany i parsowany');

  // ——————————————
  // Pomniejszanie logo przy scrollu
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {                 // po 50px przewinięcia
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });


  // --- Slider elements ---
  const slides = document.querySelectorAll('.slide');
  const slidesContainer = document.querySelector('.slides');
  const prevBtn = document.querySelector('.slider__btn--prev');
  const nextBtn = document.querySelector('.slider__btn--next');
  const dots = document.querySelectorAll('.pagination__dot');
  let current = 0;
  const total = slides.length;
  let slideTimer;

  // Function to update slider position and pagination
  function updateSlider() {
    slidesContainer.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
    });
  }

  // Schedule automatic slide change with resettable timer
  function scheduleNext() {
    clearTimeout(slideTimer);
    slideTimer = setTimeout(() => {
      current = (current + 1) % total;
      updateSlider();
      scheduleNext();
    }, 5000);
  }

  // Initialize slider
  updateSlider();
  scheduleNext();

  // Prev/Next button listeners
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      current = (current - 1 + total) % total;
      updateSlider();
      scheduleNext();
    });
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      current = (current + 1) % total;
      updateSlider();
      scheduleNext();
    });
  }

  // Dot pagination listeners
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      current = idx;
      updateSlider();
      scheduleNext();
    });
  });

  // --- Hamburger menu toggle ---
  const menuToggle = document.querySelector('.menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      const nav = document.querySelector('nav');
      if (nav) nav.classList.toggle('nav--open');
    });
  }
});
