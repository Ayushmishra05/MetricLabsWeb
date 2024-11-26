// Loader
document.addEventListener('DOMContentLoaded', () => {
    // Hide loader
    window.addEventListener('load', () => {
        document.querySelector('.loader-wrapper').style.display = 'none';
    });

    // Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Observe elements
    document.querySelectorAll('.team-member').forEach(el => observer.observe(el));

    // Enhanced Sparkle effect
    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        // Random size between 3 and 6 pixels
        const size = Math.random() * 3 + 3;
        sparkle.style.width = `${size}px`;
        sparkle.style.height = `${size}px`;
        
        // Random color variations of purple
        const hue = Math.random() * 30 + 270; // Purple hues
        const lightness = Math.random() * 20 + 50; // Brightness
        sparkle.style.background = `hsl(${hue}, 70%, ${lightness}%)`;
        sparkle.style.boxShadow = `0 0 ${size}px hsl(${hue}, 70%, ${lightness}%)`;
        
        // Position with slight randomization
        sparkle.style.left = x + (Math.random() * 40 - 20) + 'px';
        sparkle.style.top = y + (Math.random() * 40 - 20) + 'px';
        
        document.body.appendChild(sparkle);
        
        // Remove sparkle after animation
        sparkle.addEventListener('animationend', () => sparkle.remove());
    }

    // Create sparkles on mouse move
    let mouseMoveTimeout;
    document.addEventListener('mousemove', (e) => {
        if (mouseMoveTimeout) return;
        mouseMoveTimeout = setTimeout(() => {
            createSparkle(e.clientX, e.clientY);
            mouseMoveTimeout = null;
        }, 50);
    });

    // Create sparkles on scroll
    let scrollTimeout;
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) return;
        
        if (Math.abs(window.scrollY - lastScrollY) > 5) {
            scrollTimeout = setTimeout(() => {
                for (let i = 0; i < 3; i++) {
                    const x = Math.random() * window.innerWidth;
                    const y = Math.random() * window.innerHeight;
                    createSparkle(x, y);
                }
                lastScrollY = window.scrollY;
                scrollTimeout = null;
            }, 50);
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Create sparkles along the scroll path
                const start = window.scrollY;
                const end = target.offsetTop;
                const distance = Math.abs(end - start);
                const sparkleCount = Math.floor(distance / 100); // One sparkle per 100px
                
                for (let i = 0; i < sparkleCount; i++) {
                    setTimeout(() => {
                        const progress = i / sparkleCount;
                        const x = Math.random() * window.innerWidth;
                        const y = start + (end - start) * progress;
                        createSparkle(x, y);
                    }, i * 100);
                }
            }
        });
    });

    // Form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async e => {
            e.preventDefault();
            const form = e.target;
            const data = Object.fromEntries(new FormData(form));
            
            try {
                console.log('Form submitted:', data);
                form.reset();
                
                // Create success sparkles
                for (let i = 0; i < 10; i++) {
                    setTimeout(() => {
                        const x = Math.random() * form.offsetWidth + form.offsetLeft;
                        const y = Math.random() * form.offsetHeight + form.offsetTop;
                        createSparkle(x, y);
                    }, i * 100);
                }
                
                alert('Message sent successfully!');
            } catch (error) {
                console.error('Error:', error);
                alert('Error sending message. Please try again.');
            }
        });
    }
});

// Initialize Swiper
const swiper = new Swiper('.swiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Navbar Animation
const nav = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        nav.style.background = 'rgba(13, 17, 23, 0.8)';
        nav.style.transform = 'translateY(0)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        // Scrolling down
        nav.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        nav.style.transform = 'translateY(0)';
        nav.style.background = 'rgba(13, 17, 23, 0.95)';
    }
    lastScroll = currentScroll;
});

// Animate on Scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            entry.target.style.opacity = 1;
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.about-card, .product-card, .team-member').forEach((el) => {
    el.style.opacity = 0;
    observer.observe(el);
});

// Hero text animation
document.addEventListener('DOMContentLoaded', () => {
    const heroContent = document.querySelector('.hero-content');
    setTimeout(() => {
        heroContent.style.opacity = 1;
        heroContent.style.transform = 'translateY(0)';
    }, 500);
});

// Initialize GSAP and ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0
    });
    
    gsap.to(cursorFollower, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.1
    });
});

// Magnetic Effect
const magneticElements = document.querySelectorAll('.magnetic');

magneticElements.forEach(elem => {
    elem.addEventListener('mousemove', (e) => {
        const rect = elem.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(elem, {
            x: x * 0.2,
            y: y * 0.2,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    elem.addEventListener('mouseleave', () => {
        gsap.to(elem, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: "power2.out"
        });
    });
});

// Split Text Animation
const splitTextElements = document.querySelectorAll('.split-text');

splitTextElements.forEach(elem => {
    const text = elem.textContent;
    elem.textContent = '';
    
    text.split('').forEach(char => {
        const span = document.createElement('span');
        span.textContent = char;
        elem.appendChild(span);
    });

    gsap.from(elem.querySelectorAll('span'), {
        scrollTrigger: {
            trigger: elem,
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.03
    });
});

// Hero Section Parallax
const heroSection = document.querySelector('.hero');
const parallaxLayers = document.querySelectorAll('.parallax-layer');

if (heroSection && parallaxLayers.length) {
    gsap.to(parallaxLayers, {
        scrollTrigger: {
            trigger: heroSection,
            start: "top top",
            end: "bottom top",
            scrub: true
        },
        y: (i, target) => {
            return -(target.dataset.speed || 0.5) * 100;
        }
    });
}

// Product Cards Animation
const productCards = document.querySelectorAll('.product-card');

productCards.forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 50,
        duration: 0.8
    });
});

// Team Members Animation
const teamMembers = document.querySelectorAll('.team-member');

teamMembers.forEach(member => {
    gsap.from(member, {
        scrollTrigger: {
            trigger: member,
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        opacity: 0,
        scale: 0.8,
        duration: 0.8
    });
});

// Initialize Three.js Background
function initThreeBackground() {
    const canvas = document.querySelector('#hero-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.005,
        color: '#c9d1d9',
        transparent: true,
        opacity: 0.8
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 3;

    // Animation
    const animate = () => {
        requestAnimationFrame(animate);
        particlesMesh.rotation.y += 0.001;
        renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.hero-content, .section-header, .card, .team-member, .contact-form');
    animatedElements.forEach(el => observer.observe(el));
});

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initThreeBackground();
});
