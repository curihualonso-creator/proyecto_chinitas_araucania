document.addEventListener('DOMContentLoaded', () => {

    // 1. Datos actualizados para las 31 chinitas (Orden alfabético según tus archivos)
    const chinitaData = [
        { name: 'Adalia Angulifera', videoId: 'vid_0', description: 'Chinita nativa, fácil de reconocer por su patrón angular.' },
        { name: 'Adalia Bipunctata', videoId: 'vid_1', description: 'Conocida como la chinita de dos puntos.' },
        { name: 'Adalia Deficiens', videoId: 'vid_2', description: 'Especie con patrones variables, común en vegetación diversa.' },
        { name: 'Adalia Kuscheli', videoId: 'vid_3', description: 'Pequeña chinita nativa de importancia ecológica.' },
        { name: 'Coccidophilus Arrowi', videoId: 'vid_4', description: 'Especie depredadora de escamas y otros insectos pequeños.' },
        { name: 'Coleomegilla Quadrifasciata', videoId: 'vid_5', description: 'Reconocible por sus franjas longitudinales.' },
        { name: 'Cranoryssus Faimaire', videoId: 'vid_6', description: 'Chinita con un patrón de coloración distintivo.' },
        { name: 'Cranoryssus Flavomarginatus', videoId: 'vid_7', description: 'Se caracteriza por los bordes amarillentos en sus élitros.' },
        { name: 'Cranoryssus Variegatus', videoId: 'vid_8', description: 'Posee un diseño corporal muy variado y complejo.' },
        { name: 'Cycloneda Ancoralis', videoId: 'vid_9', description: 'Llamada así por el dibujo en forma de ancla en su tórax.' },
        { name: 'Cycloneda Eryngii', videoId: 'vid_10', description: 'Habitualmente asociada a plantas del género Eryngium.' },
        { name: 'Cycloneda Fulvipennis', videoId: 'vid_11', description: 'Chinita con élitros de color rojizo o anaranjado uniforme.' },
        { name: 'Cycloneda Germainii', videoId: 'vid_12', description: 'Especie nativa chilena con manchas circulares claras.' },
        { name: 'Cycloneda Pretiosa', videoId: 'vid_13', description: 'Destaca por su coloración brillante y patrones definidos.' },
        { name: 'Cycloneda Sanguinea', videoId: 'vid_14', description: 'Muy común, reconocida por su color rojo sangre intenso.' },
        { name: 'Eriopis Chilensis', videoId: 'vid_15', description: 'La chinita chilena más común y gran controladora de pulgones.' },
        { name: 'Eriopis Eschscholtzii', videoId: 'vid_16', description: 'Nativa con un patrón de manchas amarillas sobre fondo negro.' },
        { name: 'Harmonia Axiridis', videoId: 'vid_17', description: 'Especie invasora muy variable, conocida como chinita arlequín.' },
        { name: 'Hippodamia Adonia', videoId: 'vid_18', description: 'Especie alargada, eficiente depredadora en cultivos.' },
        { name: 'Hippodamia Convergens', videoId: 'vid_19', description: 'Famosa por sus grandes migraciones y alta voracidad.' },
        { name: 'Hong Slipinskii', videoId: 'vid_20', description: 'Especie pequeña con características morfológicas únicas.' },
        { name: 'Neorhizobius Robustus', videoId: 'vid_21', description: 'Chinita de cuerpo robusto y hábitos discretos.' },
        { name: 'Neorhizobius Sanguinulentus', videoId: 'vid_22', description: 'Posee manchas rojizas características en su dorso.' },
        { name: 'Orbipressus Penai', videoId: 'vid_23', description: 'Especie poco común, nombrada en honor al entomólogo Luis Peña.' },
        { name: 'Parasidis Elguetai', videoId: 'vid_24', description: 'Chinita nativa chilena con manchas blancas y negras.' },
        { name: 'Parasidis Porteri', videoId: 'vid_25', description: 'Otra variante de Parasidis con importancia taxonómica.' },
        { name: 'Psyllobora Picta', videoId: 'vid_26', description: 'Única por alimentarse de hongos (oídio) en lugar de insectos.' },
        { name: 'Rhyzobius Laphanthea', videoId: 'vid_27', description: 'Especie pequeña utilizada a menudo en control biológico.' },
        { name: 'Scymnus Bicolor', videoId: 'vid_28', description: 'Pequeña chinita de dos colores, experta en cazar ácaros.' },
        { name: 'Scymnus Loewii', videoId: 'vid_29', description: 'Muy pequeña y peluda, fundamental en el control de plagas.' },
        { name: 'Stictospilus Darwini', videoId: 'vid_30', description: 'Especie rara que habita en zonas específicas del sur.' }
    ];

    const sceneEl = document.querySelector('a-scene');
    const infoPanel = document.getElementById('info-panel');
    const panelVideo = document.getElementById('panel-video');
    const nombreChinita = document.getElementById('chinita-nombre');
    const descripcionChinita = document.getElementById('chinita-descripcion');
    const cerrarPanelBtn = document.getElementById('cerrar-panel');

    function mostrarPanel(data) {
        sceneEl.pause(); 
        nombreChinita.textContent = data.name;
        descripcionChinita.textContent = data.description;
        
        const videoAsset = document.getElementById(data.videoId);
        if (videoAsset) {
            panelVideo.src = videoAsset.src;
            panelVideo.play();
            infoPanel.style.display = 'block';
        }
    }

    function ocultarPanel() {
        panelVideo.pause();
        infoPanel.style.display = 'none';
        sceneEl.play(); 
    }

    sceneEl.addEventListener('loaded', () => {
        // Ahora itera sobre los 31 elementos
        for (let i = 0; i < chinitaData.length; i++) {
            const targetEl = document.querySelector(`[mindar-image-target="targetIndex: ${i}"]`);
            if (targetEl) {
                const data = chinitaData[i];
                targetEl.addEventListener('targetFound', () => {
                    if (infoPanel.style.display === 'none' || !infoPanel.style.display) {
                        mostrarPanel(data);
                    }
                });
            }
        }
    });

    cerrarPanelBtn.addEventListener('click', ocultarPanel);

    // Ajuste del botón de inicio para que coincida con el ID de tu nuevo HTML
    const startBtn = document.getElementById('start-button');
    if (startBtn) {
        startBtn.addEventListener('click', () => {
            document.getElementById('loading-screen').style.display = 'none';
            sceneEl.components['mindar-image'].start(); 
        });
    }
});