// ----------- Drag
let dragboxes = document.querySelectorAll(".dragbox");
//add dragg to all
dragboxes.forEach((dragbox) => {
  dragElement(dragbox);
  dragbox.addEventListener("mousedown", bringFront);
});

//sets positions
function dragElement(elmnt) {
  let pos1, pos2, pos3, pos4;

  let header = elmnt.querySelector(".dragbox__header");

  if (header) {
    header.addEventListener("mousedown", dragMouseDown);
  } else {
    elmnt.addEventListener("mousedown", dragMouseDown);
  }

  function dragMouseDown(e) {
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    // call a function whenever the cursor moves:
    document.addEventListener("mousemove", elementDrag);
  }

  function elementDrag(e) {
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = elmnt.offsetTop - pos2 + "px";
    elmnt.style.left = elmnt.offsetLeft - pos1 + "px";

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", elementDrag);
    });
  }
}

let hZIndex = 0;

function bringFront() {
  hZIndex++;

  this.style.zIndex = hZIndex;
}

// ---------------------- close/open ---------------

const container = document.querySelector(".container__box");
const txtico = document.getElementById("txtico");
const doctxtHTML = document.getElementById("doc-txt").innerHTML;

let isOpen = true;
//close/open modal
// Attach click event listener to a common ancestor element
container.addEventListener("dblclick", (e) => {
  // Check if the clicked element has the class "txtico"
  if (e.target.parentElement.getAttribute("id") === "txtico") {
    toggleTxtBox();
  }
  rmAllActive();
});

container.addEventListener("click", (e) => {
  // Check if the clicked element has the class "txtico"
  if (e.target.parentElement.classList.contains("btn-div")) {
    rmAllActive();
    e.target.parentElement.classList.add("iconActive");
  } else if (!e.target.parentElement.classList.contains("btn-div")) {
    rmAllActive();
  }

  if (e.target.getAttribute("id") === "dragbox-close") {
    if (
      e.target.parentElement.parentElement.parentElement.getAttribute("id") ===
      "pixelizer-dragbox"
    ) {
      alert(">:(");
    } else {
      e.target.parentElement.parentElement.parentElement.remove();
      isOpen = false;
    }
  }
});

function rmAllActive() {
  document.querySelectorAll(".btn-div").forEach((btn) => {
    btn.classList.remove("iconActive");
  });
}

function toggleTxtBox() {
  if (!isOpen) {
    isOpen = true;
    let newDoctxt = document.createElement("div");
    newDoctxt.innerHTML = doctxtHTML;

    container.appendChild(newDoctxt);
    newDoctxt.setAttribute("id", "doc-txt");
    newDoctxt.classList.add("dragbox");

    dragElement(newDoctxt); //add to listener
    newDoctxt.addEventListener("mousedown", bringFront);
  }
}

// // --------------------- resize

// const resizeHandle = dragboxes[0].matches("::before");
// const dragbox = document.getElementById("doc-txt");

// let isResizing = false;

// resizeHandle.addEventListener("mousedown", (e) => {
//   isResizing = true;
//   const initialX = e.clientX;
//   const initialWidth = dragbox.offsetWidth;

//   document.addEventListener("mousemove", resize);
//   document.addEventListener("mouseup", stopResize);

//   function resize(e) {
//     if (!isResizing) return;

//     const newWidth = initialWidth + e.clientX - initialX;
//     dragbox.style.width = newWidth + "px";
//   }

//   function stopResize() {
//     isResizing = false;
//     document.removeEventListener("mousemove", resize);
//     document.removeEventListener("mouseup", stopResize);
//   }
// });
