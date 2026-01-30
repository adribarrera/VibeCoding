document.addEventListener('DOMContentLoaded', () => {
    
    // Custom Cursor Logic
    const cursor = document.querySelector('.cursor-glow');
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before element is fully in view
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // If the element has numbers to animate
                if (entry.target.querySelector('.number')) {
                    animateNumbers(entry.target);
                }
                
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.fade-in, .fade-in-up, .slide-in-left, .slide-in-right, .scale-in');
    hiddenElements.forEach((el) => observer.observe(el));


    // Parallax Effect for Hero Car
    const heroSection = document.querySelector('.section-hero');
    const heroCar = document.querySelector('.hero-car');
    
    if (heroSection && heroCar) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth - e.pageX * 2) / 100;
            const y = (window.innerHeight - e.pageY * 2) / 100;
            
            heroCar.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    }
    
    // Basic tilt effect for cards
    const cards = document.querySelectorAll('.hover-tilt');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate rotation based on cursor position relative to center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg
            const rotateY = ((x - centerX) / centerX) * 5; 

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.addEventListener('mouseleave', () => {
             card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    // Number Counter Animation
    function animateNumbers(section) {
        const numbers = section.querySelectorAll('.number');
        numbers.forEach(num => {
            const target = +num.getAttribute('data-target');
            const duration = 2000; // 2 seconds
            const increment = target / (duration / 16); // 60fps
            
            let current = 0;
            const updateCount = () => {
                current += increment;
                if (current < target) {
                    num.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCount);
                } else {
                    num.innerText = target;
                }
            };
            updateCount();
        });
    }

    // Scroll to anchor smooth (already in CSS, but fallback/enhanced)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
