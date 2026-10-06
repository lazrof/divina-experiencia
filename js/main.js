/**
 * ==============================================================================
 * DIVINA EXPERIENCIA - EMPRESARIAL | JAVASCRIPT PRINCIPAL
 * ==============================================================================
 * Arquitectura limpia en Vanilla JS (sin dependencias externas).
 * Incluye Slider Hero táctil, Cotizador WhatsApp B2B, Galería Filtrable y Lightbox.
 */

// ==============================================================================
// 1. CONFIGURACIÓN CORPORATIVA (EDITA AQUÍ TUS DATOS)
// ==============================================================================
const CONFIG = {
  // Número de WhatsApp (código de país + número, SIN espacios, guiones ni '+')
  // Ejemplo Venezuela: '584121234567' | Ejemplo Colombia: '573001234567' | Ejemplo México: '5215512345678'
  whatsappPhone: '573189552795', // <-- REEMPLAZA ESTE PLACEHOLDER CON TU NÚMERO REAL

  // Mensaje por defecto para el botón flotante y enlaces rápidos
  whatsappFloatingMessage: '¡Hola Divina Experiencia! Quisiera solicitar información sobre sus experiencias culinarias y team building corporativo.',

  // Intervalo de auto-avance del Hero Slider (en milisegundos)
  heroSliderInterval: 5500,

  // Tiempo de espera (en milisegundos) antes de redirigir a WhatsApp tras enviar el formulario
  whatsappRedirectDelay: 1200
};

// ==============================================================================
// 2. INICIALIZACIÓN AL CARGAR EL DOM
// ==============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroSlider();
  initContactForm();
  initGalleryFilterAndLightbox();
  initWhatsAppLinks();
  initScrollReveal();
});

// ==============================================================================
// 3. BARRA DE NAVEGACIÓN Y MENÚ MÓVIL
// ==============================================================================
function initNavbar() {
  const toggleBtn = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('mobile-open');
    });

    // Cerrar el menú móvil al hacer clic en cualquier enlace
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
      });
    });
  }
}

// ==============================================================================
// 4. HERO SLIDER INTERACTIVO (TOUCH & AUTO-PLAY)
// ==============================================================================
function initHeroSlider() {
  const carousel = document.getElementById('hero-carousel');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.carousel-slide');
  const dots = carousel.querySelectorAll('.carousel-dot');
  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');

  if (!slides.length) return;

  let currentIndex = 0;
  let autoplayTimer = null;

  function showSlide(index) {
    if (index >= slides.length) index = 0;
    if (index < 0) index = slides.length - 1;
    currentIndex = index;

    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentIndex);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, CONFIG.heroSliderInterval);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // Controles Prev / Next
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      startAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      startAutoplay();
    });
  }

  // Puntos de Navegación
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      if (!isNaN(idx)) {
        showSlide(idx);
        startAutoplay();
      }
    });
  });

  // Pausar en Hover para lectura cómoda
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  // Soporte para gestos táctiles (Swipe en móvil)
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoplay();
  }, { passive: true });

  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    startAutoplay();
  }, { passive: true });

  // Iniciar carrusel
  startAutoplay();
}

// ==============================================================================
// 5. FORMULARIO CORPORATIVO DE COTIZACIÓN (WHATSAPP)
// ==============================================================================
function initContactForm() {
  const form = document.getElementById('cotizacion-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtener y sanitizar valores
    const name = document.getElementById('form-name')?.value.trim() || '';
    const company = document.getElementById('form-company')?.value.trim() || '';
    const phone = document.getElementById('form-phone')?.value.trim() || '';
    const email = document.getElementById('form-email')?.value.trim() || '';
    const eventType = document.getElementById('form-eventType')?.value || 'Por definir';
    const attendees = document.getElementById('form-attendees')?.value || 'Por definir';
    const date = document.getElementById('form-date')?.value.trim() || '';
    const message = document.getElementById('form-message')?.value.trim() || '';

    // Formatear Ficha Ejecutiva para WhatsApp
    const whatsappText = 
`👔 *Solicitud de Cotización Empresarial - Divina Experiencia*

👤 *Contacto:* ${name}
🏢 *Empresa / Organización:* ${company}
📱 *Teléfono:* ${phone}
📧 *Email Corporativo:* ${email}

🎯 *Tipo de Experiencia:* ${eventType}
👥 *N° Estimado de Participantes:* ${attendees}
📅 *Fecha Tentativa:* ${date || 'Por coordinar con el equipo'}

📝 *Objetivos / Comentarios Adicionales:*
${message || 'Sin comentarios adicionales.'}

---
_Solicitud generada desde el portal corporativo divinaexperiencia.com_`;

    // 1. Notificación visual Toast
    showToast(
      '¡Ficha Ejecutiva Preparada!',
      'Redirigiendo a WhatsApp con tu solicitud lista para cotizar...'
    );

    // 2. Limpiar formulario
    form.reset();

    // 3. Abrir WhatsApp tras pausa
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappPhone}?text=${encodeURIComponent(whatsappText)}`;
    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, CONFIG.whatsappRedirectDelay);
  });
}

// ==============================================================================
// 6. GALERÍA FILTRABLE Y LIGHTBOX MODAL NATIVO
// ==============================================================================
function initGalleryFilterAndLightbox() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxDialog = document.getElementById('lightbox-dialog');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaptionText = document.getElementById('lightbox-caption-text');
  const lightboxCloseBtn = document.getElementById('lightbox-close');

  // Filtros por Categoría
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (filter === 'all' || itemCat === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Apertura de Lightbox con API nativa de <dialog>
  if (lightboxDialog) {
    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const imgSrc = item.getAttribute('data-img');
        const caption = item.getAttribute('data-caption') || 'Divina Experiencia';

        if (imgSrc && lightboxImg) {
          lightboxImg.src = imgSrc;
          lightboxImg.alt = caption;
        }
        if (lightboxCaptionText) {
          lightboxCaptionText.textContent = caption;
        }

        if (typeof lightboxDialog.showModal === 'function') {
          lightboxDialog.showModal();
        }
      });
    });

    // Cerrar botón
    if (lightboxCloseBtn) {
      lightboxCloseBtn.addEventListener('click', () => {
        lightboxDialog.close();
      });
    }

    // Cerrar al hacer clic en el backdrop
    lightboxDialog.addEventListener('click', (e) => {
      const rect = lightboxDialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        lightboxDialog.close();
      }
    });
  }
}

// ==============================================================================
// 7. ENLACES DIRECTOS DE WHATSAPP
// ==============================================================================
function initWhatsAppLinks() {
  const url = `https://wa.me/${CONFIG.whatsappPhone}?text=${encodeURIComponent(CONFIG.whatsappFloatingMessage)}`;

  const floatingBtn = document.getElementById('whatsapp-floating-btn');
  if (floatingBtn) floatingBtn.href = url;

  const directLink = document.getElementById('direct-wa-link');
  if (directLink) directLink.href = url;

  const footerLink = document.getElementById('footer-wa-link');
  if (footerLink) footerLink.href = url;
}

// ==============================================================================
// 8. SISTEMA DE NOTIFICACIONES TOAST
// ==============================================================================
function showToast(title, description) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-title">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
      ${title}
    </div>
    <div class="toast-desc">${description}</div>
  `;

  container.appendChild(toast);

  // Animar entrada
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Remover automáticamente tras 4.5 segundos
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4500);
}

// ==============================================================================
// 9. ANIMACIONES DE DESPLAZAMIENTO (SCROLL REVEAL)
// ==============================================================================
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback para navegadores antiguos
    reveals.forEach(el => el.classList.add('active'));
  }
}
