document.addEventListener('DOMContentLoaded', () => {
    const sceneEl = document.querySelector('a-scene');
    const startButton = document.querySelector("#start-button");
    const loadingScreen = document.querySelector("#loading-screen");

    // Datos para el panel informativo
    const chinitaData = [
        { name: "Adalia Angulifera", desc: "Chinita nativa con diseño angular." },
        { name: "Adalia Bipunctata", desc: "La clásica chinita de dos puntos." },
        // ... (puedes completar los otros 29 aquí)
    ];

    // INICIO DE LA EXPERIENCIA
    startButton.addEventListener('click', () => {
        loadingScreen.style.display = 'none';
        
        // Arranca el motor de MindAR (pide permiso cámara)
        sceneEl.components['mindar-image'].start();

        // Desbloquea el audio de todos los videos (política de navegadores)
        const videos = document.querySelectorAll('video');
        videos.forEach(v => {
            v.play();
            v.pause();
        });
    });

    // LÓGICA DE DETECCIÓN PARA EL PANEL
    const infoPanel = document.getElementById('info-panel');
    const nombreTxt = document.getElementById('chinita-nombre');
    const descTxt = document.getElementById('chinita-descripcion');

    sceneEl.addEventListener('loaded', () => {
        const targets = document.querySelectorAll('[mindar-image-target]');
        targets.forEach((target, i) => {
            target.addEventListener('targetFound', () => {
                const data = chinitaData[i] || { name: "Chinita " + i, desc: "Información en proceso." };
                nombreTxt.textContent = data.name;
                descTxt.textContent = data.desc;
                infoPanel.style.display = 'block';
            });
            
            target.addEventListener('targetLost', () => {
                infoPanel.style.display = 'none';
            });
        });
    });

    document.getElementById('cerrar-panel').addEventListener('click', () => {
        infoPanel.style.display = 'none';
    });
});