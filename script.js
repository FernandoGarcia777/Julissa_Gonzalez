document.addEventListener('DOMContentLoaded', () => {
    
    // 1. BASE DE DATOS ESTRUCTURADA POR SESIONES
    const sessionsData = {
        otono: {
            headerInfo: {
                subtitle: "Sesión de Otoño | 2026",
                // Imagen de fondo del Hero para otoño
                bgImage: "https://images.unsplash.com/photo-1509660933844-6910e12765a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            },
            feature: {
                titulo: "Sesión de Otoño",
                descripcion: "Los tonos cálidos y la luz natural del atardecer crean un ambiente nostálgico y hermoso. Mira la galería completa de esta mágica tarde."
            },
            images: [
                "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1516222338250-863216ce01ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1478146896981-b80fe463b330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1509660933844-6910e12765a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ]
        },
        bebes: {
            headerInfo: {
                subtitle: "Sesión de Bebés | 2026",
                // Imagen de fondo del Hero para bebés (tonos más suaves/blancos)
                "./Fotos/Fotob1.jpeg",
        
        // El resto irán a la cuadrícula de abajo
                "./Fotos/fotob2.jpeg",
                "./Fotos/fotob3.jpeg",
            },
            feature: {
                titulo: "Dulces Recién Nacidos",
                descripcion: "Capturando los primeros días de vida con ternura y delicadeza. Colores pastel, texturas suaves y momentos inolvidables."
            },
            images: [
                "https://images.unsplash.com/photo-1519689680058-324335c77eba?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
                "https://images.unsplash.com/photo-1544126592-807ade215a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1555252834-6c4eb827bc19?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                "https://images.unsplash.com/photo-1522771930-78848d92fa24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            ]
        }
    };

    const featureContainer = document.getElementById('featureContainer');
    const gridContainer = document.getElementById('gridContainer');
    const mainHeader = document.getElementById('mainHeader');
    const headerSubtitle = document.getElementById('headerSubtitle');
    
    let allGalleryImages = [];
    let currentImageIndex = 0;

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.15 });

    // 2. FUNCIÓN PARA DIBUJAR LA GALERÍA Y ACTUALIZAR EL HEADER
    function cargarGaleria(tipoDeSesion) {
        featureContainer.innerHTML = '';
        gridContainer.innerHTML = '';

        const data = sessionsData[tipoDeSesion];

        // Cambiar el fondo del header y el subtítulo dinámicamente
        if (mainHeader && headerSubtitle) {
            mainHeader.style.backgroundImage = `linear-gradient(rgba(29, 29, 31, 0.7), rgba(29, 29, 31, 0.5)), url('${data.headerInfo.bgImage}')`;
            headerSubtitle.textContent = data.headerInfo.subtitle;
        }

        data.images.forEach((imgUrl, index) => {
            if (index === 0) {
                const featureHTML = `
                    <div class="row align-items-center g-5 reveal">
                        <div class="col-md-6 order-2 order-md-1">
                            <div class="img-wrapper feature-img-wrapper">
                                <img src="${imgUrl}" alt="Foto Principal" class="img-fluid gallery-img">
                                <div class="glass-overlay" data-bs-toggle="modal" data-bs-target="#photoModal">
                                    <span>Explorar Galería</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 order-1 order-md-2">
                            <div class="feature-text-container">
                                <h2 class="feature-title">${data.feature.titulo}</h2>
                                <p class="feature-description">${data.feature.descripcion}</p>
                            </div>
                        </div>
                    </div>
                `;
                featureContainer.innerHTML = featureHTML;
            } else {
                const gridHTML = `
                    <div class="col-12 col-md-6 col-lg-3 reveal">
                        <div class="img-wrapper">
                            <img src="${imgUrl}" alt="Fotografía" class="img-fluid gallery-img">
                            <div class="glass-overlay" data-bs-toggle="modal" data-bs-target="#photoModal">
                                <span>Ver Foto</span>
                            </div>
                        </div>
                    </div>
                `;
                gridContainer.innerHTML += gridHTML;
            }
        });

        allGalleryImages = Array.from(document.querySelectorAll('.gallery-img'));
        const reveals = document.querySelectorAll('.reveal');
        reveals.forEach(reveal => revealOnScroll.observe(reveal));
    }

    // 3. INICIAR CON OTOÑO
    cargarGaleria('otono');

    // 4. DETECTAR CLICS EN LOS ENLACES DEL NAVBAR
    const navButtons = document.querySelectorAll('.nav-session-btn');
    
    navButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Evita que la página salte hacia arriba
            
            // Cambiar la clase 'active' visualmente
            navButtons.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');

            // Cargar la sesión correspondiente
            const sessionType = e.currentTarget.getAttribute('data-session');
            cargarGaleria(sessionType);
        });
    });

    // --- (EL RESTO DEL CÓDIGO JS DEL MODAL SIGUE IGUAL DESDE AQUÍ) ---
    // (Asegúrate de dejar la parte de photoModal, nextBtn, prevBtn, etc.)

    // 5. LÓGICA DEL MODAL (Igual que antes, pero conectada dinámicamente)
    const modalImage = document.getElementById('modalImage');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const downloadBtn = document.getElementById('downloadBtn');

    function actualizarImagenModal() {
        const nuevaImagenSrc = allGalleryImages[currentImageIndex].getAttribute('src');
        modalImage.setAttribute('src', nuevaImagenSrc);
        
        if(downloadBtn) {
            downloadBtn.setAttribute('href', nuevaImagenSrc);
            downloadBtn.setAttribute('download', `Julissa_Gonzalez_Foto_${currentImageIndex + 1}.jpg`);
        }
    }

    const photoModal = document.getElementById('photoModal');
    if (photoModal) {
        photoModal.addEventListener('show.bs.modal', function (event) {
            const triggerElement = event.relatedTarget;
            // Busca la imagen más cercana al overlay que fue clickeado
            const clickedImage = triggerElement.previousElementSibling;
            currentImageIndex = allGalleryImages.indexOf(clickedImage);
            actualizarImagenModal();
        });
    }

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
        if (photoModal && photoModal.classList.contains('show')) {
            if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
            if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
        }
    });

});
