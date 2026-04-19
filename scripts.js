document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Mobile Dropdown Toggle
  const dropdownParents = document.querySelectorAll('.nav-links li:has(.dropdown-menu)');
  
  dropdownParents.forEach(parent => {
    parent.addEventListener('click', (e) => {
      // Only behavior change for mobile sizes
      if (window.innerWidth <= 768) {
        // Prevent default only if clicking the parent link itself, not the dropdown links
        if (e.target === parent.children[0]) {
          e.preventDefault();
          parent.classList.toggle('active');
        }
      }
    });
  });

  // Hero Carousel
  const carouselInner = document.querySelector('#heroCarousel .carousel-inner');
  const dots = document.querySelectorAll('#heroCarousel .dot');
  
  if (carouselInner && dots.length > 0) {
    let currentSlide = 0;
    const totalSlides = dots.length;
    let slideInterval;

    const goToSlide = (index) => {
      // Handle wrap-around
      if (index >= totalSlides) {
        currentSlide = 0;
      } else if (index < 0) {
        currentSlide = totalSlides - 1;
      } else {
        currentSlide = index;
      }

      // Update carousel position
      carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;

      // Update active dot
      dots.forEach(d => d.classList.remove('active'));
      if (dots[currentSlide]) {
        dots[currentSlide].classList.add('active');
      }
    };

    const startSlideShow = () => {
      slideInterval = setInterval(() => {
        goToSlide(currentSlide + 1);
      }, 3000); // 3 seconds per slide (adjust as needed)
    };

    const resetSlideShow = () => {
      clearInterval(slideInterval);
      startSlideShow();
    };

    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        goToSlide(index);
        resetSlideShow();
      });
    });

    startSlideShow();
  }
});
