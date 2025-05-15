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
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(139, 69, 19, 0.95)';
        } else {
            navbar.style.backgroundColor = 'var(--primary-color)';
        }
    });

    // Image gallery functionality
    document.querySelectorAll('.product-gallery').forEach(gallery => {
        const images = gallery.querySelectorAll('img');
        const prevBtn = gallery.querySelector('.prev');
        const nextBtn = gallery.querySelector('.next');
        let currentIndex = 0;

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
        prevBtn.addEventListener('click', prevImage);
        nextBtn.addEventListener('click', nextImage);

        // Optional: Add keyboard navigation
        gallery.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
        });

        // Optional: Add touch swipe support
        let touchStartX = 0;
        let touchEndX = 0;

        gallery.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        gallery.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 50) nextImage();
            if (touchEndX - touchStartX > 50) prevImage();
        });
    });
}); 