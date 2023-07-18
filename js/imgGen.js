(() => {
  const canvas = document.getElementById("pixelizer");
  const ctx = canvas.getContext("2d");
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  //btns
  const strwbrry = document.getElementById("bstrwbrry");

  const flower = document.getElementById("flower");
  const aliveSrc = "imgs/pixelizer/floweyOvrw.png";
  const deadSrc = "imgs/pixelizer/floweyOvrwD.png";
  const smileSrc = "imgs/pixelizer/floweyOvrw1.png";

  //imgSrcs
  const celesteImageSrc = "imgs/pixelizer/celeste.jpeg";

  const floweyImageSrc = "imgs/pixelizer/flowey1.jpeg";
  const floweyKImageSrc = "imgs/pixelizer/flowey2.jpg";

  function crtImg(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  async function loadImgData(imgSrc) {
    const img = await crtImg(imgSrc);
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let newW, newH;
    if (canvasRatio > imgRatio) {
      newW = img.width * (canvas.height / img.height);
      newH = canvas.height;
    } else {
      newW = canvas.width;
      newH = img.height * (canvas.width / img.width);
    }

    tempCanvas.width = newW;
    tempCanvas.height = newH;
    tempCtx.drawImage(img, 0, 0, newW, newH);
    return tempCtx.getImageData(0, 0, newW, newH);
  }

  function crtPxMatrix(imgData, pxSize) {
    const { data, width, height } = imgData;
    const matrix = [];

    for (let y = 0; y < height; y += pxSize) {
      const row = [];
      for (let x = 0; x < width; x += pxSize) {
        let r = 0;
        let g = 0;
        let b = 0;

        for (let i = 0; i < pxSize; i++) {
          for (let j = 0; j < pxSize; j++) {
            const pxIndex = ((y + i) * width + (x + j)) * 4;
            r += data[pxIndex];
            g += data[pxIndex + 1];
            b += data[pxIndex + 2];
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

  function drwPxMatrix(matrix, context, pxSize, isBNW) {
    matrix.forEach((row, y) => {
      row.forEach(([r, g, b], x) => {
        const delay = isBNW ? y * 16 + x : (y * 16 + x) * 2;
        const color = isBNW ? (r + g + b) / 3 < 128 ? "black" : "white" : `rgb(${r}, ${g}, ${b})`;

        setTimeout(() => {
          context.fillStyle = color;
          context.fillRect(x * pxSize, y * pxSize, pxSize, pxSize);
        }, delay);
      });
    });
  }

  function addHoverEvent(elmnt, hoverSrc, originalSrc) {
    elmnt.addEventListener("mouseenter", () => {
      if (!elmnt.classList.contains("clicked")) {
        elmnt.src = hoverSrc;
      }
    });

    elmnt.addEventListener("mouseleave", () => {
      if (!elmnt.classList.contains("clicked")) {
        elmnt.src = originalSrc;
      }
    });
  }

  async function initialize() {
    const canvasW = canvas.width;
    const canvasH = canvas.height;

    const celesteImageData = await loadImgData(celesteImageSrc);
    const celesteMatrix = crtPxMatrix(celesteImageData, 32);
    strwbrry.addEventListener("click", () => {
      strwbrry.classList.add("clicked");
      drwPxMatrix(celesteMatrix, ctx, 32);
      setTimeout(() => {
        strwbrry.classList.remove("clicked");
      }, 150);
    });

    const floweyImageData = await loadImgData(floweyImageSrc);
    const floweyKImageData = await loadImgData(floweyKImageSrc);

    function getRndmImgData() {
      return Math.random() * 100 < 6.67 ? floweyKImageData : floweyImageData;
    }

    function rstFlowey() {
      flower.classList.remove("clicked");
      flower.src = aliveSrc;
    }

    addHoverEvent(flower, smileSrc, aliveSrc);
    flower.addEventListener("click", () => {
      flower.classList.add("clicked");
      flower.src = deadSrc;
      const floweyMatrix = crtPxMatrix(getRndmImgData(), 16);
      drwPxMatrix(floweyMatrix, ctx, 16, true);
      setTimeout(rstFlowey, 200);
    });
  }

  initialize();
})();