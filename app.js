(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // MOBILE NAVIGATION TOGGLE
    // ==========================================
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
      menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Animated hamburger morph
        const bars = menuToggle.querySelectorAll('.menu-bar');
        if (menuToggle.classList.contains('active')) {
          bars[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
          bars[1].style.opacity = '0';
          bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
          bars[0].style.transform = 'none';
          bars[1].style.opacity = '1';
          bars[2].style.transform = 'none';
        }
      });
    }

    // Close menu when clicking link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          navMenu.classList.remove('active');
          menuToggle.classList.remove('active');
          const bars = menuToggle.querySelectorAll('.menu-bar');
          bars[0].style.transform = 'none';
          bars[1].style.opacity = '1';
          bars[2].style.transform = 'none';
        }
      });
    });

    // ==========================================
    // DYNAMIC TYPIST EFFECT IN HERO
    // ==========================================
    const heroTitleSpan = document.querySelector('.hero-title .gradient-text');
    if (heroTitleSpan) {
      const words = ['Interactive', 'Generative', 'Immersive', 'Beautiful'];
      let wordIndex = 0;
      let charIndex = heroTitleSpan.textContent.length;
      let isDeleting = true;
      let typingSpeed = 100;

      function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
          heroTitleSpan.textContent = currentWord.substring(0, charIndex - 1);
          charIndex--;
          typingSpeed = 50; // Deletes faster
        } else {
          heroTitleSpan.textContent = currentWord.substring(0, charIndex + 1);
          charIndex++;
          typingSpeed = 120; // Types slightly slower
        }

        if (!isDeleting && charIndex === currentWord.length) {
          // Finished typing word, wait before deleting
          isDeleting = true;
          typingSpeed = 2000;
        } else if (isDeleting && charIndex === 0) {
          // Finished deleting, load next word
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          typingSpeed = 300; // Delay before starting next word
        }

        setTimeout(type, typingSpeed);
      }

      // Start typing simulation after brief initial delay
      setTimeout(type, 1500);
    }

    // ==========================================
    // INTERSECTION OBSERVER FOR SCROLL REVEALS
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Optionally unobserve after animating once
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px' // Trigger slightly before element enters viewport
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ==========================================
    // HEADER SCROLL SPY AND SHADOW
    // ==========================================
    const header = document.getElementById('header');
    const sections = document.querySelectorAll('section');
    
    function handleScroll() {
      // Toggle header blur class
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      // Scroll Spy Link Highlighting
      let currentSectionId = '';
      const scrollPos = window.scrollY + 120; // Offset for header height

      sections.forEach(sec => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          currentSectionId = sec.getAttribute('id');
        }
      });

      if (currentSectionId) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
          }
        });
      }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once initially

    // ==========================================
    // CUSTOM MOUSE-TRAILING CURSOR
    // ==========================================
    const cursor = document.getElementById('custom-cursor');
    const cursorDot = document.getElementById('custom-cursor-dot');

    if (cursor && cursorDot) {
      let mouseX = -100;
      let mouseY = -100;
      let cursorX = -100;
      let cursorY = -100;

      window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Immediate position for the tiny inner dot
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
      });

      // Lerp (Linear Interpolation) for the larger outer circle trail
      function animateCursor() {
        const dx = mouseX - cursorX;
        const dy = mouseY - cursorY;
        
        cursorX += dx * 0.15;
        cursorY += dy * 0.15;
        
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        
        requestAnimationFrame(animateCursor);
      }
      requestAnimationFrame(animateCursor);

      // Add hover class when mouse goes over links/buttons
      const interactiveSelector = 'a, button, input, textarea, .mode-btn, .controls-header, .control-input';
      const interactives = document.querySelectorAll(interactiveSelector);
      
      interactives.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovered'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovered'));
      });

      // Handle dynamically loaded items or elements inside cards
      document.body.addEventListener('mouseover', (e) => {
        if (e.target.closest(interactiveSelector)) {
          cursor.classList.add('hovered');
        } else {
          cursor.classList.remove('hovered');
        }
      });
    }

    // ==========================================
    // CONTACT FORM SUBMISSION MOCKUP
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm && formSuccess) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Fetch button and show loading state
        const submitBtn = contactForm.querySelector('.submit-btn');
        const originalBtnContent = submitBtn.innerHTML;
        
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.innerHTML = 'Sending message...';

        // Simulate AJAX request latency
        setTimeout(() => {
          // Hide form with fade effect
          contactForm.style.transition = 'opacity 0.4s ease';
          contactForm.style.opacity = '0';
          
          setTimeout(() => {
            contactForm.style.display = 'none';
            formSuccess.style.display = 'flex';
            formSuccess.style.opacity = '0';
            formSuccess.style.transition = 'opacity 0.4s ease';
            
            // Trigger browser paint
            formSuccess.offsetHeight;
            formSuccess.style.opacity = '1';
          }, 400);

        }, 1200);
      });
    }

  });
})();
