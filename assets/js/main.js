/**
 * Portfolio & Digital Agency Custom JavaScript
 * Author: Ayub
 * Description: Interactivity, animations, library initializations, and custom UX features.
 */

document.addEventListener('DOMContentLoaded', () => {
  // ==========================================================================
  // Loader & Page Inits
  // ==========================================================================
  const loaderWrapper = document.getElementById('loader-wrapper');
  window.addEventListener('load', () => {
    if (loaderWrapper) {
      setTimeout(() => {
        loaderWrapper.style.opacity = '0';
        loaderWrapper.style.visibility = 'hidden';
        
        // Trigger GSAP entrance animations once loaded
        initGSAPEntrances();
      }, 500);
    }
  });

  // Fallback if load event doesn't fire
  setTimeout(() => {
    if (loaderWrapper && loaderWrapper.style.visibility !== 'hidden') {
      loaderWrapper.style.opacity = '0';
      loaderWrapper.style.visibility = 'hidden';
      initGSAPEntrances();
    }
  }, 3000);

  // Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-out-quad',
      once: true,
      mirror: false
    });
  }

  // ==========================================================================
  // Custom Interactive Mouse Cursor
  // ==========================================================================
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.custom-cursor-follower');

  if (cursor && follower && window.innerWidth > 1024) {
    let mouseX = 0, mouseY = 0;
    let followX = 0, followY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    });

    // Smooth follower effect using requestAnimationFrame
    const updateFollower = () => {
      const ease = 0.15; // smoothness factor
      followX += (mouseX - followX) * ease;
      followY += (mouseY - followY) * ease;

      follower.style.left = `${followX}px`;
      follower.style.top = `${followY}px`;

      requestAnimationFrame(updateFollower);
    };
    updateFollower();

    // Add hover effect states for interactive elements
    const hoverElms = document.querySelectorAll('a, button, .portfolio-filter-btn, .accordion-button, .form-control, .theme-toggle-btn');
    hoverElms.forEach((elm) => {
      elm.addEventListener('mouseenter', () => {
        cursor.classList.add('hovered');
        follower.classList.add('hovered');
      });
      elm.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovered');
        follower.classList.remove('hovered');
      });
    });
  }

  // ==========================================================================
  // Theme Toggle Logic (Light / Dark)
  // ==========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

  // Retrieve theme preference or default to dark
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-bs-theme', currentTheme);
  updateThemeIcon(currentTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-bs-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-bs-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
      themeIcon.className = 'bi bi-moon-fill';
    } else {
      themeIcon.className = 'bi bi-sun-fill';
    }
  }

  // ==========================================================================
  // Sticky Navbar & Scroll Progress
  // ==========================================================================
  const navbar = document.querySelector('.navbar-custom');
  const scrollProgressBar = document.querySelector('.scroll-progress-bar');
  const backToTopBtn = document.querySelector('.back-to-top-btn');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    // Sticky navbar class
    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Scroll progress bar
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrollPercent}%`;
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 500) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  // Smooth back to top action
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Active navigation link update on scroll
  const navLinks = document.querySelectorAll('.nav-link-custom');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let currentId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // Smooth scroll for nav link anchors
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetSection = document.querySelector(href);
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // ==========================================================================
  // Typed.js Rotating Job Titles
  // ==========================================================================
  const typedEl = document.querySelector('.typed-element');
  if (typedEl && typeof Typed !== 'undefined') {
    new Typed('.typed-element', {
      strings: [
        'Full Stack Developer',
        'Laravel Specialist',
        'ERP & Shopify Developer'
      ],
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      showCursor: true,
      cursorChar: '|'
    });
  }

  // ==========================================================================
  // Swiper Carousels
  // ==========================================================================
  // Testimonials Carousel
  if (typeof Swiper !== 'undefined') {
    new Swiper('.testimonial-swiper', {
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 30
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 30
        }
      }
    });

    // Tech Stack Carousel
    new Swiper('.tech-swiper', {
      slidesPerView: 3,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction: false
      },
      breakpoints: {
        576: { slidesPerView: 4, spaceBetween: 20 },
        768: { slidesPerView: 5, spaceBetween: 30 },
        1024: { slidesPerView: 6, spaceBetween: 40 },
        1200: { slidesPerView: 8, spaceBetween: 40 }
      }
    });
  }

  // ==========================================================================
  // Portfolio Filtering System
  // ==========================================================================
  const filterBtns = document.querySelectorAll('.portfolio-filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Remove active class from other buttons and add to this one
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      // Loop through portfolio items
      portfolioItems.forEach((item) => {
        // Setup simple reveal transition
        if (filterValue === 'all' || item.classList.contains(filterValue)) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ==========================================================================
  // Skill Bars Animation
  // ==========================================================================
  const skillSection = document.getElementById('skills');
  const skillBars = document.querySelectorAll('.progress-bar-custom');
  let skillsAnimated = false;

  const animateSkills = () => {
    skillBars.forEach((bar) => {
      const percentage = bar.getAttribute('data-progress') || '0';
      bar.style.width = `${percentage}%`;
    });
  };

  // Trigger skill bars on scroll
  const handleScroll = () => {
    if (!skillSection) return;
    const sectionPos = skillSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight - 100;

    if (sectionPos < screenPos && !skillsAnimated) {
      animateSkills();
      skillsAnimated = true;
    }
  };
  window.addEventListener('scroll', handleScroll);
  // Run on load in case section is already in view
  setTimeout(handleScroll, 800);

  // ==========================================================================
  // Statistics Counter Animation
  // ==========================================================================
  const statsSection = document.getElementById('statistics');
  const statNumbers = document.querySelectorAll('.stat-number');
  let statsAnimated = false;

  const animateCounters = () => {
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.getAttribute('data-target') || '0', 10);
      const suffix = stat.getAttribute('data-suffix') || '';
      let current = 0;
      const duration = 2000; // ms
      const stepTime = Math.abs(Math.floor(duration / target));

      const timer = setInterval(() => {
        current += 1;
        stat.textContent = current + suffix;
        if (current >= target) {
          stat.textContent = target + suffix;
          clearInterval(timer);
        }
      }, stepTime || 20);
    });
  };

  // Trigger counters on scroll
  const handleStatsScroll = () => {
    if (!statsSection) return;
    const sectionPos = statsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight - 100;

    if (sectionPos < screenPos && !statsAnimated) {
      animateCounters();
      statsAnimated = true;
    }
  };
  window.addEventListener('scroll', handleStatsScroll);
  setTimeout(handleStatsScroll, 800);

  // ==========================================================================
  // Magnetic Buttons Effect
  // ==========================================================================
  const magneticBtns = document.querySelectorAll('.magnetic-btn');

  magneticBtns.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Translate button towards mouse coordinate slightly
      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px)';
    });
  });

  // ==========================================================================
  // Ripple Buttons Effect
  // ==========================================================================
  const rippleBtns = document.querySelectorAll('.btn-ripple');

  rippleBtns.forEach((btn) => {
    btn.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.className = 'ripple-effect';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // ==========================================================================
  // GSAP Custom Scroll Trigger Animations
  // ==========================================================================
  function initGSAPEntrances() {
    if (typeof gsap === 'undefined') return;

    // Register ScrollTrigger plugin if available
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Hero Timeline Entrance
    const heroTl = gsap.timeline();
    heroTl.from('.hero-badge', { opacity: 0, y: 30, duration: 0.8, ease: 'power4.out' })
          .from('.hero-title', { opacity: 0, y: 40, duration: 1, ease: 'power4.out' }, '-=0.6')
          .from('.hero-desc', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.6')
          .from('.hero-ctas', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, '-=0.6')
          .from('.hero-socials', { opacity: 0, y: 20, duration: 0.6, ease: 'power2.out' }, '-=0.4')
          .from('.hero-profile-wrapper', { opacity: 0, scale: 0.8, duration: 1.2, ease: 'elastic.out(1, 0.75)' }, '-=1');

    // Scroll parallax for decorative blobs & grid using mousemove
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 40;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 40;

        gsap.to('.bg-blob-primary', { x: mouseX * 0.8, y: mouseY * 0.8, duration: 1, ease: 'power2.out' });
        gsap.to('.bg-blob-secondary', { x: -mouseX * 0.6, y: -mouseY * 0.6, duration: 1, ease: 'power2.out' });
        gsap.to('.hero-profile-circle', { x: mouseX * 0.4, y: mouseY * 0.4, duration: 1, ease: 'power2.out' });
      });
    }

    // Scroll triggered GSAP animation examples if ScrollTrigger is loaded
    if (typeof ScrollTrigger !== 'undefined') {
      // Reveal titles
      const headings = document.querySelectorAll('.section-title');
      headings.forEach((heading) => {
        gsap.from(heading, {
          scrollTrigger: {
            trigger: heading,
            start: 'top 85%'
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out'
        });
      });
      
      // Reveal timelines or lists
      const timelineItems = document.querySelectorAll('.timeline-item');
      timelineItems.forEach((item, index) => {
        const xOffset = item.classList.contains('timeline-item-left') ? -50 : 50;
        gsap.from(item, {
          scrollTrigger: {
            trigger: item,
            start: 'top 80%'
          },
          opacity: 0,
          x: xOffset,
          duration: 0.8,
          ease: 'power3.out'
        });
      });
    }
  }

  // ==========================================================================
  // Form Submission & Contact Interaction
  // ==========================================================================
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Simple Bootstrap form validation visual triggers
      if (!contactForm.checkValidity()) {
        e.stopPropagation();
        contactForm.classList.add('was-validated');
        return;
      }

      contactForm.classList.remove('was-validated');
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      // Visual feedback loading state
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Sending...';

      // Simulate API submit delay
      setTimeout(() => {
        submitBtn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Sent Successfully!';
        submitBtn.classList.remove('btn-primary-custom');
        submitBtn.classList.add('btn-success');
        
        // Show bootstrap modal alert or toast
        const feedbackModalEl = document.getElementById('formFeedbackModal');
        if (feedbackModalEl) {
          const feedbackModal = new bootstrap.Modal(feedbackModalEl);
          feedbackModal.show();
        }

        // Reset form
        contactForm.reset();

        // Revert button status
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.classList.remove('btn-success');
          submitBtn.classList.add('btn-primary-custom');
        }, 3000);
      }, 1500);
    });
  }
});
