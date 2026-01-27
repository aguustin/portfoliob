// ==================== LANGUAGE SWITCHING ====================
function changeToSpanish() {
    document.getElementById("english").style.display = "none";
    document.getElementById("spanish").style.display = "block";
    
    // Update active state
    const spanishBtns = document.querySelectorAll('[onclick="changeToSpanish()"]');
    const englishBtns = document.querySelectorAll('[onclick="changeToEnglish()"]');
    
    spanishBtns.forEach(btn => btn.classList.add('active'));
    englishBtns.forEach(btn => btn.classList.remove('active'));
}

function changeToEnglish() {
    document.getElementById("spanish").style.display = "none";
    document.getElementById("english").style.display = "block";
    
    // Update active state
    const spanishBtns = document.querySelectorAll('[onclick="changeToSpanish()"]');
    const englishBtns = document.querySelectorAll('[onclick="changeToEnglish()"]');
    
    spanishBtns.forEach(btn => btn.classList.remove('active'));
    englishBtns.forEach(btn => btn.classList.add('active'));
}

// ==================== SMOOTH SCROLLING ====================
function setupSmoothScroll(language) {
    const suffix = language === 'spanish' ? '' : 'B';
    
    const buttons = {
        agustin: document.getElementById(`agustinS${suffix}`),
        aboutme: document.getElementById(`aboutmeS${suffix}`),
        portfolio: document.getElementById(`portfolioS${suffix}`),
        education: document.getElementById(`educationS${suffix}`),
        skills: document.getElementById(`skillsS${suffix}`),
        contact: document.getElementById(`contactS${suffix}`)
    };
    
    const sections = {
        agustin: document.getElementById(`info${suffix}`),
        aboutme: document.getElementById(`aboutme-container${suffix}`),
        portfolio: document.getElementById(`portfolio-container${suffix}`),
        education: document.getElementById(`education-container${suffix}`),
        skills: document.getElementById(`skills-container${suffix}`),
        contact: document.getElementById(`contact-container${suffix}`)
    };
    
    // Add click event listeners
    Object.keys(buttons).forEach(key => {
        if (buttons[key] && sections[key]) {
            buttons[key].addEventListener('click', () => {
                sections[key].scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    toggleMobileMenu(false);
                }
                
                // Add active state to button
                Object.values(buttons).forEach(btn => btn?.classList.remove('active'));
                buttons[key]?.classList.add('active');
            });
        }
    });
}

// Setup for both languages
setupSmoothScroll('spanish');
setupSmoothScroll('english');

// ==================== MOBILE MENU TOGGLE ====================
function toggleMobileMenu(forceState) {
    const menu = document.querySelector('.shortcuts-container');
    const toggleBtn = document.getElementById('more');
    
    if (forceState !== undefined) {
        if (forceState) {
            menu.classList.add('active');
        } else {
            menu.classList.remove('active');
        }
    } else {
        menu.classList.toggle('active');
    }
}

// Add click event to menu toggle button
document.getElementById('more')?.addEventListener('click', () => {
    toggleMobileMenu();
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const menu = document.querySelector('.shortcuts-container');
    const toggleBtn = document.getElementById('more');
    
    if (window.innerWidth <= 768 && 
        menu.classList.contains('active') && 
        !menu.contains(e.target) && 
        e.target !== toggleBtn &&
        !toggleBtn.contains(e.target)) {
        toggleMobileMenu(false);
    }
});

// ==================== SCROLL ANIMATIONS ====================
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function handleScrollAnimations() {
    const animatedElements = document.querySelectorAll('.card-project, .certify-card, .skill-item, .contact-card');
    
    animatedElements.forEach((el, index) => {
        if (isElementInViewport(el)) {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 50);
        }
    });
}

// Initial setup for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.card-project, .certify-card, .skill-item, .contact-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });
});

window.addEventListener('scroll', handleScrollAnimations);
window.addEventListener('load', handleScrollAnimations);

// ==================== ACTIVE SECTION HIGHLIGHTING ====================
function highlightActiveSection() {
    const sections = document.querySelectorAll('[id$="-container"], #info, #infoB');
    const navButtons = document.querySelectorAll('.nav-btn');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navButtons.forEach(btn => {
        btn.classList.remove('active');
        const btnId = btn.getAttribute('id');
        
        // Match button to section
        if (current.includes('portfolio') && btnId.includes('portfolio')) {
            btn.classList.add('active');
        } else if (current.includes('info') && btnId.includes('agustin')) {
            btn.classList.add('active');
        } else if (current.includes('aboutme') && btnId.includes('aboutme')) {
            btn.classList.add('active');
        } else if (current.includes('education') && btnId.includes('education')) {
            btn.classList.add('active');
        } else if (current.includes('skills') && btnId.includes('skills')) {
            btn.classList.add('active');
        } else if (current.includes('contact') && btnId.includes('contact')) {
            btn.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// ==================== RESPONSIVE ADJUSTMENTS ====================
function handleResize() {
    const width = window.innerWidth;
    
    // Close mobile menu on resize to desktop
    if (width > 768) {
        toggleMobileMenu(false);
    }
}

window.addEventListener('resize', handleResize);

// ==================== KEYBOARD NAVIGATION ====================
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape') {
        toggleMobileMenu(false);
    }
});

// ==================== PERFORMANCE OPTIMIZATIONS ====================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handlers
const debouncedScrollHandler = debounce(() => {
    handleScrollAnimations();
    highlightActiveSection();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// ==================== LOADING ANIMATION ====================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// ==================== GLITCH EFFECT ON HOVER ====================
document.querySelectorAll('.glitch').forEach(element => {
    element.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = 'glitch 0.3s';
        }, 10);
    });
});

// ==================== PROJECT CARD ENHANCEMENTS ====================
document.querySelectorAll('.card-project').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
    });
});

// ==================== CONSOLE EASTER EGG ====================
console.log('%c¡Hola! 👋', 'color: #008f00; font-size: 24px; font-weight: bold;');
console.log('%cGracias por revisar mi portfolio', 'color: #2e2299; font-size: 16px;');
console.log('%c¿Interesado en trabajar juntos? Contáctame!', 'color: #008f00; font-size: 14px;');
console.log('%cagustin.molee@gmail.com', 'color: #4a38ec; font-size: 14px; font-weight: bold;');

// ==================== PRELOAD CRITICAL IMAGES ====================
function preloadImages() {
    const images = [
        'port_profile.png',
        'instagram.png',
        'facebook.png',
        'linkedin.png'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

window.addEventListener('load', preloadImages);