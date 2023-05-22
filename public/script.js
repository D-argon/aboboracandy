console.log("Hello World!");

let canvas = document.querySelector("#canvas1");
let ctx = canvas.getContext("2d");

let strawberry = document.querySelector("#bitstrawberry");

let celesteImage = new Image();
celesteImage.src = "/celeste.jpeg";

celesteImage.onload = function () {
  console.log("Celeste loaded successfully");

  let width = celesteImage.width;
  let height = celesteImage.height;

  let imageData;

  canvas.width = width;
  canvas.height = height;

  let tempCanvas = document.createElement("canvas");
  tempCanvas.width = width;
  tempCanvas.height = height;
  let tempCtx = tempCanvas.getContext("2d");
  tempCtx.drawImage(celesteImage, 0, 0);
  imageData = tempCtx.getImageData(0, 0, width, height);

  let pxs = imageData.data;

  let matrix = crtPxMtrx(pxs, width, height, 32);

  strawberry.addEventListener("click", function () {
    strawberry.classList.add("clicked");
    drwPxMtrxDelay(matrix, ctx, 32);

    setTimeout(function() {
        strawberry.classList.remove("clicked");
    }, 150);
  });
};

let flower = document.querySelector("#flower");
let aliveSrc = "/floweyOvrw.png";
let deadSrc = "/floweyOvrwD.png";
let smileSrc = "/floweyOvrw1.png";

let floweyImage = new Image();
floweyImage.src = "/flowey1.jpeg";

let floweyKImage = new Image();
floweyKImage.src = "/flowey2.jpg"

floweyImage.onload = function () {
  console.log("Flowey loaded successfully");

  let width = floweyImage.width;
  let height = floweyImage.height;

  let imageData1;
  let imageDataK;

  canvas.width = width;
  canvas.height = height;

  let tempCanvas1 = document.createElement("canvas");
  tempCanvas1.width = width;
  tempCanvas1.height = height;
  let tempCtx1 = tempCanvas1.getContext("2d");
  tempCtx1.drawImage(floweyImage, 0, 0);
  imageData1 = tempCtx1.getImageData(0, 0, width, height);

  let tempCanvasK = document.createElement("canvas");
  tempCanvasK.width = width;
  tempCanvasK.height = height;
  let tempCtxK = tempCanvasK.getContext("2d");
  tempCtxK.drawImage(floweyKImage, 0, 0);
  imageDataK = tempCtxK.getImageData(0, 0, width, height);

  let pxs;
  let matrix;

  function imageDataRandom() {
    let imageData = Math.random() * 100 < 6.67 ? imageDataK : imageData1;
    pxs = imageData.data;
    matrix = crtPxMtrx(pxs, width, height, 16);
  }  

  flower.addEventListener("mouseenter", function() {
    if (!flower.classList.contains("clicked")) {
      // Change the src attribute to the hover image
      flower.src = smileSrc;
    }
  });

  flower.addEventListener("mouseleave", function() {
    if (!flower.classList.contains("clicked")) {
      // Change the src attribute back to the original image
      flower.src = aliveSrc;
    }
  });

  flower.addEventListener("click", function () {
    flower.classList.add("clicked");
    flower.src = deadSrc;
    imageDataRandom();
    drwPxMtrxDelay(matrix, ctx, 16, true);

    setTimeout(function() {
        flower.classList.remove("clicked");
    }, 200);
    });

    imageDataRandom();
};

// Create a matrix of px values from the image data
function crtPxMtrx(pxs, width, height, pxSize) {
  let matrix = [];

  for (let y = 0; y < height; y += pxSize) {
    let row = [];
    for (let x = 0; x < width; x += pxSize) {
      let r = 0;
      let g = 0;
      let b = 0;

      for (let i = 0; i < pxSize; i++) {
        for (let j = 0; j < pxSize; j++) {
          let pxIndex = ((y + i) * width + (x + j)) * 4;
          r += pxs[pxIndex];
          g += pxs[pxIndex + 1];
          b += pxs[pxIndex + 2];
        }
      }

      r = Math.floor(r / (pxSize * pxSize));
      g = Math.floor(g / (pxSize * pxSize));
      b = Math.floor(b / (pxSize * pxSize));

      row.push([r, g, b]);
    }
    matrix.push(row);
  }

  return matrix;
}

// Draw the px matrix on the canvas
function drwPxMtrxDelay(matrix, context, pxSize, isBNW) {

  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[y].length; x++) {
      let [r, g, b] = matrix[y][x];

      let bNw = (r + g + b) / 3;

      let color;
      
      if (isBNW) {
        color = isBNW && bNw < 128 ? 'black' : 'white';
      } else {
        color = `rgb(${r}, ${g}, ${b})`;
      }


      setTimeout(() => {
        context.fillStyle = color;
        context.fillRect(x * pxSize, y * pxSize, pxSize, pxSize);
      }, (y * 16 + x) * 2);

    }
  }
}
