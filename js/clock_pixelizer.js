(() => {
  const clock = document.getElementById("clock");
  clock.innerHTML = `<div class="clock__time">${new Intl.DateTimeFormat(
    undefined,
    { timeStyle: "short" }
  ).format(new Date())}</div>`;

  const clockTime = clock.querySelector(".clock__time");

  function tempo() {
    if (!clock) return;
    let date = new Date();
    let [h, m] = [
      date.getHours().toString().padStart(2, "0"),
      date.getMinutes().toString().padStart(2, "0"),
    ];
    clockTime.textContent = `${h}:${m}`;

    setTimeout(tempo, 1000);
  }
  tempo();
})();
