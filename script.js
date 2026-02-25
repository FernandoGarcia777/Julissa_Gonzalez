document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Lógica del Modal (Visor de imágenes)
    const glassOverlays = document.querySelectorAll('.glass-overlay');
    const modalImage = document.getElementById('modalImage');

    glassOverlays.forEach(overlay => {
        overlay.addEventListener('click', function() {
            // Buscamos la imagen "hermana" que está justo antes del overlay
            const imgElement = this.previousElementSibling; 
            const clickedImageSrc = imgElement.getAttribute('src');
            modalImage.setAttribute('src', clickedImageSrc);
        });
    });

    // 2. Deshabilitar clic derecho para proteger las fotos
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    });

    // 3. Efecto de Deslizamiento (Scroll Reveal)
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Cuando la foto entra en pantalla, se le añade la clase 'active'
                entry.target.classList.add('active');
                // Dejamos de observarla para que la animación solo ocurra una vez
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 // Se dispara cuando el 10% de la foto es visible
    });

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });
});