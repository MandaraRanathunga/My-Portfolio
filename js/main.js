// Theme configuration for canvas background
let themeConfig = {
    particleColor: 'rgba(44, 62, 80, OPACITY)',
    lineColor: 'rgba(44, 62, 80, OPACITY_FACTOR)',
    canvasClearColor: 'rgba(255, 255, 255, 0.3)'
};

function updateThemeConfig(isDark) {
    if (isDark) {
        themeConfig.particleColor = 'rgba(100, 200, 255, OPACITY)';
        themeConfig.lineColor = 'rgba(100, 200, 255, OPACITY_FACTOR)';
        themeConfig.canvasClearColor = 'rgba(10, 10, 30, 0.3)';
    } else {
        themeConfig.particleColor = 'rgba(44, 62, 80, OPACITY)'; // Darker particles for light mode
        themeConfig.lineColor = 'rgba(44, 62, 80, OPACITY_FACTOR)';
        themeConfig.canvasClearColor = 'rgba(255, 255, 255, 0.3)'; // Lighter clear for light mode
    }
}

// Live Animated Background
function initBackground() {
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1;
            // Adjust speed for a calmer feel in light mode
            const speedFactor = document.body.classList.contains('dark-mode') ? 0.2 : 0.15;
            this.speedX = Math.random() * speedFactor - (speedFactor / 2);
            this.speedY = Math.random() * speedFactor - (speedFactor / 2);
            this.opacity = Math.random() * 0.3 + 0.05;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width) this.x = 0;
            if (this.x < 0) this.x = canvas.width;
            if (this.y > canvas.height) this.y = 0;
            if (this.y < 0) this.y = canvas.height;
        }

        draw() {
            ctx.fillStyle = themeConfig.particleColor.replace('OPACITY', this.opacity);
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }

    function connectParticles() {
        particles.forEach((p1, i) => {
            particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.strokeStyle = themeConfig.lineColor.replace('OPACITY_FACTOR', 0.05 * (1 - distance / 100));
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });
    }

    function animate() {
        ctx.fillStyle = themeConfig.canvasClearColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        connectParticles();
        requestAnimationFrame(animate);
    }

    animate();

    // Return a function to re-initialize particles on theme change
    return function reinitParticles() {
        particles = [];
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }
    };
}

// Smooth Scrolling & Active Navigation
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            
            targetSection.scrollIntoView({ behavior: 'smooth' });
            
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('.section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Intersection Observer for Animations
function initAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeIn');
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

// Custom Cursor Tracking
function initCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    
    let mouseX = 0;
    let mouseY = 0;

    // Update mouse position
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update dot position immediately
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });


    // Add hover effect on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, .project-card, .skill-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('cursor-hover');
        });
    });
}

// Handle Contact Form Submission
function initContactForm() {
    const EMAILJS_PUBLIC_KEY = '-KK9BjA_STLl10mEu';
    const EMAILJS_SERVICE_ID  = 'service_6533pj9';
    const EMAILJS_TEMPLATE_ID = 'template_sm3ue3l';

    emailjs.init(EMAILJS_PUBLIC_KEY);

    const form = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector('.btn-submit');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        const templateParams = {
            from_name:  document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            subject:    document.getElementById('subject').value,
            message:    document.getElementById('message').value
        };

        try {
            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams);

            formStatus.className = 'form-status success';
            formStatus.textContent = '✓ Message sent! I\'ll get back to you soon.';
            form.reset();

        } catch (error) {
            console.error('EmailJS error:', error);
            formStatus.className = 'form-status error';
            formStatus.textContent = '✗ Something went wrong. Please email me directly.';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    });
}
// Theme Toggle
function initThemeToggle(reinitParticles) {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Function to apply the theme
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.textContent = '☀️';
        } else {
            body.classList.remove('dark-mode');
            themeToggle.textContent = '🌙';
        }
        updateThemeConfig(theme === 'dark');
        if (reinitParticles) reinitParticles(); // Re-create particles with new speeds
    };

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // Add click event listener
    themeToggle.addEventListener('click', () => {
        const isDark = body.classList.contains('dark-mode');
        const newTheme = isDark ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// Update the initialization
// Contact Panel Animation
function initContactPanel() {
    const slides = [
        "Get In Touch With Me ✨",
        "Let's Build Something Together 🚀",
        "Open To New Opportunities 💡",
        "mandararanatunga123@gmail.com 📧",
        "Always Happy To Collaborate 🤝",
        "Drop Me A Message Below ⬇️"
    ];

    let current = 0;
    const el = document.getElementById('contact-slide');
    if (!el) return;

    function nextSlide() {
        el.classList.add('out');
        setTimeout(() => {
            current = (current + 1) % slides.length;
            el.textContent = slides[current];
            el.classList.remove('out');
        }, 420);
    }

    setInterval(nextSlide, 3000);

    // Stagger chip slide-in on scroll into view
    const chips = document.querySelectorAll('.contact-chip');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                chips.forEach((chip, i) => {
                    setTimeout(() => chip.classList.add('visible'), i * 150 + 200);
                });
                observer.disconnect();
            }
        });
    }, { threshold: 0.2 });

    const panel = document.querySelector('.contact-visual-panel');
    if (panel) observer.observe(panel);
}

document.addEventListener('DOMContentLoaded', () => {
    const reinitParticles = initBackground();
    initNavigation();
    initAnimations();
    initCursor();
    initContactForm();
    initThemeToggle(reinitParticles);
    initContactPanel();
});F