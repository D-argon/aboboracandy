//directory system
(() => {
  //jQuery

  // $(document).ready(function () {
  //   var logDateBtn = $(".entry__btn");
  //   var logDate = $(".entry");

  //   logDateBtn.prop("checked", false);

  //   logDateBtn.on("change", function () {
  //     var entry = $(this).siblings("ul").children(".entry");

  //     if ($(this).is(":checked")) {
  //       entry.css({
  //         display: "block",
  //       });
  //     } else {
  //       // Uncheck, hide entries
  //       entry.hide();
  //     }
  //   });
  // });

  document.addEventListener("DOMContentLoaded", function () {
    const dirList = document.querySelector(".dragbox__content__list--dir");
    const fileList = document.querySelector(".dragbox__content__list--files");
    const dirs = dirList.querySelectorAll(".entry__btn");
    const files = fileList.querySelectorAll(".entry__btn");

    dirs.forEach(function (btn) {
      btn.checked = false;
      btn.addEventListener("change", function () {
        const entries =
          this.nextElementSibling.nextElementSibling.querySelectorAll(
            ":scope > .entry"
          );

        entries.forEach(function (entry) {
          entry.style.display = btn.checked ? "block" : "none";
        });
      });
    });

    files.forEach(function (btn) {
      btn.addEventListener("change", function () {
        files.forEach(function (otherBtn) {
          if (otherBtn !== btn) {
            otherBtn.checked = false;
            otherBtn.parentElement.classList.remove("selected");
          }
        });

        if (btn.checked) {
          btn.parentElement.classList.add("selected");
        } else {
          btn.parentElement.classList.remove("selected");
        }
      });
    });
  });
})();

//imgDisplay
const imgDisplay = (() => {
  const canvas = document.getElementById("imgDisplay");
  const container = document.getElementById("imgDisplay-container");
  const ctx = canvas.getContext("2d");
  let img;

  function resizeCanvas(imgW, imgH) {
    const canvasW = canvas.width;
    const canvasH = canvas.height;

    // Set canvas dimensions to match container
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    // Calculate aspect ratio
    const containerRatio = canvasW / canvasH;
    const imgRatio = imgW / imgH;

    let scale = 1;

    if (imgRatio > containerRatio) {
      scale = canvasW / imgW;
    } else {
      scale = canvasH / imgH;
    }

    const scaledW = imgW * scale;
    const scaledH = imgH * scale;

    // Clear the canvas
    ctx.clearRect(0, 0, canvasW, canvasH);

    // Draw the image
    const x = (canvasW - scaledW) / 2;
    const y = (canvasH - scaledH) / 2;
    ctx.drawImage(img, x, y, scaledW, scaledH);

    // Construct RGB color string
    const bgColor = getImgBgColor(img, x, y, scaledW, scaledH);
    canvas.style.backgroundColor = bgColor;

    // Add event listener for window resize
    window.addEventListener("resize", () => draw(img.src)); // Redraw with same image source
  }

  function draw(imgSrc) {
    img = new Image();

    // Set canvas size initially
    img.onload = () => resizeCanvas(img.width, img.height);

    img.src = imgSrc;
  }

  function getImgAvgColor(img, x, y, w, h) {
    // Draw the image onto an off-screen canvas
    const offScCanvas = document.createElement("canvas");
    const offScCtx = offScCanvas.getContext("2d");
    offScCanvasW = w;
    offScCanvasH = h;
    offScCtx.drawImage(img, -x, -y, img.width, img.height);

    // Get the pixel data
    const imageData = offScCtx.getImageData(0, 0, w, h).data;

    let ttlR = 0;
    let ttlG = 0;
    let ttlB = 0;

    // Calculate the average color
    for (let i = 0; i < imageData.length; i += 4) {
      ttlR += imageData[i];
      ttlG += imageData[i + 1];
      ttlB += imageData[i + 2];
    }

    const pxCount = imageData.length / 4;
    const avrgR = Math.round(ttlR / pxCount);
    const avrgG = Math.round(ttlG / pxCount);
    const avrgB = Math.round(ttlB / pxCount);

    return `rgb(${avrgR},${avrgG},${avrgB})`;
  }

  function getImgBgColor(img, x, y, w, h) {
    // Draw the image onto an off-screen canvas
    const offScCanvas = document.createElement("canvas");
    const offScCtx = offScCanvas.getContext("2d");
    offScCanvasW = w;
    offScCanvasH = h;
    offScCtx.drawImage(img, -x, -y, img.width, img.height);

    // Get the pixel data
    const pxData = offScCtx.getImageData(0, 0, w, h).data;

    // Extract RGB values
    const r = pxData[0];
    const g = pxData[1];
    const b = pxData[2];

    return `rgb(${r},${g},${b})`;
  }

  return {
    draw: draw,
  };
})();
