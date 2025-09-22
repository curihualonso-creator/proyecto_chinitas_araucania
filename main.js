window.onload = function () {
  const startButton = document.getElementById('start-button');
  const startScreen = document.getElementById('start-screen');
  const scene = document.querySelector('a-scene');

  startButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    scene.style.display = 'block';

    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.play();
    });
  });
};
