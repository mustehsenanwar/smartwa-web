document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Offset for fixed header
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Form submission handling
    const launchForm = document.getElementById('launch-notify-form');
    
    if (launchForm) {
        launchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = document.getElementById('email');
            const email = emailInput.value.trim();
            
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Here you would typically send the data to your backend
            // For demo purposes, we'll just simulate a successful submission
            
            // Simulate processing
            const submitButton = launchForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Processing...';
            
            setTimeout(() => {
                // Reset form
                launchForm.reset();
                
                // Show success message
                showFormMessage('Thank you! We\'ll notify you when we launch.', 'success');
                
                // Reset button
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }, 1500);
        });
    }
    
    // Validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show form message
    function showFormMessage(message, type) {
        // Remove any existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create message element
        const messageElement = document.createElement('p');
        messageElement.classList.add('form-message');
        messageElement.classList.add(type === 'error' ? 'form-error' : 'form-success');
        messageElement.textContent = message;
        
        // Add message to form
        const formGroup = document.querySelector('.form-group');
        formGroup.parentNode.insertBefore(messageElement, formGroup.nextSibling);
        
        // Auto-remove success message after 5 seconds
        if (type === 'success') {
            setTimeout(() => {
                messageElement.remove();
            }, 5000);
        }
    }
    
    // Add CSS for form message types
    const style = document.createElement('style');
    style.textContent = `
        .form-message {
            margin-top: 10px;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 0.9rem;
        }
        .form-error {
            background-color: #f8d7da;
            color: #721c24;
            border: 1px solid #f5c6cb;
        }
        .form-success {
            background-color: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
        }
    `;
    document.head.appendChild(style);
    
    // Mobile navigation toggle (if we add it later)
    // For now, the navigation is simple enough to not require a mobile toggle
}); 