// ========================================
// Navigation Functionality
// ========================================

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add scrolled class for styling
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
});

// ========================================
// Back to Top Button
// ========================================

const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// Contact Form Handling
// ========================================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        company: document.getElementById('company').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showFormMessage('Please fill in all required fields.', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showFormMessage('Please enter a valid email address.', 'error');
        return;
    }
    
    // Disable submit button
    const submitButton = contactForm.querySelector('.btn-submit');
    const originalButtonText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<span>Sending...</span>';

    // Determine submission endpoint from form `action` attribute
    const endpoint = contactForm.getAttribute('action') || '';

    // If the action still contains the placeholder, don't attempt a real POST.
    if (!endpoint || endpoint.includes('your-form-id')) {
        // Inform the user how to enable real submissions
        showFormMessage('Please configure the contact form endpoint (set the form `action` to your Formspree or backend URL). Using a demo mode for now.', 'error');
        // restore button after short delay
        setTimeout(() => {
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText;
        }, 1500);
        console.warn('Contact form not sent: set a real endpoint on the form `action` attribute.');
        return;
    }

    // Build FormData and POST to the endpoint (Formspree accepts form-encoded data)
    const payload = new FormData(contactForm);
    // Add values in case inputs are missing names
    if (!payload.has('name')) payload.append('name', formData.name);
    if (!payload.has('email')) payload.append('email', formData.email);
    if (!payload.has('company')) payload.append('company', formData.company);
    if (!payload.has('subject')) payload.append('subject', formData.subject);
    if (!payload.has('message')) payload.append('message', formData.message);

    try {
        const res = await fetch(endpoint, {
            method: 'POST',
            body: payload,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (res.ok) {
            showFormMessage('Thank you for your message! We\'ll get back to you soon.', 'success');
            contactForm.reset();
            // Show thank-you modal if present
            const thankYouModal = document.getElementById('thankYouModal');
            if (thankYouModal) {
                thankYouModal.classList.add('show');
                thankYouModal.setAttribute('aria-hidden', 'false');
                // focus close button for accessibility
                const closeBtn = document.getElementById('thankYouClose');
                if (closeBtn) closeBtn.focus();
            }
        } else {
            const data = await res.json().catch(() => ({}));
            const err = (data && data.error) ? data.error : 'Sorry, there was an error sending your message. Please try again.';
            showFormMessage(err, 'error');
        }
    } catch (err) {
        console.error('Form submission error:', err);
        showFormMessage('Network error — please check your connection and try again.', 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }
});

function showFormMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    
    // Auto-hide success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            formMessage.className = 'form-message';
        }, 5000);
    }
}

// ========================================
// Scroll Animations (Intersection Observer)
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInElements = document.querySelectorAll('.service-card, .testimonial-card, .value-card, .contact-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            // Trigger animation
            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

fadeInElements.forEach(element => {
    observer.observe(element);
});

// ========================================
// Hero Stats Animation
// ========================================

function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '');
            clearInterval(timer);
        } else {
            const suffix = element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '';
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// Animate stats when hero section is in view
const heroStats = document.querySelectorAll('.stat-value');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            
            // Extract numbers and animate
            heroStats.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                stat.textContent = '0' + (text.includes('+') ? '+' : text.includes('%') ? '%' : '');
                animateCounter(stat, number);
            });
            
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    statsObserver.observe(heroSection);
}

// ========================================
// Keyboard Navigation Accessibility
// ========================================

// Add focus visible for keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-navigation');
});

// ========================================
// Handle External Links
// ========================================

document.querySelectorAll('a[href^="http"]').forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
});

// ========================================
// Performance: Preload critical assets
// ========================================

// Add loading="lazy" to images if needed
document.querySelectorAll('img').forEach(img => {
    if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
    }
});

// ========================================
// Page Load Animation
// ========================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Remove loading state if you add a loader
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
});

// ========================================
// Console Message (Optional)
// ========================================

console.log('%c🚀 Alldeon - Integrating Possibilities', 'font-size: 20px; font-weight: bold; color: #0EA5E9;');
console.log('%cWebsite designed and developed for Alldeon', 'font-size: 14px; color: #475569;');
console.log('%cInterested in working with us? Contact: hello@alldeon.com', 'font-size: 12px; color: #94A3B8;');

// Thank-you modal behavior
const thankYouModal = document.getElementById('thankYouModal');
const thankYouClose = document.getElementById('thankYouClose');
const thankYouOk = document.getElementById('thankYouOk');

function closeThankYou() {
    if (thankYouModal) {
        thankYouModal.classList.remove('show');
        thankYouModal.setAttribute('aria-hidden', 'true');
    }
}

if (thankYouClose) thankYouClose.addEventListener('click', closeThankYou);
if (thankYouOk) thankYouOk.addEventListener('click', closeThankYou);

if (thankYouModal) {
    thankYouModal.addEventListener('click', (e) => {
        if (e.target === thankYouModal) closeThankYou();
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeThankYou();
});
