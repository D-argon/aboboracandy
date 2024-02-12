const dateGather = () => {
  return new Date();
};

const pageName = location.pathname;

let txt = [
  "Welcome!",
  "Hey there",
  "pumpkin !",
  ":3",
  '<a class="links" href="https://youtu.be/MPUCEz-RCg0" target="_blank">ChuuChuu Lovely MuniMuni MuraMura</a>',
  "i'm not in Agora Road",
  "a Neocities district",
  "Present Day",
  "Hii Nina!!",
  "Miku approved website",
  '<a class="links" href="https://open.spotify.com/track/1y0gwA03lGnTMB6f8LH187?si=ae21d30e9b664cde" target="_blank">Ants that raised their head like hounds</a>',
  "Present Time",
  '<a class="links" href="https://youtu.be/Yw6u6YkTgQ4" target="_blank">Hello World!</a>',
  'you should check <a class="links" href="https://i.redd.it/ynmktgcyd4u61.jpg" target="_blank">this</a>',
  ":P",
  "O-O",
  ":]",
  "don't be an asshole",
  "See you Space Cowboy",
  "Unwinding",
];

let txtI;
function txtRndm() {
  txtI = Math.round(Math.random() * (txt.length - 1));
}

// var txts
function varTxtChck() {
  let h = dateGather().getHours();
  let dWeek = dateGather().getDay();
  let M = dateGather().getMonth();
  let d = dateGather().getDate();
  let webMs = dateGather().toLocaleTimeString("en", {
    hour12: false,
    hour: "numeric",
    timeZone: "America/Sao_Paulo",
  });

  if (webMs > 21 || webMs < 7) {
    txt.push("I'm (probably) sleeping");
  }
  //week start
  if (dWeek < 2) {
    txt.push("have a great week");
  }
  //end
  else if (dWeek > 4) {
    txt.push("have a great weekend");
  }

  //morning
  if (h < 9) {
    txt.push("an early bird aren't you?", "good morning");
  }
  //night
  else if (h > 18 || h < 6) {
    txt.push(
      "good night",
      "what a great night",
      "don't overwork yourself",
      "maybe get a glass of water",
      "what about going to bed early"
    );
    if (h > 23 || h < 5) {
      txt.push(
        "oh its dark",
        "we have an owl here uh",
        "don't neglect sleep... unless its worth"
      );
    }
  }
  //?
  if (d == 23 && M == 7) {
    txt.splice(0);
    txt.push("Cake day");
  }

  //xmas
  if (M == 11) {
    txt.push(
      "getting chilly",
      "throw a snowball for me",
      "build a snowman!",
      "be sure to not get a cold!",
      "hope I don't get a coal",
      "hot chocolate sure would be nice now",
      "oh is it not snowing there? don't worry you're not alone"
    );
    if (d == 25) {
      txt.splice(0);
      txt.push("Merry Christmas !");
    }
  }
  //hallow
  else if (M == 9) {
    txt.push("Spooky Month !!!", "finally the pumpkin month");
    if (d == 31) {
      txt.splice(0);
      txt.push(
        "Trick or Threat",
        "Trick or Treat",
        "eat a lot of candy",
        "beware of the candy snatcher",
        "boo",
        "behind you",
        "in a dark corner creeping...",
        "mismatched forms unseen in the dark",
        "seen any eye in the shadows recently?"
      );
    }
  }
}

if (pageName.includes("index") || location.pathname === "/") {
  varTxtChck();
  txtRndm();
}

function chckTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

const options1 = {
  weekday: "short",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZoneName: "short",
};

const options2 = {
  timeStyle: "short",
};

const clock = document.getElementById("clock");

const tempo = () => {
  let date = dateGather();

  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  //add zero to single number time
  if (h < 10) {
    h = chckTime(h);
  }
  m = chckTime(m);
  s = chckTime(s);

  //check html for clock
  if (pageName.includes("index") || pageName === "/") {
    clock.innerHTML = `<div class="clock__time">${h}:${m}:${s}</div>
                       <div class="clock__date">${new Intl.DateTimeFormat(
                         "en-GB",
                         options1
                       ).format(date)}</div>
                       <p class="clock__txt">${txt[txtI]}</p>`;

    const clockTxt = document.querySelector(".clock__txt");
    const clockD = document.querySelector(".clock__date");

    if (h === m) {
      clockTxt.textContent = "woohoo twin time";
      if (s === h) {
        clockTxt.textContent = "T R I P L E T S";
      }
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
