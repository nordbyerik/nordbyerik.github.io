// Bauhaus-inspired website for Megan Dranow - JavaScript functionality

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a, .hero a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Only process internal links
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Offset for fixed header
                    const headerOffset = 100;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // In a real application, you would send this data to a server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            const formGroups = document.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                group.style.display = 'none';
            });
            
            const submitBtn = document.querySelector('.submit-btn');
            submitBtn.style.display = 'none';
            
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <h3>Thank you, ${name}!</h3>
                <p>Your message has been sent successfully. I'll get back to you soon.</p>
                <button class="reset-btn">Send Another Message</button>
            `;
            
            contactForm.appendChild(successMessage);
            
            // Reset form functionality
            const resetBtn = document.querySelector('.reset-btn');
            if (resetBtn) {
                resetBtn.addEventListener('click', function() {
                    // Clear form fields
                    contactForm.reset();
                    
                    // Remove success message
                    successMessage.remove();
                    
                    // Show form elements again
                    formGroups.forEach(group => {
                        group.style.display = 'block';
                    });
                    submitBtn.style.display = 'block';
                });
            }
        });
    }
    
    // Animate Bauhaus elements on scroll
    function animateBauhausElements() {
        // Geometric shapes in hero section
        const shapes = document.querySelectorAll('.geometric-shape');
        const scrollPosition = window.scrollY;
        
        shapes.forEach((shape, index) => {
            // Different parallax effect for each shape
            const speed = 0.1 * (index + 1);
            const movement = scrollPosition * speed;
            
            if (shape.classList.contains('circle')) {
                shape.style.transform = `translateX(${movement}px) rotate(${movement / 10}deg)`;
            } else if (shape.classList.contains('square')) {
                shape.style.transform = `translateX(-${movement}px) rotate(-${movement / 15}deg)`;
            } else if (shape.classList.contains('triangle')) {
                shape.style.transform = `translateY(-${movement / 2}px) rotate(${movement / 20}deg)`;
            }
        });
        
        // Grid items in education section
        const gridItems = document.querySelectorAll('.grid-item');
        const educationSection = document.querySelector('.education');
        
        if (educationSection) {
            const educationPosition = educationSection.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (educationPosition < windowHeight * 0.75) {
                gridItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.transform = 'scale(1.1)';
                        setTimeout(() => {
                            item.style.transform = 'scale(1)';
                        }, 300);
                    }, index * 150);
                });
            }
        }
    }
    
    // Initial animation
    setTimeout(() => {
        const shapes = document.querySelectorAll('.geometric-shape');
        shapes.forEach(shape => {
            shape.style.transition = 'transform 0.8s ease-out';
            shape.style.transform = 'translateY(0) rotate(0)';
            shape.style.opacity = '0.8';
        });
    }, 300);
    
    // Listen for scroll events
    window.addEventListener('scroll', function() {
        animateBauhausElements();
    });
    
    // Add hover effects to experience items
    const experienceItems = document.querySelectorAll('.experience-item');
    
    experienceItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const beforeElement = window.getComputedStyle(item, '::before');
            const backgroundColor = beforeElement.backgroundColor;
            
            item.style.borderLeft = `5px solid ${backgroundColor}`;
            item.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            item.style.borderLeft = 'none';
            item.style.transform = 'translateY(0)';
        });
    });
    
    // Add animation to location list items
    const locationItems = document.querySelectorAll('.location-list li');
    
    locationItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const beforeElement = window.getComputedStyle(item, '::before');
            const backgroundColor = beforeElement.backgroundColor;
            
            item.style.backgroundColor = backgroundColor;
            item.style.color = '#FFFFFF';
        });
        
        item.addEventListener('mouseleave', function() {
            item.style.backgroundColor = '';
            item.style.color = '';
        });
    });
});
