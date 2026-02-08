const DC = document.getElementById('dc');

document.getElementById('abobora').addEventListener('click', (e) => {
  navigator.clipboard.writeText(document.querySelector('.imgWrapper').innerHTML);
  e.preventDefault();
});

DC.addEventListener('click', (e) => {
  navigator.clipboard.writeText(DC.innerText);
  e.preventDefault();
});