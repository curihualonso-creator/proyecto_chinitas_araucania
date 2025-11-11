

document.addEventListener('DOMContentLoaded', () => {

  
    const chinitaData = [
        { name: 'Eriopis Chilensis', videoId: 'eriopis_chilensis', description: 'Chinita nativa crucial para el control de pulgones.' }, // targetIndex: 0
        { name: 'Harmonia Axiridis', videoId: 'harmonia_axiridis', description: 'Especie exótica invasora con patrones variables.' }, // targetIndex: 1
        { name: 'Adalia Angulifera', videoId: 'adalia_angulifera', description: 'Otra chinita nativa, fácil de reconocer por su patrón.' }, // targetIndex: 2
        { name: 'Eriopis Eschscholtzii', videoId: 'eriopis_eschscholtzii', description: 'Chinita nativa con un patrón distintivo de manchas.' }, // targetIndex: 3
        { name: 'Hippodamia Adonia', videoId: 'hippodamia_adonia_variegata', description: 'Variante de Hippodamia, conocida por su forma alargada.' }, // targetIndex: 4
        { name: 'Hippodamia Convergens', videoId: 'hippodamia_convergens', description: 'Chinita muy beneficiosa, conocida por su alta voracidad.' }, // targetIndex: 5
    ];


    
    const sceneEl = document.querySelector('a-scene');
    const infoPanel = document.getElementById('info-panel');
    const panelVideo = document.getElementById('panel-video');
    const nombreChinita = document.getElementById('chinita-nombre');
    const descripcionChinita = document.getElementById('chinita-descripcion');
    const cerrarPanelBtn = document.getElementById('cerrar-panel');

    
    function mostrarPanel(data) {
       
        sceneEl.pause(); 
        
        // Carga los datos
        nombreChinita.textContent = data.name;
        descripcionChinita.textContent = data.description;
        
        // Obtiene la ruta del video precargado en A-Assets (por el ID)
        const videoAsset = document.getElementById(data.videoId);
        panelVideo.src = videoAsset.src;
        
        // Muestra el panel y reproduce el video
        panelVideo.play();
        infoPanel.style.display = 'block';
    }

    // 4. Función para ocultar el contenido
    function ocultarPanel() {
        panelVideo.pause();
        infoPanel.style.display = 'none';
        // Reanuda la escena AR
        sceneEl.play(); 
    }

    // 5. Asignar Eventos de Detección (Target Found/Lost)
    sceneEl.addEventListener('loaded', () => {
        // Itera sobre todos los posibles marcadores (0 a 5)
        for (let i = 0; i < chinitaData.length; i++) {
            const targetEl = document.querySelector(`[mindar-image-target="targetIndex: ${i}"]`);
            const data = chinitaData[i];

            // Cuando el marcador (la ilustración PNG) es detectado
            targetEl.addEventListener('targetFound', () => {
                // Solo muestra el panel si aún no está abierto
                if (infoPanel.style.display === 'none') {
                     mostrarPanel(data);
                }
            });
            
            // Opcional: Al perder el marcador, podrías cerrarlo, pero es mejor que el usuario lo cierre manualmente.
            // targetEl.addEventListener('targetLost', ocultarPanel); 
        }
    });

    // 6. Listener para el botón de cerrar
    cerrarPanelBtn.addEventListener('click', ocultarPanel);

    // 7. Manejo del botón de inicio (mantenido de tu código original)
    document.getElementById('start-button').addEventListener('click', () => {
      document.getElementById('start-screen').style.display = 'none';
      // Inicia la escena después de que el usuario toca (necesario por las políticas de autoplay)
      sceneEl.components['mindar-image'].start(); 
    });
});