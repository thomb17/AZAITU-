/* Villa Azaitu - Main JavaScript */

document.addEventListener('DOMContentLoaded', () => {

    // ===== PRELOADER & HERO ANIMATION =====
    const preloader = document.getElementById('preloader');
    const hero = document.querySelector('.hero');

    function triggerHeroAnimations() {
        if (hero) {
            hero.classList.add('loaded');
        }
    }

    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('loaded');
                // Déclencher les animations du hero après le preloader
                setTimeout(triggerHeroAnimations, 200);
            }, 1800);
        });

        // Fallback in case load event already fired
        if (document.readyState === 'complete') {
            setTimeout(() => {
                preloader.classList.add('loaded');
                setTimeout(triggerHeroAnimations, 200);
            }, 1800);
        }
    } else {
        // Si pas de preloader, déclencher directement
        setTimeout(triggerHeroAnimations, 300);
    }

    // ===== CUSTOM CURSOR =====
    const customCursor = document.getElementById('customCursor');
    if (customCursor && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        const cursorDot = customCursor.querySelector('.cursor-dot');
        const cursorCircle = customCursor.querySelector('.cursor-circle');

        let mouseX = 0, mouseY = 0;
        let dotX = 0, dotY = 0;
        let circleX = 0, circleY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            // Dot follows quickly
            dotX += (mouseX - dotX) * 0.5;
            dotY += (mouseY - dotY) * 0.5;
            cursorDot.style.left = dotX + 'px';
            cursorDot.style.top = dotY + 'px';

            // Circle follows with delay
            circleX += (mouseX - circleX) * 0.15;
            circleY += (mouseY - circleY) * 0.15;
            cursorCircle.style.left = circleX + 'px';
            cursorCircle.style.top = circleY + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effect on interactive elements
        const hoverElements = document.querySelectorAll('a, button, .gallery-item, .espace-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => customCursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => customCursor.classList.remove('hover'));
        });
    }

    // ===== SCROLL PROGRESS BAR =====
    const scrollProgress = document.getElementById('scrollProgress');
    if (scrollProgress) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            scrollProgress.style.width = progress + '%';
        });
    }

    // Header scroll effect
    const header = document.querySelector('.header');

    function updateHeader() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', updateHeader);
    updateHeader();

    // ===== ACTIVE NAVIGATION STATE =====
    const sections = document.querySelectorAll('section[id]');
    const navLinksDesktop = document.querySelectorAll('.nav-links a:not(.btn-nav)');

    function updateActiveNav() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinksDesktop.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // Mobile menu toggle with animation
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===== LIGHTBOX =====
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    const galleryItems = document.querySelectorAll('.gallery-item[data-src]');

    let currentIndex = 0;
    const galleryData = [];

    // Collect gallery data
    galleryItems.forEach((item, index) => {
        galleryData.push({
            src: item.dataset.src,
            caption: item.dataset.caption
        });

        item.addEventListener('click', () => {
            currentIndex = index;
            openLightbox();
        });
    });

    function openLightbox() {
        lightboxImage.src = galleryData[currentIndex].src;
        lightboxCaption.textContent = galleryData[currentIndex].caption;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + galleryData.length) % galleryData.length;
        updateLightbox();
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % galleryData.length;
        updateLightbox();
    }

    function updateLightbox() {
        lightboxImage.style.opacity = '0';
        setTimeout(() => {
            lightboxImage.src = galleryData[currentIndex].src;
            lightboxCaption.textContent = galleryData[currentIndex].caption;
            lightboxImage.style.opacity = '1';
        }, 150);
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', prevImage);
    lightboxNext.addEventListener('click', nextImage);

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;

        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
    });

    // ===== LIGHTBOX SWIPE GESTURES =====
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextImage(); // Swipe left = next
            } else {
                prevImage(); // Swipe right = prev
            }
        }
    }

    // ===== GALLERY TILT EFFECT =====
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        galleryItems.forEach(item => {
            item.classList.add('tilt');

            item.addEventListener('mousemove', (e) => {
                const rect = item.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                item.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }

    // ===== SCROLL REVEAL ANIMATIONS =====
    const revealElements = document.querySelectorAll(
        '.section-label, .section-title, .intro-text, .stats, .intro-image, ' +
        '.gallery-item, .espace-card, .journey-step, .contact-content, .contact-image'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    // Add revealed class styles
    const style = document.createElement('style');
    style.textContent = `
        .revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        .lightbox-image {
            transition: opacity 0.15s ease;
        }
    `;
    document.head.appendChild(style);

    // Stagger animations
    const galleryItemsAll = document.querySelectorAll('.gallery-item');
    galleryItemsAll.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.08}s`;
    });

    const espaceCards = document.querySelectorAll('.espace-card');
    espaceCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.15}s`;
    });

    const journeySteps = document.querySelectorAll('.journey-step');
    journeySteps.forEach((step, index) => {
        step.style.transitionDelay = `${index * 0.2}s`;
    });

    // ===== STAT COUNTER ANIMATION =====
    const stats = document.querySelectorAll('.stat-number');
    const statsObserved = new Set();

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsObserved.has(entry.target)) {
                statsObserved.add(entry.target);
                const target = entry.target;
                const value = target.textContent.trim();

                if (!isNaN(parseInt(value))) {
                    const end = parseInt(value);
                    const duration = 1500;
                    const startTime = performance.now();

                    function animate(currentTime) {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const easeOut = 1 - Math.pow(1 - progress, 3);
                        const current = Math.round(end * easeOut);

                        target.textContent = current;

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        } else {
                            target.textContent = end;
                        }
                    }

                    target.textContent = '0';
                    requestAnimationFrame(animate);
                }
            }
        });
    }, { threshold: 0.5 });

    stats.forEach(stat => statsObserver.observe(stat));

    // ===== GSAP SETUP (sans Lenis) =====
    if (typeof gsap !== 'undefined') {

        // Register ScrollTrigger
        gsap.registerPlugin(ScrollTrigger);

        // ===== HERO PARALLAX CINÉMATIQUE =====
        const heroLayerBg = document.querySelector('.hero-layer--bg');
        if (heroLayerBg) {
            gsap.to(heroLayerBg, {
                yPercent: 30,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                }
            });
        }

        // Hero scroll fade
        const heroScrollFade = document.querySelector('.hero-scroll-fade');
        if (heroScrollFade) {
            gsap.to(heroScrollFade, {
                opacity: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero',
                    start: 'center top',
                    end: 'bottom top',
                    scrub: true,
                }
            });
        }

        // Hero content fade out on scroll
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            gsap.to(heroContent, {
                opacity: 0,
                y: -50,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.hero',
                    start: '30% top',
                    end: '80% top',
                    scrub: true,
                }
            });
        }

        // ===== IMAGE REVEAL ANIMATIONS =====
        const revealImages = gsap.utils.toArray('.intro-image img, .gallery-item img, .espace-image img');
        revealImages.forEach(img => {
            const parent = img.closest('.intro-image, .gallery-item, .espace-image');
            if (parent) {
                gsap.fromTo(img,
                    { scale: 1.2 },
                    {
                        scale: 1,
                        duration: 1.5,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: parent,
                            start: 'top 80%',
                            toggleActions: 'play none none none',
                        }
                    }
                );
            }
        });

        // ===== STAGGERED SECTION REVEALS =====
        const fadeElements = gsap.utils.toArray('.section-label, .section-title, .intro-text, .stat');
        fadeElements.forEach(el => {
            gsap.from(el, {
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                }
            });
        });

        // Gallery items stagger
        const galleryItems = gsap.utils.toArray('.gallery-item');
        if (galleryItems.length > 0) {
            gsap.from(galleryItems, {
                opacity: 0,
                y: 60,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.gallery-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                }
            });
        }

        // Espace cards stagger
        const espaceCards = gsap.utils.toArray('.espace-card');
        if (espaceCards.length > 0) {
            gsap.from(espaceCards, {
                opacity: 0,
                y: 80,
                stagger: 0.15,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.espaces-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                }
            });
        }

        console.log('GSAP ScrollTrigger initialized');

    } else {
        // Fallback: Basic parallax without GSAP
        const heroImage = document.querySelector('.hero-image');
        if (window.innerWidth > 768 && heroImage) {
            window.addEventListener('scroll', () => {
                const scrolled = window.scrollY;
                const heroHeight = document.querySelector('.hero').offsetHeight;
                if (scrolled < heroHeight) {
                    heroImage.style.transform = `translateY(${scrolled * 0.4}px)`;
                }
            });
        }
    }

    // ===== HIDE WHATSAPP ON SCROLL DOWN, SHOW ON SCROLL UP =====
    const whatsappBtn = document.querySelector('.whatsapp-btn');
    let lastScrollY = window.scrollY;

    if (whatsappBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > lastScrollY && window.scrollY > 300) {
                whatsappBtn.style.transform = 'translateY(100px)';
                whatsappBtn.style.opacity = '0';
            } else {
                whatsappBtn.style.transform = 'translateY(0)';
                whatsappBtn.style.opacity = '1';
            }
            lastScrollY = window.scrollY;
        });

        whatsappBtn.style.transition = 'transform 0.3s ease, opacity 0.3s ease, box-shadow 0.3s ease';
    }

    console.log('Villa Azaitu - Site loaded with cinematic enhancements');
});
