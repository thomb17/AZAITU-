/* Villa Azaitu - Galerie Page JavaScript */

document.addEventListener('DOMContentLoaded', () => {

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
        const hoverElements = document.querySelectorAll('a, button, .gallery-item-full, .filter-btn');
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

    // ===== MOBILE MENU =====
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

    // ===== GALLERY FILTERS =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item-full');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            // Filter items
            galleryItems.forEach((item, index) => {
                const category = item.dataset.category;

                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.animationDelay = `${index * 0.05}s`;
                } else {
                    item.classList.add('hidden');
                }
            });

            // Scroll to gallery section
            const gallerySection = document.querySelector('.full-gallery');
            if (gallerySection) {
                const offset = gallerySection.offsetTop - 150;
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
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

    let currentIndex = 0;
    let visibleItems = [];

    function getVisibleItems() {
        return Array.from(galleryItems).filter(item => !item.classList.contains('hidden'));
    }

    function openLightbox(index) {
        visibleItems = getVisibleItems();
        currentIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateLightboxImage() {
        const item = visibleItems[currentIndex];
        if (item) {
            lightboxImage.style.opacity = '0';
            setTimeout(() => {
                lightboxImage.src = item.dataset.src;
                lightboxCaption.textContent = item.dataset.caption;
                lightboxImage.style.opacity = '1';
            }, 150);
        }
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        updateLightboxImage();
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % visibleItems.length;
        updateLightboxImage();
    }

    // Gallery item click
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const visible = getVisibleItems();
            const visibleIndex = visible.indexOf(item);
            openLightbox(visibleIndex);
        });
    });

    // Lightbox controls
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
                nextImage();
            } else {
                prevImage();
            }
        }
    }

    // ===== WHATSAPP BUTTON SCROLL BEHAVIOR =====
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

    // ===== LAZY LOADING IMAGES =====
    const lazyImages = document.querySelectorAll('.gallery-item-full img');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.lazy) {
                        img.src = img.dataset.lazy;
                        img.removeAttribute('data-lazy');
                    }
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ===== LIGHTBOX IMAGE TRANSITION =====
    const style = document.createElement('style');
    style.textContent = `
        .lightbox-image {
            transition: opacity 0.15s ease;
        }
    `;
    document.head.appendChild(style);

    // ===== GSAP SETUP (sans Lenis) =====
    if (typeof gsap !== 'undefined') {

        gsap.registerPlugin(ScrollTrigger);

        // Hero parallax
        const heroImg = document.querySelector('.gallery-hero-bg img');
        if (heroImg) {
            gsap.to(heroImg, {
                yPercent: 20,
                ease: 'none',
                scrollTrigger: {
                    trigger: '.gallery-hero',
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                }
            });
        }

        // Gallery items reveal with stagger
        const galleryItemsFull = gsap.utils.toArray('.gallery-item-full');
        if (galleryItemsFull.length > 0) {
            gsap.set(galleryItemsFull, { opacity: 0, y: 60 });

            ScrollTrigger.batch(galleryItemsFull, {
                onEnter: batch => gsap.to(batch, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.08,
                    duration: 0.8,
                    ease: 'power3.out',
                }),
                start: 'top 90%',
            });
        }

        // Image scale on reveal
        const galleryImages = gsap.utils.toArray('.gallery-item-full img');
        galleryImages.forEach(img => {
            gsap.fromTo(img,
                { scale: 1.15 },
                {
                    scale: 1,
                    duration: 1.2,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: img.closest('.gallery-item-full'),
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    }
                }
            );
        });

        console.log('Galerie - GSAP ScrollTrigger initialized');
    }

    console.log('Villa Azaitu - Galerie loaded with enhancements');
});
