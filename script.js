document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. ELEMENTOS DEL DOM ---
    const glassOverlays = document.querySelectorAll('.glass-overlay');
    const modalImage = document.getElementById('modalImage');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    
    // Convertimos las imágenes a un array para el slider
    const allGalleryImages = Array.from(document.querySelectorAll('.gallery-img'));
    let currentImageIndex = 0; 

    // --- 2. FUNCIÓN PARA ACTUALIZAR EL MODAL Y DESCARGA ---
    function actualizarImagenModal() {
        const nuevaImagenSrc = allGalleryImages[currentImageIndex].getAttribute('src');
        
        // Actualiza la foto
        modalImage.setAttribute('src', nuevaImagenSrc);
        
        // Actualiza el botón de descarga
        if(downloadBtn) {
            downloadBtn.setAttribute('href', nuevaImagenSrc);
            downloadBtn.setAttribute('download', `Julissa_Gonzalez_Foto_${currentImageIndex + 1}.jpg`);
        }
    }

    // --- 3. ABRIR FOTO AL HACER CLIC ---
    glassOverlays.forEach((overlay, index) => {
        overlay.addEventListener('click', function() {
            currentImageIndex = index;
            actualizarImagenModal();
        });
    });

    // --- 4. CONTROLES DEL SLIDER (BOTONES) ---
    if(nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % allGalleryImages.length;
            actualizarImagenModal();
        });
    }

    if(prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + allGalleryImages.length) % allGalleryImages.length;
            actualizarImagenModal();
        });
    }

    // --- 5. NAVEGACIÓN CON TECLADO ---
    document.addEventListener('keydown', (e) => {
        if (modalImage && modalImage.getAttribute('src') !== "") {
            if (e.key === 'ArrowRight' && nextBtn) {
                nextBtn.click();
            } else if (e.key === 'ArrowLeft' && prevBtn) {
                prevBtn.click();
            }
        }
    });

    // --- 6. PROTEGER FOTOS (DESHABILITAR CLIC DERECHO) ---
    const allImages = document.querySelectorAll('img');
    allImages.forEach(img => {
        img.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    });

    // --- 7. EFECTO DE DESLIZAMIENTO (SCROLL REVEAL) ---
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active'); // Aquí es donde las hace visibles
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1
    });

    reveals.forEach(reveal => {
        revealOnScroll.observe(reveal);
    });
});