// ===================================
// AEGIS TRAVEL - MAIN JAVASCRIPT
// Smart Tourist Safety System
// ===================================

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navButtons = document.querySelector('.nav-buttons');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        navButtons.classList.toggle('active');
    });
}

// Counter Animation
const counters = document.querySelectorAll('.counter');
const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps
    let current = 0;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target;
        }
    };

    updateCounter();
};

// Intersection Observer for Counter Animation
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            if (!counter.classList.contains('counted')) {
                animateCounter(counter);
                counter.classList.add('counted');
            }
        }
    });
}, observerOptions);

counters.forEach(counter => {
    observer.observe(counter);
});

// Card Animations on Scroll
const cards = document.querySelectorAll('.feature-card, .innovation-card, .problem-card');

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `all 0.6s ease ${index * 0.1}s`;
    cardObserver.observe(card);
});

// Form Submission Handler
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Floating Cards Animation
const floatingCards = document.querySelectorAll('.floating-card');
floatingCards.forEach((card, index) => {
    setInterval(() => {
        card.style.transform = `translateY(${Math.sin(Date.now() / 1000 + index) * 10}px)`;
    }, 50);
});

// Loading Animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Feature Link Hover Effect
const featureLinks = document.querySelectorAll('.feature-link');
featureLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.color = 'var(--primary-dark)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.color = 'var(--primary)';
    });
});

// Console Welcome Message
console.log('%c🛡️ Aegis Travel - Smart Tourist Safety System', 
    'color: #6366f1; font-size: 20px; font-weight: bold;');
console.log('%cProtecting tourists with AI, Blockchain, and Geo-Fencing', 
    'color: #8b5cf6; font-size: 14px;');

// Lazy Loading for Images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Accessibility: Focus Management
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Dynamic Year in Footer
const yearElements = document.querySelectorAll('.current-year');
yearElements.forEach(el => {
    el.textContent = new Date().getFullYear();
});
