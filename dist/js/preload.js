// Preload images
const images = [
  "imgs/pixelizer/Strawberry.png",
  "imgs/pixelizer/floweyOvrw.png",
  "imgs/pixelizer/floweyOvrw1.png",
  "imgs/pixelizer/floweyOvrwD.png",
  "imgs/pixelizer/celeste.jpeg",
  "imgs/pixelizer/flowey1.jpeg",
  "imgs/pixelizer/flowey2.jpg",
  "imgs/pixelizer/mundo64.gif",
  "imgs/pixelizer/wanwan.png",
];

for (const image of images) {
  const img = new Image();
  img.src = image;
}
// Call the preloadImages function when the page loads
console.log("preload finished.");
