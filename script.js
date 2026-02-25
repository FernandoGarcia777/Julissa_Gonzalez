document.addEventListener('DOMContentLoaded', () => {
    
    // 1. BASE DE DATOS (Fotos + Texto de la principal)
    const imageList = [
        // La PRIMERA foto (índice 0) será la destacada
        "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        // El resto irán a la cuadrícula
        "https://images.unsplash.com/photo-1516222338250-863216ce01ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1478146896981-b80fe463b330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1509660933844-6910e12765a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ];

    // Datos del texto para la primera foto
    const featureData = {
        titulo: "Test",
        descripcion: "Mira aqui es donde te digo que podemos ponerle un texto para las fotos"
    };

    const featureContainer = document.getElementById('featureContainer');
    const gridContainer = document.getElementById('gridContainer');

    // 2. INYECCIÓN DINÁMICA CON LÓGICA CONDICIONAL
    imageList.forEach((imgUrl, index) => {
        
        if (index === 0) {
            // --- ES LA PRIMERA FOTO: Estructura Destacada (Foto + Texto) ---
            const featureHTML = `
                <div class="row align-items-center g-5 reveal"> <div class="col-md-6 order-2 order-md-1"> <div class="img-wrapper feature-img-wrapper">
                            <img src="${imgUrl}" alt="Foto Principal Destacada" class="img-fluid gallery-img">
                            <div class="glass-overlay" data-bs-toggle="modal" data-bs-target="#photoModal">
                                <span>Explorar Galería</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 order-1 order-md-2"> <div class="feature-text-container">
                            <h2 class="feature-title">${featureData.titulo}</h2>
                            <p class="feature-description">${featureData.descripcion}</p>
                        </div>
                    </div>
                </div>
            `;
            featureContainer.innerHTML = featureHTML;

        } else {
            // --- SON LAS DEMÁS FOTOS: Estructura de Cuadrícula (4 columnas) ---
            // Nota el cambio: usamos 'col-lg-3' en lugar de 'col-lg-4' para tener 4 por fila
            const gridHTML = `
                <div class="col-12 col-md-6 col-lg-3 reveal">
                    <div class="img-wrapper">
                        <img src="${imgUrl}" alt="Fotografía ${index + 1} de la sesión" class="img-fluid gallery-img">
                        <div class="glass-overlay" data-bs-toggle="modal" data-bs-target="#photoModal">
                            <span>Ver Foto</span>
                        </div>
                    </div>
                </div>
            `;
            gridContainer.innerHTML += gridHTML;
        }
    });

    // --- (EL RESTO DEL CÓDIGO JS DEL MODAL Y SCROLL REVEAL SIGUE IGUAL) ---
    // Asegúrate de pegar aquí el resto del código JavaScript que teníamos en la versión anterior
    // (Variables del modal, event listeners de botones, keydown, IntersectionObserver, etc.)
    const modalImage = document.getElementById('modalImage');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    
    const allGalleryImages = Array.from(document.querySelectorAll('.gallery-img'));
    let currentImageIndex = 0; 

    function actualizarImagenModal() {
        const nuevaImagenSrc = allGalleryImages[currentImageIndex].getAttribute('src');
        modalImage.setAttribute('src', nuevaImagenSrc);
        
        if(downloadBtn) {
            downloadBtn.setAttribute('href', nuevaImagenSrc);
            downloadBtn.setAttribute('download', `Julissa_Gonzalez_Foto_${currentImageIndex + 1}.jpg`);
            downloadBtn.setAttribute('target', '_blank');
        }
    }

    const photoModal = document.getElementById('photoModal');
    photoModal.addEventListener('show.bs.modal', function (event) {
        const triggerElement = event.relatedTarget;
        const overlays = Array.from(document.querySelectorAll('.glass-overlay'));
        currentImageIndex = overlays.indexOf(triggerElement);
        actualizarImagenModal();
    });

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

    document.addEventListener('keydown', (e) => {
        if (photoModal.classList.contains('show')) {
            if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
            if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
        }
    });

    // 4. SCROLL REVEAL RE-INICIALIZADO
    // Necesitamos buscar los elementos .reveal NUEVAMENTE porque acabamos de inyectarlos
    const reveals = document.querySelectorAll('.reveal');
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.15 }); // Un poco más de umbral para que no aparezcan tan pronto

    reveals.forEach(reveal => revealOnScroll.observe(reveal));
});