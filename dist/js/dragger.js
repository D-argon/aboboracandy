// ----------- Drag
let dragboxes = document.querySelectorAll(".dragbox");
//add drag to all
dragboxes.forEach((dragbox) => {
  dragElement(dragbox);
  dragbox.addEventListener("mousedown", bringFront);
});

//sets positions
function dragElement(elmnt) {
  let pos1, pos2, pos3, pos4;

  const header = elmnt.querySelector(".dragbox__top--header");

  header.addEventListener("mousedown", dragMouseDown);

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
const txtico = document.getElementsByClassName("txtico");

const txtToDo = document.getElementById("txtToDo");
const txtJournal = document.getElementById("txtJournal");

txtJournal.classList.remove("hidden");
const txtJournalHTML = document.getElementById("txtJournal").innerHTML;
txtJournal.classList.add("hidden");

const txtToDoHTML = document.getElementById("txtToDo").innerHTML;

let isToDoOpen = true;
let isJournalOpen = false;

//close/open modal
// Attach click event listener to a common ancestor element
container.addEventListener("dblclick", (e) => {
  // Check dblclicked parent's id
  if (e.target.parentElement.getAttribute("id") === "toDoIco") {
    toggleTxtToDo();
  } else if (e.target.parentElement.getAttribute("id") === "journalIco") {
    toggleTxtJournal();
  }
  rmAllActive();
});

container.addEventListener("click", (e) => {
  const eParent = e.target.parentElement;
  const btnsDragbox = e.target.parentElement.parentElement.parentElement;

  // Check clicked parent's class
  if (eParent.classList.contains("btn-div")) {
    rmAllActive();
    eParent.classList.add("iconActive");
  } else if (!eParent.classList.contains("btn-div")) {
    rmAllActive();
  }

  if (e.target.getAttribute("id") === "dragbox-close") {
    if (btnsDragbox.getAttribute("id") === "pixelizer-dragbox") {
      alert(">:(");
    } else {
      btnsDragbox.remove();
      if (btnsDragbox.getAttribute("id") === "txtToDo") {
        isToDoOpen = false;
      } else if (btnsDragbox.getAttribute("id") === "txtJournal") {
        isJournalOpen = false;
      }
    }
  }
});

function rmAllActive() {
  document.querySelectorAll(".btn-div").forEach((btn) => {
    btn.classList.remove("iconActive");
  });
}

function toggleTxtToDo() {
  if (!isToDoOpen) {
    isToDoOpen = true;
    let newDoctxt = document.createElement("div");
    newDoctxt.innerHTML = txtToDoHTML;

    container.appendChild(newDoctxt);
    newDoctxt.setAttribute("id", "txtToDo");
    newDoctxt.classList.add("dragbox");

    dragElement(newDoctxt); //add to listener
    newDoctxt.addEventListener("mousedown", bringFront);
  }
}

function toggleTxtJournal() {
  if (!isJournalOpen) {
    isJournalOpen = true;
    let newDoctxt = document.createElement("div");
    newDoctxt.innerHTML = txtJournalHTML;

    container.appendChild(newDoctxt);
    newDoctxt.setAttribute("id", "txtJournal");
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
