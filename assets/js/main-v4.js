/* Villa Azaitu V4 - Cinematic Animations */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// ===== LENIS SMOOTH SCROLL =====
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Connect Lenis to GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// ===== CUSTOM CURSOR =====
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
        dotX += (mouseX - dotX) * 0.5;
        dotY += (mouseY - dotY) * 0.5;
        dot.style.left = dotX + 'px';
        dot.style.top = dotY + 'px';

        circleX += (mouseX - circleX) * 0.12;
        circleY += (mouseY - circleY) * 0.12;
        circle.style.left = circleX + 'px';
        circle.style.top = circleY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .gallery-item, .space-panel, .btn-magnetic');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// ===== NAVIGATION =====
const navToggle = document.getElementById('navToggle');
const navOverlay = document.getElementById('navOverlay');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navOverlay.classList.toggle('active');
    navToggle.textContent = navOverlay.classList.contains('active') ? 'Fermer' : 'Menu';
});

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        navOverlay.classList.remove('active');
        navToggle.textContent = 'Menu';

        if (target) {
            lenis.scrollTo(target, { offset: -50 });
        }
    });
});

// ===== SPLIT TEXT ANIMATION =====
function splitTextIntoWords(element) {
    const text = element.textContent;
    const words = text.split(' ');
    element.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
    return element.querySelectorAll('.word');
}

// Apply to statement text
const statementText = document.querySelector('.statement-text');
if (statementText) {
    const words = splitTextIntoWords(statementText);

    ScrollTrigger.create({
        trigger: '.statement',
        start: 'top 80%',
        onEnter: () => {
            words.forEach((word, i) => {
                setTimeout(() => {
                    word.classList.add('visible');
                }, i * 80);
            });
        }
    });
}

// ===== IMAGE REVEAL ANIMATIONS =====
const imageReveals = document.querySelectorAll('.image-reveal');
imageReveals.forEach(reveal => {
    ScrollTrigger.create({
        trigger: reveal,
        start: 'top 75%',
        onEnter: () => reveal.classList.add('visible')
    });
});

// ===== HORIZONTAL GALLERY =====
const galleryTrack = document.querySelector('.gallery-track');
const gallerySection = document.querySelector('.gallery');
const galleryProgressBar = document.querySelector('.gallery-progress-bar');

if (galleryTrack && gallerySection) {
    const galleryItems = galleryTrack.querySelectorAll('.gallery-item');
    const totalWidth = galleryTrack.scrollWidth - window.innerWidth + 100;

    gsap.to(galleryTrack, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
            trigger: gallerySection,
            start: 'top top',
            end: () => `+=${totalWidth}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            onUpdate: (self) => {
                if (galleryProgressBar) {
                    galleryProgressBar.style.width = `${self.progress * 100}%`;
                }
            }
        }
    });
}

// ===== QUOTE PARALLAX =====
const quoteLayer = document.querySelector('.quote-layer-back img');
if (quoteLayer) {
    gsap.to(quoteLayer, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
            trigger: '.quote',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
}

// ===== SPACE PANELS ANIMATION =====
const spacePanels = document.querySelectorAll('.space-panel');
spacePanels.forEach((panel, index) => {
    gsap.from(panel, {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: panel,
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });

    // Watermark parallax
    const watermark = panel.querySelector('.space-watermark');
    if (watermark) {
        gsap.to(watermark, {
            yPercent: -20,
            ease: 'none',
            scrollTrigger: {
                trigger: panel,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    }
});

// ===== JOURNEY ANIMATION =====
const journeyStops = document.querySelectorAll('.journey-stop');
const journeyPath = document.querySelector('.journey-line-path');

if (journeyPath) {
    ScrollTrigger.create({
        trigger: '.journey',
        start: 'top 60%',
        onEnter: () => {
            journeyPath.classList.add('visible');
        }
    });
}

journeyStops.forEach((stop, i) => {
    ScrollTrigger.create({
        trigger: stop,
        start: 'top 80%',
        onEnter: () => {
            setTimeout(() => {
                stop.classList.add('visible');
            }, i * 200);
        }
    });
});

// ===== STAT COUNTER =====
const stats = document.querySelectorAll('.stat-number');
stats.forEach(stat => {
    const value = stat.textContent;

    if (!isNaN(parseInt(value))) {
        const end = parseInt(value);

        ScrollTrigger.create({
            trigger: stat,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.to({ val: 0 }, {
                    val: end,
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: function() {
                        stat.textContent = Math.round(this.targets()[0].val);
                    }
                });
            }
        });
    }
});

// ===== MAGNETIC BUTTONS =====
const magneticBtns = document.querySelectorAll('.btn-magnetic');
magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.4,
            ease: 'power2.out'
        });
    });

    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.4,
            ease: 'elastic.out(1, 0.5)'
        });
    });
});

// ===== DISCOVER BG TEXT PARALLAX =====
const discoverBgText = document.querySelector('.discover-bg-text');
if (discoverBgText) {
    gsap.to(discoverBgText, {
        xPercent: -10,
        ease: 'none',
        scrollTrigger: {
            trigger: '.discover',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
}

// ===== CONTACT OVERLAY TEXT =====
const contactOverlay = document.querySelector('.contact-overlay-text');
if (contactOverlay) {
    gsap.from(contactOverlay, {
        yPercent: 50,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 60%',
            toggleActions: 'play none none none'
        }
    });
}

// ===== FOOTER ANIMATION =====
gsap.from('.footer-content > *', {
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: {
        trigger: '.footer',
        start: 'top 90%',
        toggleActions: 'play none none none'
    }
});

// ===== SECTION TITLES ANIMATION =====
const sectionTitles = document.querySelectorAll('.section-title');
sectionTitles.forEach(title => {
    gsap.from(title, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
            trigger: title,
            start: 'top 85%',
            toggleActions: 'play none none none'
        }
    });
});

// ===== SECTION NUMBERS ANIMATION =====
const sectionNumbers = document.querySelectorAll('.section-number');
sectionNumbers.forEach(num => {
    gsap.from(num, {
        x: -30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: num,
            start: 'top 90%',
            toggleActions: 'play none none none'
        }
    });
});

// ===== SMOOTH ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                lenis.scrollTo(target, { offset: -50 });
            }
        }
    });
});

// ===== REFRESH SCROLLTRIGGER ON RESIZE =====
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});

console.log('Villa Azaitu V4 - Loaded');
