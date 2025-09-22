AFRAME.registerComponent('video-autoplay', {
  init: function () {
    this.el.addEventListener('targetFound', () => {
      const video = document.getElementById(this.el.getAttribute('src').substring(1));
      if (video) {
        video.play();
      }
    });
    this.el.addEventListener('targetLost', () => {
      const video = document.getElementById(this.el.getAttribute('src').substring(1));
      if (video) {
        video.pause();
      }
    });
  }
});
