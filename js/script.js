document.addEventListener('DOMContentLoaded', function() {
    // Initialize animation observers
    initScrollAnimations();
    
    // Handle form submissions with Web3Forms
    initFormHandlers();
});

// Scroll animations
function initScrollAnimations() {
    // Add fade-in class to elements that should animate on scroll
    const animatableElements = document.querySelectorAll('.feature-card, .step, .problem-card, .solution-card, .section-header');
    animatableElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    // Set up Intersection Observer to trigger animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, {
        root: null, // Use viewport as root
        threshold: 0.1, // Trigger when at least 10% is visible
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element comes into view
    });
    
    // Start observing all fade-in elements
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
    
    // Add staggered animation for list items
    const listContainers = document.querySelectorAll('.feature-list');
    listContainers.forEach(container => {
        const items = container.querySelectorAll('li');
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(10px)';
            item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            item.style.transitionDelay = `${index * 0.1 + 0.2}s`;
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, 100);
        });
    });
}

// Form handling with Web3Forms
function initFormHandlers() {
    const forms = document.querySelectorAll('.signup-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[name="email"]');
            const email = emailInput.value.trim();
            
            if (isValidEmail(email)) {
                // Show loading state
                const submitButton = form.querySelector('button[type="submit"]');
                const originalText = submitButton.textContent;
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                // Get form data
                const formData = new FormData(form);
                
                // Submit the form to Web3Forms
                fetch(form.action, {
                    method: 'POST',
                    body: formData
                })
                .then(response => response.json())
                .then(data => {
                    // Reset form
                    form.reset();
                    
                    // Reset button
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    
                    // Show success message
                    if (data.success) {
                        showSuccessMessage(form, 'Thank you! You\'re on the list.');
                    } else {
                        showErrorMessage(form, data.message || 'Something went wrong. Please try again.');
                    }
                })
                .catch(error => {
                    // Reset button
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    
                    // Show error message
                    showErrorMessage(form, 'Connection error. Please try again.');
                    console.error('Error:', error);
                });
            } else {
                showErrorMessage(form, 'Please enter a valid email address');
            }
        });
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show success message
function showSuccessMessage(form, message) {
    // Remove any existing message
    removeMessages(form);
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'message success-message';
    successMessage.textContent = message;
    
    // Insert after form
    form.parentNode.insertBefore(successMessage, form.nextSibling);
    
    // Remove message after delay
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
}

// Show error message
function showErrorMessage(form, message) {
    // Remove any existing message
    removeMessages(form);
    
    // Create error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'message error-message';
    errorMessage.textContent = message;
    
    // Insert after form
    form.parentNode.insertBefore(errorMessage, form.nextSibling);
    
    // Remove message after delay
    setTimeout(() => {
        errorMessage.remove();
    }, 5000);
}

// Remove existing messages
function removeMessages(form) {
    const messages = form.parentNode.querySelectorAll('.message');
    messages.forEach(message => message.remove());
}

// Add more subtle animations on hero image
const heroImage = document.querySelector('.hero-image img');
if (heroImage) {
    // Slight floating animation on hover
    heroImage.addEventListener('mousemove', (e) => {
        const boundingRect = heroImage.getBoundingClientRect();
        const mouseX = e.clientX - boundingRect.left;
        const mouseY = e.clientY - boundingRect.top;
        
        // Calculate rotation based on mouse position
        const rotateY = ((mouseX / boundingRect.width) - 0.5) * 10;
        const rotateX = ((mouseY / boundingRect.height) - 0.5) * -10;
        
        heroImage.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    // Reset on mouse out
    heroImage.addEventListener('mouseleave', () => {
        heroImage.style.transform = 'perspective(800px) rotateY(-8deg)';
    });
}

// Animated typing effect for the header highlight (optional)
document.addEventListener('mouseover', function(e) {
    if (e.target.closest('.animated-heading')) {
        const highlight = document.querySelector('.animated-heading .highlight');
        if (highlight) {
            highlight.style.transition = 'color 0.3s ease';
            setTimeout(() => {
                highlight.style.color = getComputedStyle(document.documentElement).getPropertyValue('--accent-color');
            }, 150);
            
            setTimeout(() => {
                highlight.style.color = getComputedStyle(document.documentElement).getPropertyValue('--primary-color');
            }, 400);
        }
    }
}); 