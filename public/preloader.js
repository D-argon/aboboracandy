// Preload images
function preloadImages() {
    const images = [
      'Strawberry.png',
      'floweyOvrw.png',
      'floweyOvrw1.png',
      'floweyOvrwD.png',
      'celeste.jpeg',
      'flowey1.jpeg',
      'flowey2.jpg'
    ];
  
    for (const image of images) {
      const img = new Image();
      img.src = image;
    }
  }
  
  // Call the preloadImages function when the page loads
  window.addEventListener('load', preloadImages);
  console.log('preload concluído.')