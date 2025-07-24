// Smooth scroll for explore button
const exploreBtn = document.querySelector('.explore-btn');
if (exploreBtn) {
    exploreBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const timelineContainer = document.querySelector('.timeline-container');
        if (timelineContainer) {
            timelineContainer.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}

// Animate elements on scroll
const animateElements = document.querySelectorAll('[data-aos]');

if (animateElements.length > 0) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, { threshold: 0.1 });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
}

// Interactive gallery hover effect
const galleryItems = document.querySelectorAll('.hover-gallery-item');

if (galleryItems.length > 0) {
    galleryItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const x = e.clientX - item.getBoundingClientRect().left;
            const y = e.clientY - item.getBoundingClientRect().top;
            
            item.style.transformOrigin = `${x}px ${y}px`;
        });
    });
} 