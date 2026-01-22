document.addEventListener('DOMContentLoaded', () => {
    const sceneEl = document.querySelector('a-scene');
    const startButton = document.querySelector("#start-button");
    const loadingScreen = document.querySelector("#loading-screen");

    startButton.addEventListener('click', () => {
        console.log("Intentando activar cámara...");
        
        // 1. Ocultar la interfaz de inicio
        loadingScreen.style.display = 'none';

        // 2. FORZAR ARRANQUE DE CÁMARA
        // Intentamos por el método de componente
        if (sceneEl.components['mindar-image']) {
            sceneEl.components['mindar-image'].start();
        }

        // 3. DESBLOQUEAR AUDIO
        // Esto es vital para que los videos no se queden mudos o trabados
        const videos = document.querySelectorAll('video');
        videos.forEach(v => {
            v.play().then(() => {
                v.pause();
                v.currentTime = 0;
            }).catch(e => console.log("Video listo para detectar marcador"));
        });
    });
});