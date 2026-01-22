document.addEventListener('DOMContentLoaded', () => {
    const sceneEl = document.querySelector('a-scene');
    const startButton = document.querySelector("#start-button");
    const loadingScreen = document.querySelector("#loading-screen");
    const infoPanel = document.getElementById('info-panel');
    const panelVideo = document.getElementById('panel-video');
    const nombreChinita = document.getElementById('chinita-nombre');
    const descripcionChinita = document.getElementById('chinita-descripcion');

    // Datos simplificados (Asegúrate de que los archivos sean .mp4 ahora)
    const chinitaData = [
        { name: 'Adalia Angulifera', id: 'adalia_angulifera', desc: 'Chinita nativa.' },
        { name: 'Adalia Bipunctata', id: 'adalia_bipunctata', desc: 'Chinita de dos puntos.' },
        // ... Agrega los otros 29 aquí siguiendo el mismo formato ...
    ];

    // FUNCIÓN DE INICIO
    startButton.addEventListener('click', () => {
        console.log("Iniciando experiencia...");
        loadingScreen.style.display = 'none';
        
        // Esto fuerza la solicitud de cámara
        const arSystem = sceneEl.systems['mindar-image-system'];
        if (arSystem) {
            arSystem.start(); 
        } else {
            // Backup por si el sistema no carga por nombre
            sceneEl.components['mindar-image'].start();
        }
    });

    function mostrarPanel(index) {
        if (!chinitaData[index]) return;
        const data = chinitaData[index];
        
        nombreChinita.textContent = data.name;
        descripcionChinita.textContent = data.desc;
        
        // Cambiamos la fuente al vuelo para ahorrar memoria
        panelVideo.src = `./assets/${data.id}.mp4`;
        infoPanel.style.display = 'block';
        panelVideo.play();
        sceneEl.pause();
    }

    document.getElementById('cerrar-panel').addEventListener('click', () => {
        infoPanel.style.display = 'none';
        panelVideo.pause();
        panelVideo.src = "";
        sceneEl.play();
    });

    // Escuchar detecciones
    sceneEl.addEventListener("arReady", (event) => {
        console.log("MindAR está listo");
    });

    sceneEl.addEventListener('loaded', () => {
        const targets = document.querySelectorAll('[mindar-image-target]');
        targets.forEach((target, i) => {
            target.addEventListener('targetFound', () => {
                mostrarPanel(i);
            });
        });
    });
});