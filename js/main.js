// ===== INICIALIZACIÓN ===== //
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
    
    // Inicializar funcionalidades
    initNavbar();
    initSmoothScrolling();
    initContactForm();
    initAnimations();
});

// ===== NAVEGACIÓN ===== //
function initNavbar() {
    const navbar = document.getElementById('mainNavbar');
    
    // Cambiar apariencia del navbar al hacer scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
    });
    
    // Cerrar menú móvil al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.getElementById('navbarNav');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
}

// ===== SMOOTH SCROLLING ===== //
function initSmoothScrolling() {
    // Smooth scrolling para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Ajuste para navbar fijo
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== FORMULARIO DE CONTACTO ===== //
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener datos del formulario
            const formData = new FormData(contactForm);
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Mostrar estado de carga
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
            submitBtn.disabled = true;
            
            // Simular envío (aquí integrarías con tu backend)
            setTimeout(() => {
                // Mostrar mensaje de éxito
                showNotification('¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.', 'success');
                
                // Resetear formulario
                contactForm.reset();
                
                // Restaurar botón
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
}

// ===== ANIMACIONES ===== //
function initAnimations() {
    // Animación de contadores en las estadísticas
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Animación de entrada para tarjetas de servicios
    const serviceCards = document.querySelectorAll('.service-card');
    const cardObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    serviceCards.forEach(card => {
        cardObserver.observe(card);
    });
}

// ===== FUNCIONES AUXILIARES ===== //

// Animación de contadores
function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const suffix = element.textContent.replace(/\d/g, '');
    let current = 0;
    const increment = target / 50;
    const duration = 2000;
    const stepTime = duration / 50;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, stepTime);
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'success' ? 'success' : 'info'} alert-dismissible fade show position-fixed`;
    notification.style.cssText = `
        top: 100px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
    
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Auto-remover después de 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 5000);
}

// Validación de formularios en tiempo real
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validateField(this);
                }
            });
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Validación según el tipo de campo
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'Este campo es obligatorio';
    } else if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Ingrese un email válido';
        }
    } else if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Ingrese un teléfono válido';
        }
    }
    
    // Aplicar estilos de validación
    if (isValid) {
        field.classList.remove('is-invalid');
        field.classList.add('is-valid');
        removeErrorMessage(field);
    } else {
        field.classList.remove('is-valid');
        field.classList.add('is-invalid');
        showErrorMessage(field, errorMessage);
    }
    
    return isValid;
}

function showErrorMessage(field, message) {
    removeErrorMessage(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
}

function removeErrorMessage(field) {
    const existingError = field.parentNode.querySelector('.invalid-feedback');
    if (existingError) {
        existingError.remove();
    }
}

// ===== UTILIDADES ADICIONALES ===== //

// Detectar dispositivo móvil
function isMobile() {
    return window.innerWidth <= 768;
}

// Throttle para optimizar eventos de scroll
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Debounce para optimizar eventos de resize
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// ===== EVENTOS GLOBALES ===== //

// Optimizar scroll events
window.addEventListener('scroll', throttle(function() {
    // Aquí puedes agregar funcionalidades adicionales de scroll
}, 100));

// Optimizar resize events
window.addEventListener('resize', debounce(function() {
    // Reajustar elementos si es necesario
    AOS.refresh();
}, 250));

// Manejo de errores globales
window.addEventListener('error', function(e) {
    console.error('Error capturado:', e.error);
    // Aquí podrías enviar errores a un servicio de logging
});

// ===== INICIALIZACIÓN FINAL ===== //
// Configurar validación de formularios cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    setupFormValidation();
});

// Preloader (opcional)
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 300);
    }
});

