// Smooth scroll for explore button
    document.querySelector('.explore-btn').addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelector('.timeline-container').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    // Animate elements on scroll
    const animateElements = document.querySelectorAll('[data-aos]');
    
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
    
    // Interactive gallery hover effect
    const galleryItems = document.querySelectorAll('.hover-gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mousemove', (e) => {
            const x = e.clientX - item.getBoundingClientRect().left;
            const y = e.clientY - item.getBoundingClientRect().top;
            
            item.style.transformOrigin = `${x}px ${y}px`;
        });
    });