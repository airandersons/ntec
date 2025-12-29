// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.querySelector('.main-nav ul');

mobileMenuBtn.addEventListener('click', () => {
    mainNav.style.display = mainNav.style.display === 'flex' ? 'none' : 'flex';
    mainNav.style.flexDirection = 'column';
    mainNav.style.position = 'absolute';
    mainNav.style.top = '100%';
    mainNav.style.right = '0';
    mainNav.style.backgroundColor = 'white';
    mainNav.style.padding = '1rem';
    mainNav.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
    mainNav.style.borderRadius = '8px';
    mainNav.style.width = '200px';
    mainNav.style.gap = '1rem';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
    if (!mainNav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
        if (window.innerWidth <= 768) {
            mainNav.style.display = 'none';
        }
    }
});

// Update window reflections on scroll for dynamic effect
window.addEventListener('scroll', () => {
    const reflections = document.querySelector('.window-reflections');
    const scrollPosition = window.scrollY;
    
    // Adjust reflection position based on scroll
    reflections.style.transform = `skew(-10deg) translateY(${scrollPosition * 0.05}px)`;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (window.innerWidth <= 768) {
                mainNav.style.display = 'none';
            }
        }
    });
});

// Update live indicator with next service time
function updateNextServiceTime() {
    const now = new Date();
    const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const hour = now.getHours();
    
    let nextService = "Sunday at 9:00 AM";
    
    // If today is Sunday and it's before 9 AM
    if (day === 0 && hour < 9) {
        nextService = "Today at 9:00 AM";
    }
    // If today is Sunday and it's between 9 AM and 11:30 AM
    else if (day === 0 && hour >= 9 && hour < 11.5) {
        nextService = "Live Now!";
    }
    
    const liveIndicator = document.querySelector('.live-indicator span');
    if (liveIndicator) {
        liveIndicator.textContent = `Live ${nextService}`;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    updateNextServiceTime();
    
    // Add animation to time cards on load
    const timeCards = document.querySelectorAll('.time-card');
    timeCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('fade-in');
    });
});
