/**
 * ==============================================================================
 * DIVINO A LA CARTA - JAVASCRIPT PRINCIPAL
 * ==============================================================================
 * Configuración fácil de editar y lógica interactiva del sitio.
 */

// ==============================================================================
// 1. CONFIGURACIÓN (EDITA AQUÍ TUS DATOS)
// ==============================================================================
const CONFIG = {
  // Número de WhatsApp (código de país + número, SIN espacios, guiones ni símbolo '+')
  // Ejemplo Venezuela: '584121234567' | Ejemplo México: '5215512345678' | Ejemplo España: '34612345678'
  whatsappPhone: '584120000000', // <-- REEMPLAZA ESTE PLACEHOLDER CON TU NÚMERO REAL

  // Mensaje por defecto para el botón flotante de WhatsApp
  whatsappFloatingMessage: '¡Hola Divino a la Carta! Quisiera solicitar información sobre sus experiencias culinarias para eventos.',

  // Tiempo de espera (en milisegundos) antes de abrir WhatsApp tras enviar el formulario
  whatsappRedirectDelay: 1200
};

// ==============================================================================
// 2. INICIALIZACIÓN AL CARGAR EL DOM
// ==============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initWhatsAppFloatingButton();
  initContactForm();
  initScrollReveal();
  initSmoothScroll();
});

// ==============================================================================
// 3. BOTÓN FLOTANTE DE WHATSAPP
// ==============================================================================
function initWhatsAppFloatingButton() {
  const floatBtn = document.getElementById('whatsapp-floating-btn');
  if (!floatBtn) return;

  const url = `https://wa.me/${CONFIG.whatsappPhone}?text=${encodeURIComponent(CONFIG.whatsappFloatingMessage)}`;
  floatBtn.setAttribute('href', url);
}

// ==============================================================================
// 4. FORMULARIO DE COTIZACIÓN Y REDIRECCIÓN A WHATSAPP
// ==============================================================================
function initContactForm() {
  const form = document.getElementById('cotizacion-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtener valores de los campos
    const name = document.getElementById('form-name')?.value.trim() || '';
    const email = document.getElementById('form-email')?.value.trim() || '';
    const phone = document.getElementById('form-phone')?.value.trim() || '';
    const eventType = document.getElementById('form-eventType')?.value.trim() || '';
    const date = document.getElementById('form-date')?.value.trim() || '';
    const message = document.getElementById('form-message')?.value.trim() || '';

    // Formatear mensaje profesional para WhatsApp
    const whatsappText = 
`🍷 *Solicitud de Cotización - Divino a la Carta*

👤 *Nombre:* ${name}
📧 *Email:* ${email}
📱 *Teléfono:* ${phone}
🎉 *Tipo de Evento:* ${eventType}
📅 *Fecha Aproximada:* ${date || 'Por definir'}

📝 *Detalles del Evento:*
${message}

---
_Enviado desde el sitio web divinoalacarta.com_`;

    // 1. Mostrar notificación Toast de confirmación
    showToast(
      '¡Solicitud Enviada!',
      'Nos pondremos en contacto contigo pronto para diseñar tu experiencia culinaria. Redirigiendo a WhatsApp...'
    );

    // 2. Limpiar el formulario
    form.reset();

    // 3. Redirigir a WhatsApp tras breve pausa para permitir leer la notificación
    const whatsappUrl = `https://wa.me/${CONFIG.whatsappPhone}?text=${encodeURIComponent(whatsappText)}`;
    
    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, CONFIG.whatsappRedirectDelay);
  });
}

// ==============================================================================
// 5. SISTEMA DE NOTIFICACIONES TOAST
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
    <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
      <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
    <div class="toast-content">
      <h4>${title}</h4>
      <p>${description}</p>
    </div>
  `;

  container.appendChild(toast);

  // Animar entrada
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Ocultar y remover después de 4.5 segundos
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 4500);
}

// ==============================================================================
// 6. SCROLL SUAVE PARA ENLACES INTERNOS
// ==============================================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ==============================================================================
// 7. ANIMACIONES DE ENTRADA AL HACER SCROLL (INTERSECTION OBSERVER)
// ==============================================================================
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    // Fallback si el navegador es muy antiguo
    reveals.forEach((el) => el.classList.add('active'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach((el) => observer.observe(el));
}
