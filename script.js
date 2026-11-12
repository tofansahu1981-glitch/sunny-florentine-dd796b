/**
 * TOFAN SAHU - Premium Portfolio Website
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', () => {

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name') ? document.getElementById('name').value : '';
            const email = document.getElementById('email') ? document.getElementById('email').value : '';
            const subject = this.querySelector('input[placeholder*="Subject"]') ? this.querySelector('input[placeholder*="Subject"]').value : '';
            const message = document.getElementById('message') ? document.getElementById('message').value : '';

            // Show success feedback
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = '#10b981';

            setTimeout(() => {
                // Open mailto link
                const mailtoUrl = `mailto:tufansahu2007@gmail.com?subject=${encodeURIComponent(subject || 'Website Inquiry')}&body=${encodeURIComponent("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message)}`;
                window.location.href = mailtoUrl;

                // Reset button
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    this.reset();
                }, 500);
            }, 1000);
        });
    }

    // Navbar scroll effect
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.style.background = 'rgba(6, 9, 18, 0.95)';
                nav.style.boxShadow = '0 5px 30px rgba(0,0,0,0.3)';
            } else {
                nav.style.background = 'rgba(10, 14, 26, 0.9)';
                nav.style.boxShadow = 'none';
            }
        });
    }

    // Animate stats on scroll
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const animateStats = () => {
        if (statsAnimated) return;

        const firstStat = statNumbers[0];
        if (!firstStat) return;

        const rect = firstStat.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            statsAnimated = true;

            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const match = text.match(/(\d+)/);
                if (match) {
                    const target = parseInt(match[0]);
                    const suffix = text.replace(/\d+/, '');
                    let current = 0;
                    const increment = target / 60;

                    const updateStat = () => {
                        current += increment;
                        if (current < target) {
                            stat.textContent = Math.ceil(current) + suffix;
                            requestAnimationFrame(updateStat);
                        } else {
                            stat.textContent = text;
                        }
                    };

                    updateStat();
                }
            });
        }
    };

    window.addEventListener('scroll', animateStats);
    window.addEventListener('load', animateStats);

    // Intersection Observer for reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply to service cards and portfolio items
    document.querySelectorAll('.service-card, .portfolio-item, .contact-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

});