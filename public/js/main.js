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
            
            // Simulate processing
            const submitButton = launchForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Setting Up...';
            submitButton.classList.add('processing');
            
            // Show progress steps
            const stepMessages = [
                'Connecting to WhatsApp...',
                'Setting up your agent...',
                'Almost done...'
            ];
            
            let currentStep = 0;
            
            const progressInterval = setInterval(() => {
                if (currentStep < stepMessages.length) {
                    showFormMessage(stepMessages[currentStep], 'progress');
                    currentStep++;
                } else {
                    clearInterval(progressInterval);
                    
                    // Show success and transform the form
                    setTimeout(() => {
                        // Reset form
                        launchForm.reset();
                        
                        // Transform the form into success message
                        transformFormToSuccess(launchForm, email);
                        
                        // Reset button
                        submitButton.disabled = false;
                        submitButton.textContent = originalButtonText;
                        submitButton.classList.remove('processing');
                    }, 1000);
                }
            }, 800);
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
        messageElement.classList.add(`form-${type}`);
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
    
    // Transform form to success confirmation
    function transformFormToSuccess(form, email) {
        // Hide form elements
        const formElements = form.querySelectorAll('input, button, .form-note, .form-message');
        formElements.forEach(el => {
            el.style.display = 'none';
        });
        
        // Change form title
        const formTitle = form.querySelector('h3');
        formTitle.textContent = 'Your Smart WhatsApp is Ready!';
        
        // Create success container
        const successContainer = document.createElement('div');
        successContainer.classList.add('success-container');
        
        // Create checkmark
        const checkmark = document.createElement('div');
        checkmark.classList.add('checkmark');
        checkmark.innerHTML = '<svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="25" fill="none"/><path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>';
        
        // Create success message
        const message = document.createElement('p');
        message.classList.add('success-message');
        message.innerHTML = `We've sent access instructions to <strong>${email}</strong>. Check your inbox to get started!`;
        
        // Add everything to the container
        successContainer.appendChild(checkmark);
        successContainer.appendChild(message);
        
        // Add container to the form
        form.appendChild(successContainer);
        
        // Add animation class
        setTimeout(() => {
            checkmark.classList.add('animate');
        }, 100);
    }
    
    // Add CSS for form animations and success state
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
        .form-progress {
            background-color: #e2f0ff;
            color: #0c5394;
            border: 1px solid #b8daff;
        }
        .processing {
            position: relative;
        }
        .processing::after {
            content: '';
            position: absolute;
            width: 20px;
            height: 20px;
            top: calc(50% - 10px);
            right: 10px;
            border: 2px solid rgba(255,255,255,0.3);
            border-top: 2px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .success-container {
            padding: 20px 0;
            text-align: center;
        }
        .checkmark {
            width: 80px;
            height: 80px;
            margin: 0 auto 20px;
        }
        .checkmark svg {
            width: 100%;
            height: 100%;
            stroke-width: 2;
            stroke: var(--success-color);
            stroke-miterlimit: 10;
            stroke-dasharray: 166;
            stroke-dashoffset: 166;
            fill: none;
        }
        .checkmark.animate svg {
            animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards,
                       scale 0.3s ease-in-out 0.9s both;
        }
        .checkmark.animate svg circle {
            stroke-dasharray: 166;
            stroke-dashoffset: 166;
            stroke-width: 2;
            stroke-miterlimit: 10;
            stroke: var(--success-color);
            fill: none;
            animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }
        .checkmark.animate svg path {
            transform-origin: 50% 50%;
            stroke-dasharray: 48;
            stroke-dashoffset: 48;
            animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
        }
        @keyframes stroke {
            100% { stroke-dashoffset: 0; }
        }
        @keyframes scale {
            0%, 100% { transform: none; }
            50% { transform: scale3d(1.1, 1.1, 1); }
        }
        .success-message {
            font-size: 1rem;
            color: var(--dark-color);
        }
    `;
    document.head.appendChild(style);
    
    // Mobile navigation toggle (if we add it later)
    // For now, the navigation is simple enough to not require a mobile toggle
}); 