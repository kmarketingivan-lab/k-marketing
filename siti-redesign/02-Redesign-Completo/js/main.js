// K-Marketing Redesign - JavaScript
document.addEventListener('DOMContentLoaded', () => {
  // Header scroll effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Form handling con invio AJAX
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const submitBtn = form.querySelector('.btn-submit');
      const originalText = submitBtn.textContent;
      
      // Stato loading
      submitBtn.textContent = 'Invio in corso...';
      submitBtn.disabled = true;
      
      try {
        const formData = new FormData(form);
        const response = await fetch(form.action, {
          method: 'POST',
          body: formData
        });
        
        const result = await response.json();
        
        if (result.success) {
          alert(result.message);
          form.reset();
        } else {
          alert('Errore: ' + result.message);
        }
      } catch (error) {
        alert('Errore di connessione. Riprova più tardi.');
        console.error('Errore invio form:', error);
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  }

  // Scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.card, .about-grid, .section-header').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Scroll-based animations per project-section
  const projectSections = document.querySelectorAll('.project-section:not(.charme-section)');
  const mockupGallery = document.querySelector('.mockup-gallery');
  const charmeSection = document.querySelector('.charme-section');
  let mockupAnimated = false;
  
  function checkScroll() {
    const triggerPoint = window.innerHeight * 0.85;
    
    projectSections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;
      
      if (sectionTop < triggerPoint) {
        section.classList.add('visible');
      }
    });
    
    // Animazione mockup quando visibile al 70%
    if (mockupGallery && !mockupAnimated) {
      const rect = mockupGallery.getBoundingClientRect();
      const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      const percentVisible = visibleHeight / rect.height;
      
      if (percentVisible >= 0.7) {
        mockupAnimated = true;
        mockupGallery.classList.add('animate');
      }
    }
    
    // Animazione Charme scroll-based progressiva
    if (charmeSection) {
      const rect = charmeSection.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Sezione: inizia quando entra nel viewport, raggiunge 1 al 30% dall'alto
      const startPoint = windowHeight;
      const endPoint = windowHeight * 0.3;
      const scrollProgress = Math.max(0, Math.min(1, (startPoint - rect.top) / (startPoint - endPoint)));
      
      charmeSection.style.opacity = scrollProgress;
      charmeSection.style.transform = `translateY(${40 * (1 - scrollProgress)}px)`;
      
      // Testo: compare al 40% dall'alto con slide da sinistra
      const textStartPoint = windowHeight;
      const textEndPoint = windowHeight * 0.4;
      const textProgress = Math.max(0, Math.min(1, (textStartPoint - rect.top) / (textStartPoint - textEndPoint)));
      
      const h2 = charmeSection.querySelector('.project-text h2');
      const h3 = charmeSection.querySelector('.project-text h3');
      const paragraphs = charmeSection.querySelectorAll('.project-text p');
      
      if (h2) {
        h2.style.opacity = textProgress;
        h2.style.transform = `translateX(${-30 * (1 - textProgress)}px)`;
      }
      if (h3) {
        const h3Progress = Math.max(0, Math.min(1, (textProgress - 0.1) * 1.2));
        h3.style.opacity = h3Progress;
        h3.style.transform = `translateX(${-30 * (1 - h3Progress)}px)`;
      }
      paragraphs.forEach((p, index) => {
        const pProgress = Math.max(0, Math.min(1, (textProgress - 0.2 - (index * 0.1)) * 1.4));
        p.style.opacity = pProgress;
        p.style.transform = `translateX(${-30 * (1 - pProgress)}px)`;
      });
    }
  }
  
  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Check iniziale

  // Add visible class styles dynamically
  const style = document.createElement('style');
  style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);

  // Tilt effect per mockup smartphone
  const tiltElements = document.querySelectorAll('[data-tilt]');
  
  tiltElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });
    
    el.addEventListener('mouseleave', () => {
      el.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
  });

  // Slideshow automatico
  const slideshows = document.querySelectorAll('.slideshow-container');
  
  slideshows.forEach(slideshow => {
    const images = slideshow.querySelectorAll('img');
    const dots = slideshow.querySelectorAll('.dot');
    let currentSlide = 0;
    
    function showSlide(index) {
      images.forEach(img => img.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      images[index].classList.add('active');
      dots[index].classList.add('active');
      currentSlide = index;
    }
    
    // Click sui dots
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const slideIndex = parseInt(dot.dataset.slide);
        showSlide(slideIndex);
      });
    });
    
    // Auto-play ogni 4 secondi
    setInterval(() => {
      const nextSlide = (currentSlide + 1) % images.length;
      showSlide(nextSlide);
    }, 4000);
  });
});
