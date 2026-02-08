const dateGather = () => {
  return new Date();
};

const pageName = location.pathname;

// var txts
function varTxtChck() {
  let txt = [
    "abobora revival lesgo",
    "we don't talk about the Great abobora-purge",
    "hiiiii",
    "yataaa mello-sama ^^",
    "omg nina hi!!!",
    "rebuilding...",
    "loading...",
    "See You Space Cowboy...",
    "hemlo",
    "hello everynyan",
    "don't work urself too much",
    "rewinding",
    "",
  ];

  const data = dateGather(),
    h = data.getHours(),
    dWeek = data.getDay(),
    M = data.getMonth(),
    d = data.getDate(),
    webMs = data.toLocaleTimeString("en", {
      hour12: false,
      hour: "numeric",
      timeZone: "America/Sao_Paulo",
    });

  // base seasonal/time conditions
  const add = (...msgs) => txt.push(...msgs);
  const clear = (...msgs) => (txt = msgs);

  if (webMs > 21 || webMs < 7) add("I'm (probably) sleeping");
  if (dWeek < 2) add("have a great week");
  else if (dWeek > 4) add("have a great weekend");

  //morning
  if (h < 9) add("an early bird aren't you?", "good morning");
  //night
  else if (h > 18 || h < 6) {
    add(
      "good night",
      "what a great night",
      "don't overwork yourself",
      "maybe get a glass of water",
      "what about going to bed early"
    );
    if (h > 23 || h < 5)
      add(
        "oh its dark",
        "we have an owl here uh",
        "don't neglect sleep... unless it's worth it"
      );
  }
  //?
  if (d == 23 && M == 7) return clear("Cake day");

  //xmas
  if (M == 11) {
    add(
      "getting chilly",
      "throw a snowball for me",
      "build a snowman!",
      "be sure u don't get a cold!",
      "hope I don't get coal",
      "hot chocolate sure would be nice now",
      "oh is it not snowing there? don't worry you're not alone"
    );
    if (d == 25) return clear("Merry Christmas !");
  }
  //hallow
  else if (M == 9) {
    add("Spooky Month !!!", "finally the pumpkin month");
    if (d == 31) {
      return clear(
        "Trick or Threat",
        "Trick or Treat",
        "eat a lot of candy",
        "beware of the candy snatcher",
        "boo",
        "behind you",
        "in a dark corner creeping . . .",
        "mismatched forms unseen in the dark",
        "seen any eyes in the shadows recently?"
      );
    }
  }
  return txt;
}

let txtI;
if (pageName.includes("index") || location.pathname === "/") {
  const txtList = varTxtChck();
  txtI = Math.floor(Math.random() * txtList.length);
}

const chckTime = (i) => (i < 10 ? "0" + i : i);

const options1 = {
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZoneName: "short",
  },
  options2 = {
    timeStyle: "short",
  };

const clock = document.getElementById("clock");

const tempo = () => {
  if (!clock) return;
  let date = dateGather();
  let [h, m, s] = [date.getHours(), date.getMinutes(), date.getSeconds()];

  //add zero to single number time
  if (h < 10) h = chckTime(h);

  m = chckTime(m);
  s = chckTime(s);

  let txt = varTxtChck();

  //check html for clock
  if (pageName.includes("index") || pageName === "/") {
    clock.innerHTML = `<div class="clock__time">${h}:${m}:${s}</div>
                       <div class="clock__date">${new Intl.DateTimeFormat(
                         "en-GB",
                         options1
                       ).format(date)}</div>
                       <p class="clock__txt">${txt[txtI]}</p>`;

    const clockTxt = document.querySelector(".clock__txt"),
      clockD = document.querySelector(".clock__date");

    if (h === m) {
      clockTxt.textContent = "woohoo twin time";
      if (s === h) clockTxt.textContent = "T R I P L E T S";
    }

    clockD.textContent = clockD.textContent.replace(/,/gi, "");
  } else if (pageName.includes("/pixelizer")) {
    clock.innerHTML = `<div class="clock__time">${new Intl.DateTimeFormat(
      undefined,
      options2
    ).format(date)}</div>`;
  }

  setTimeout(tempo, 1000);
};
tempo();
