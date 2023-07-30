const imgs = [
  document.getElementById("bstrwbrry"),
  document.getElementById("flower"),
  document.getElementById("freckle"),
  document.getElementById("pJ"),
];

// Event handler for image load
const handleImgLoad = (img) => {
  img.style.display = "inline";
};

// Event handler for image error
const handleImgError = (event) => {
  const img = event.target;
  img.src =
    "https://static.wikia.nocookie.net/minecraft_gamepedia/images/a/a1/Missing_Model_JE2.png";

  const errorElement = document.createElement("p");
  errorElement.textContent = "Error loading image";
  img.parentElement.appendChild(errorElement);

  console.error("Error loading image:", img.src);
};

// Add load and error event listeners to the images
imgs.forEach((img) => {
  img.addEventListener("load", handleImgLoad(img));
  img.addEventListener("error", handleImgError);
});
