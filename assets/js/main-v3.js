/* Villa Azaitu - Main JS V3 - Smooth & Fast */

document.addEventListener('DOMContentLoaded', () => {
    // Loader - Ultra fast
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 600);

    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    if (cursor && window.matchMedia('(hover: hover)').matches) {
        const dot = cursor.querySelector('.cursor-dot');
        const circle = cursor.querySelector('.cursor-circle');

        let mouseX = 0, mouseY = 0;
        let dotX = 0, dotY = 0;
        let circleX = 0, circleY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            // Dot follows instantly
            dotX += (mouseX - dotX) * 0.5;
            dotY += (mouseY - dotY) * 0.5;
            dot.style.left = dotX + 'px';
            dot.style.top = dotY + 'px';

            // Circle follows with delay
            circleX += (mouseX - circleX) * 0.15;
            circleY += (mouseY - circleY) * 0.15;
            circle.style.left = circleX + 'px';
            circle.style.top = circleY + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effect
        const hoverElements = document.querySelectorAll('a, button, .gallery-item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // Navigation scroll effect
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;

        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });

    // Mobile nav toggle
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }

    // Scroll animations with Intersection Observer
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.discover-text, .discover-images').forEach(el => {
        observer.observe(el);
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });

    // Parallax effect on scroll (subtle)
    const parallaxElements = document.querySelectorAll('.hero-img, .quote-bg img');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        parallaxElements.forEach(el => {
            const speed = 0.3;
            const rect = el.getBoundingClientRect();

            if (rect.top < window.innerHeight && rect.bottom > 0) {
                el.style.transform = `scale(1.1) translateY(${scrolled * speed}px)`;
            }
        });
    });

    // Gallery hover effects
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            galleryItems.forEach(other => {
                if (other !== item) {
                    other.style.opacity = '0.5';
                }
            });
        });

        item.addEventListener('mouseleave', () => {
            galleryItems.forEach(other => {
                other.style.opacity = '1';
            });
        });
    });

    // Stats counter animation
    const stats = document.querySelectorAll('.stat-num');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const value = target.textContent;

                if (!isNaN(parseInt(value))) {
                    const end = parseInt(value);
                    let current = 0;
                    const duration = 1500;
                    const increment = end / (duration / 16);

                    const counter = setInterval(() => {
                        current += increment;
                        if (current >= end) {
                            target.textContent = end;
                            clearInterval(counter);
                        } else {
                            target.textContent = Math.floor(current);
                        }
                    }, 16);
                }

                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));

    // Room items animation on scroll
    const roomItems = document.querySelectorAll('.room-item');
    const roomObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.2 });

    roomItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(40px)';
        item.style.transition = `all 0.8s cubic-bezier(0.25, 0, 0.15, 1) ${index * 0.1}s`;
        roomObserver.observe(item);
    });

    // Experience steps animation
    const steps = document.querySelectorAll('.step');
    const stepsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.3 });

    steps.forEach((step, index) => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
        step.style.transition = `all 0.6s ease ${index * 0.15}s`;
        stepsObserver.observe(step);
    });
});
