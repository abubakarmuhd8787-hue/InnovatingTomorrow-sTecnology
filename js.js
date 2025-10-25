// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Contact Form Submission with Backend Integration
const contactForms = document.querySelectorAll('#contact-form, #contact-form-page');

contactForms.forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form values
        const name = form.querySelector('#name').value;
        const email = form.querySelector('#email').value;
        const subject = form.querySelector('#subject') ? form.querySelector('#subject').value : '';
        const message = form.querySelector('#message').value;
        
        // Disable submit button during submission
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        try {
            const response = await fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, subject, message })
            });
            
            const result = await response.json();
            
            if (result.success) {
                alert(result.message);
                form.reset();
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while sending your message. Please try again.');
        } finally {
            // Re-enable submit button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close all other FAQ items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const totalTestimonials = testimonials.length;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        if (i === index) {
            testimonial.style.display = 'block';
        } else {
            testimonial.style.display = 'none';
        }
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
    showTestimonial(currentTestimonial);
}

// Initialize testimonial slider
if (testimonials.length > 0) {
    showTestimonial(currentTestimonial);
    
    // Auto-rotate testimonials every 5 seconds
    setInterval(nextTestimonial, 5000);
}

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Animation on Scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .team-member, .value-item, .service-detail');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = 1;
            element.style.transform = 'translateY(0)';
        }
    });
};

// Set initial state for animated elements
document.querySelectorAll('.service-card, .team-member, .value-item, .service-detail').forEach(element => {
    element.style.opacity = 0;
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Listen for scroll events
window.addEventListener('scroll', animateOnScroll);

// Trigger once on load
window.addEventListener('load', animateOnScroll);

// Fetch stats from backend
async function fetchStats() {
    try {
        const response = await fetch('/api/stats');
        const stats = await response.json();
        
        // Update stats on the page
        const statNumbers = document.querySelectorAll('.stat-number');
        if (statNumbers.length >= 4) {
            statNumbers[0].textContent = stats.projects;
            statNumbers[1].textContent = stats.clients;
            statNumbers[2].textContent = stats.satisfaction;
            statNumbers[3].textContent = stats.experience;
        }
    } catch (error) {
        console.error('Error fetching stats:', error);
    }
}

// Call fetchStats when the page loads
document.addEventListener('DOMContentLoaded', fetchStats);

// Newsletter Form Submission with Backend Integration
const newsletterForms = document.querySelectorAll('.newsletter-form');

newsletterForms.forEach(form => {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput.value;
        
        // Disable submit button during submission
        const submitButton = form.querySelector('button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Subscribing...';
        submitButton.disabled = true;
        
        try {
            const response = await fetch('/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            
            const result = await response.json();
            
            if (result.success) {
                alert(result.message);
                form.reset();
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while subscribing. Please try again.');
        } finally {
            // Re-enable submit button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
});