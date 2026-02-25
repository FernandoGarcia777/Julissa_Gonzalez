document.addEventListener('DOMContentLoaded', () => {
    
// 1. Lógica del Modal (Visor de imágenes y Slider)
    const glassOverlays = document.querySelectorAll('.glass-overlay');
    const modalImage = document.getElementById('modalImage');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Convertimos la lista de imágenes a un Arreglo para poder navegar por índice
    const allGalleryImages = Array.from(document.querySelectorAll('.gallery-img'));
    let currentImageIndex = 0; // Aquí guardamos qué número de foto estamos viendo

    // Función para actualizar la foto mostrada en el modal
// Función para actualizar la foto mostrada y el botón de descarga
    function actualizarImagenModal() {
        const nuevaImagenSrc = allGalleryImages[currentImageIndex].getAttribute('src');
        
        // 1. Actualiza la imagen visual
        modalImage.setAttribute('src', nuevaImagenSrc);
        
        // 2. Actualiza el enlace de descarga
        const downloadBtn = document.getElementById('downloadBtn');
        downloadBtn.setAttribute('href', nuevaImagenSrc);
        
        // 3. (Opcional pero elegante) Renombra el archivo al descargar usando el índice
        downloadBtn.setAttribute('download', `Familia_Martinez_Foto_${currentImageIndex + 1}.jpg`);
    }

    // Cuando el usuario hace clic en una foto específica de la galería
    glassOverlays.forEach((overlay, index) => {
        overlay.addEventListener('click', function() {
            currentImageIndex = index; // Guardamos el índice de la foto que tocó
            actualizarImagenModal();
        });
    });

    // Botón Siguiente (Derecha)
    nextBtn.addEventListener('click', () => {
        // El operador % hace que si llegamos al final, el índice vuelva a 0
        currentImageIndex = (currentImageIndex + 1) % allGalleryImages.length;
        actualizarImagenModal();
    });

    // Botón Anterior (Izquierda)
    prevBtn.addEventListener('click', () => {
        // Lógica cíclica hacia atrás
        currentImageIndex = (currentImageIndex - 1 + allGalleryImages.length) % allGalleryImages.length;
        actualizarImagenModal();
    });

    // EXTRA: Navegación con las flechas del teclado
    document.addEventListener('keydown', (e) => {
        // Solo funciona si el modal está abierto (si la imagen tiene un src cargado)
        if (modalImage.getAttribute('src') !== "") {
            if (e.key === 'ArrowRight') {
                nextBtn.click(); // Simula el clic en el botón derecho
            } else if (e.key === 'ArrowLeft') {
                prevBtn.click(); // Simula el clic en el botón izquierdo
            }
        }
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
