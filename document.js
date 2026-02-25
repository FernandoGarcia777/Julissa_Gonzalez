document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.gallery-img');
    const modalImage = document.getElementById('modalImage');

    images.forEach(img => {
        // 1. Evitar clic derecho
        img.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });

        // 2. Pasar la imagen al Modal de Bootstrap al hacer clic
        img.addEventListener('click', (e) => {
            const clickedImageSrc = e.target.getAttribute('src');
            modalImage.setAttribute('src', clickedImageSrc);
        });
    });
});