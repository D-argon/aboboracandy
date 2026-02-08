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

  function resizeCanvas(img) {
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    const cW = canvas.width,
      cH = canvas.height;

    const iw = img.width,
      ih = img.height;

    const canvasRatio = cW / cH,
      imgRatio = iw / ih;

    let drawW, drawH;
    if (imgRatio > canvasRatio) {
      drawW = cW;
      drawH = cW / imgRatio;
    } else {
      drawH = cH;
      drawW = cH * imgRatio;
    }

    const offsetX = (cW - drawW) / 2,
      offsetY = (cH - drawH) / 2;

    ctx.clearRect(0, 0, cW, cH);
    ctx.drawImage(img, offsetX, offsetY, drawW, drawH);
    canvas.style.backgroundColor = getImgBgColor(img, 0, 0, cW, cH);
  }

  const cache = {};
  function draw(src) {
    if (cache[src]) {
      img = cache[src];
      resizeCanvas(img);
      return;
    }

    img = new Image();
    img.onload = () => {
      cache[src] = img;
      resizeCanvas(img);
    };
    img.src = src;
  }

  function getImgBgColor(img, x, y, w, h) {
    // Draw the image onto an off-screen canvas
    const offScCanvas = document.createElement("canvas");
    const offScCtx = offScCanvas.getContext("2d");

    offScCtx.drawImage(img, -x, -y, img.width, img.height);

    // Get the pixel data
    const pxData = offScCtx.getImageData(0, 0, w, h).data;

    // Extract RGB values
    const r = pxData[0];
    const g = pxData[1];
    const b = pxData[2];

    return `rgb(${r},${g},${b})`;
  }

  document.querySelectorAll(".entry__btn + label").forEach((label) => {
    const src = label.getAttribute("data-img");
    label.addEventListener("click", () => imgDisplay.draw(src));
  });

  return {
    draw: draw,
  };
})();
