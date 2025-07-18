 
// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all elements that need animation
document.addEventListener('DOMContentLoaded', () => {
    // Observe bento items
    const bentoItems = document.querySelectorAll('.bento-item');
    bentoItems.forEach(item => observer.observe(item));

    // Smooth scroll for navigation links
    const navLinksAll = document.querySelectorAll('a[href^="#"]');
    navLinksAll.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Parallax effect for floating avatars
    const avatars = document.querySelectorAll('.floating-avatar');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        avatars.forEach((avatar, index) => {
            const speed = 0.5 + (index * 0.1);
            avatar.style.transform = `translateY(${rate * speed}px)`;
        });
    });

    // Button click handlers
    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add hover effects for bento items
    const bentoItemsAll = document.querySelectorAll('.bento-item');
    bentoItemsAll.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-8px)';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });

    // Advanced rust animation for 'The Old Way' letters
    const rustLetters = document.querySelectorAll('.rust-letters span');
    rustLetters.forEach((letter, i) => {
        // Randomize animation delay and add a class for CSS targeting
        const delay = Math.random() * 1.5 + 0.2;
        letter.style.animation = `rustLetter 2.5s ${delay}s infinite alternate`;
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .btn-primary {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Add scroll progress indicator
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    scrollProgress.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: var(--gradient-primary);
        z-index: 1001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        scrollProgress.style.width = scrollPercent + '%';
    });

    // Add floating particles background
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    document.body.appendChild(particlesContainer);

    // Create floating particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 12px;
            height: 12px;
            background: var(--primary-color);
            border-radius: 50%;
            opacity: 0.1;
            animation: float-particle ${5 + Math.random() * 10}s linear infinite;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        particlesContainer.appendChild(particle);
    }

    // Add particle animation
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes float-particle {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.1;
            }
            90% {
                opacity: 0.1;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);

    // --- Beta Access Logic ---
    const enterCodeBtn = document.getElementById('enterCode');
    const accessCodeInput = document.getElementById('accessCode');
    const errorMessage = document.getElementById('errorMessage');
    const betaPopup = document.getElementById('betaPopup');
    const closePopupBtn = document.getElementById('closePopup');
    const betaForm = document.getElementById('betaForm');
    const successMessage = document.getElementById('successMessage');
    const closeSuccessBtn = document.getElementById('closeSuccess');

    // Show error on any code entry
    if (enterCodeBtn && accessCodeInput && errorMessage) {
        enterCodeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            errorMessage.style.display = 'block';
            accessCodeInput.classList.remove('shake');
            void accessCodeInput.offsetWidth; // force reflow
            accessCodeInput.classList.add('shake');
            setTimeout(() => accessCodeInput.classList.remove('shake'), 400);
        });
        accessCodeInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                errorMessage.style.display = 'block';
                accessCodeInput.classList.remove('shake');
                void accessCodeInput.offsetWidth;
                accessCodeInput.classList.add('shake');
                setTimeout(() => accessCodeInput.classList.remove('shake'), 400);
            }
        });
    }

    // Open popup
    if (betaPopup) {
        const requestAccessBtn = document.getElementById('requestAccess');
        if (requestAccessBtn) {
            requestAccessBtn.addEventListener('click', function() {
                betaPopup.style.display = 'flex';
            });
        }
    }

    // Close popup
    if (betaPopup) {
        const closePopupBtn = document.getElementById('closePopup');
        if (closePopupBtn) {
            closePopupBtn.addEventListener('click', function() {
                betaPopup.style.display = 'none';
            });
        }
    }

    // Handle form submission
    if (betaForm && betaPopup && successMessage) {
        betaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            betaPopup.style.display = 'none';
            successMessage.style.display = 'flex';
        });
    }

    // Close success message
    if (closeSuccessBtn && successMessage) {
        closeSuccessBtn.addEventListener('click', function() {
            successMessage.style.display = 'none';
        });
    }

    // --- Custom Waitlist Scroll with Arrow Animation ---
    const footerWaitlistBtn = document.getElementById('footerWaitlistBtn');
    const requestAccessBtn = document.getElementById('requestAccess');

    if (footerWaitlistBtn && requestAccessBtn) {
        footerWaitlistBtn.addEventListener('click', () => {
            // Create arrow element
            let arrow = document.createElement('div');
            arrow.innerHTML = '⬆️';
            arrow.style.position = 'fixed';
            arrow.style.left = (footerWaitlistBtn.getBoundingClientRect().left + footerWaitlistBtn.offsetWidth / 2 - 16) + 'px';
            arrow.style.top = (footerWaitlistBtn.getBoundingClientRect().top - 40) + 'px';
            arrow.style.fontSize = '2.5rem';
            arrow.style.zIndex = '2000';
            arrow.style.transition = 'top 1s cubic-bezier(0.4, 0, 0.2, 1)';
            arrow.style.pointerEvents = 'none';
            document.body.appendChild(arrow);

            // Animate arrow upward
            setTimeout(() => {
                const targetRect = requestAccessBtn.getBoundingClientRect();
                arrow.style.top = (window.scrollY + targetRect.top - 60) + 'px';
            }, 10);

            // Smooth scroll to Request Access button
            setTimeout(() => {
                requestAccessBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 200);

            // Remove arrow after animation
            setTimeout(() => {
                arrow.remove();
            }, 1200);
        });
    }
});

// Add window resize handler for responsive design
window.addEventListener('resize', () => {
    // Recalculate any dynamic layouts if needed
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Handle escape key if needed
    }
});

// Performance optimization: Throttle scroll events
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

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Scroll-based animations can go here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler); 

// Add CSS for advanced rust letter animation
const rustLetterStyle = document.createElement('style');
rustLetterStyle.textContent = `
@keyframes rustLetter {
  0% {
    color: #1A1A1A;
    opacity: 1;
    filter: none;
    transform: none;
    text-shadow: none;
  }
  30% {
    color: #b87333;
    opacity: 0.9;
    filter: blur(0.5px);
    transform: translateY(0px) scale(1.01) rotate(-1deg);
    text-shadow: 0 2px 8px #b87333;
  }
  60% {
    color: #a0522d;
    opacity: 0.7;
    filter: blur(1px);
    transform: translateY(1px) scale(0.98) rotate(1deg);
    text-shadow: 0 4px 16px #a0522d;
  }
  80% {
    color: #8b5c2a;
    opacity: 0.5;
    filter: blur(1.5px);
    transform: translateY(2px) scale(0.97) rotate(-2deg);
    text-shadow: 0 6px 24px #8b5c2a;
  }
  100% {
    color: #7c482b;
    opacity: 0.3;
    filter: blur(2px);
    transform: translateY(3px) scale(0.95) rotate(2deg);
    text-shadow: 0 8px 32px #7c482b;
  }
}
`;
document.head.appendChild(rustLetterStyle); 