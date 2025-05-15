document.addEventListener('DOMContentLoaded', function() {
    // Language switching functionality
    let currentLang = 'vi';
    const langBtn = document.querySelector('.lang-text');

    function toggleLanguage() {
        currentLang = currentLang === 'vi' ? 'en' : 'vi';
        langBtn.textContent = currentLang.toUpperCase();
        
        // Update all elements with data attributes
        document.querySelectorAll('[data-en]').forEach(element => {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = element.getAttribute(`data-${currentLang}-placeholder`);
            } else {
                element.textContent = element.getAttribute(`data-${currentLang}`);
            }
        });

        // Update document language
        document.documentElement.lang = currentLang;
    }

    // Add click event listener to language button
    document.querySelector('.lang-btn').addEventListener('click', toggleLanguage);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Image gallery functionality with improved touch handling
    document.querySelectorAll('.product-gallery').forEach(gallery => {
        const images = gallery.querySelectorAll('img');
        const prevBtn = gallery.querySelector('.prev');
        const nextBtn = gallery.querySelector('.next');
        let currentIndex = 0;
        let touchStartX = 0;
        let touchEndX = 0;
        let isSwiping = false;
        let autoPlayInterval;

        function showImage(index) {
            images.forEach(img => img.classList.remove('active'));
            images[index].classList.add('active');
        }

        function nextImage() {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }

        function prevImage() {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        }

        // Add click event listeners to navigation buttons
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            prevImage();
            resetAutoPlay();
        });

        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            nextImage();
            resetAutoPlay();
        });

        // Touch event handling
        gallery.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            isSwiping = true;
            resetAutoPlay();
        }, { passive: true });

        gallery.addEventListener('touchmove', (e) => {
            if (!isSwiping) return;
            touchEndX = e.changedTouches[0].screenX;
        }, { passive: true });

        gallery.addEventListener('touchend', (e) => {
            if (!isSwiping) return;
            const swipeDistance = touchEndX - touchStartX;
            const minSwipeDistance = 50;

            if (Math.abs(swipeDistance) > minSwipeDistance) {
                if (swipeDistance > 0) {
                    prevImage();
                } else {
                    nextImage();
                }
            }
            isSwiping = false;
        }, { passive: true });

        // Keyboard navigation
        gallery.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevImage();
                resetAutoPlay();
            }
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextImage();
                resetAutoPlay();
            }
        });

        // Auto-play functionality
        function startAutoPlay() {
            autoPlayInterval = setInterval(nextImage, 5000);
        }

        function resetAutoPlay() {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }

        // Start auto-play when gallery is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startAutoPlay();
                } else {
                    clearInterval(autoPlayInterval);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(gallery);
    });

    // Handle contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });

            // Here you would typically send the form data to a server
            // For now, we'll just show a success message
            const successMessage = currentLang === 'vi' 
                ? 'Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.'
                : 'Thank you for contacting us! We will respond as soon as possible.';
            alert(successMessage);
            this.reset();
        });
    }

    // Add scroll-based navbar background
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.style.backgroundColor = 'rgba(139, 69, 19, 0.95)';
            
            // Hide navbar on scroll down, show on scroll up
            if (currentScroll > lastScroll && currentScroll > 100) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        } else {
            navbar.style.backgroundColor = 'var(--primary-color)';
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
}); 