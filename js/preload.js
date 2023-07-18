// Preload images
function preloadImages() {
  const images = [
    'imgs/pixelizer/Strawberry.png',
    'imgs/pixelizer/floweyOvrw.png',
    'imgs/pixelizer/floweyOvrw1.png',
    'imgs/pixelizer/floweyOvrwD.png',
    'imgs/pixelizer/celeste.jpeg',
    'imgs/pixelizer/flowey1.jpeg',
    'imgs/pixelizer/flowey2.jpg',
    'imgs/bttn/mundo64.gif',
    'imgs/bttn/wanwan.png'
  ];

  for (const image of images) {
    const img = new Image();
    img.src = image;
  }
}

// Call the preloadImages function when the page loads
window.addEventListener('load', preloadImages);
console.log('preload finished.')