// DOM Elements
const sections = document.querySelectorAll('.fade-in-scroll');
const navbar = document.querySelector('.navbar');
const contactForm = document.getElementById('contact-form');

// Scroll Animation Observer
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Sticky Navbar Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 15, 19, 0.8)';
        navbar.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.05)';
        navbar.style.boxShadow = 'none';
    }
});

// Smoth Scroll for Anchor Links (pollyfill-like behavior)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Simple Form Handling
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulating submission
        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;
        
        btn.textContent = 'Sending...';
        btn.disabled = true;
        
        setTimeout(() => {
            btn.textContent = 'Message Sent!';
            btn.style.borderColor = 'var(--accent-primary)';
            btn.style.color = 'var(--accent-primary)';
            
            // Reset form
            setTimeout(() => {
                contactForm.reset();
                btn.textContent = originalText;
                btn.disabled = false;
                btn.style.borderColor = '';
                btn.style.color = '';
            }, 3000);
        }, 1500);
        
        console.log('Form submitted: ', {
            name: contactForm.name.value,
            email: contactForm.email.value,
            message: contactForm.message.value
        });
    });
}
