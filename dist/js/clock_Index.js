(() => {
  // var txts
  function varTxtChck() {
    let txt = [
      "abobora revival lesgo",
      "straight up Turing it. haha",
      ":3", // 3
      "Hello World !",
      "we don't talk about the Great abobora-purge.",
      "Nerd alert !",
      "fix ur posture yo",
      "this website is Miku approved",
      ",':/",
      "hiiiii",
      "ermm",
      "rebuilding...",
      "omg nina hi!!!", // 13
      "what ab a glass of water ?",
      "loading...",
      "See You Space Cowboy...",
      "what we doin today ?",
      "hemlo",
      "don't be an asshole !",
      "hello everynyan",
      "don't work urself too much",
      "rewinding",
      "yataaa mello-sama ^^", // 23
      "one must imagine aboboras.",
      "forgot what I was saying",
      "etoo... bleh :P",
      ":P",
      "(˶^ ᵕ^(˃દ ˂ ˶)",
      "rawr",
      "xD",
      "YES. krilly IS getting paid.",
      "it all starts with a pgp key",
      "cat cafe? don't know what u talkin ab",
      "go man, go !",
      "me when tamanho de (gato)",
      "grow a digital garden in neocities !",
      "cybersec is never too much",
      '<a class="link" href="/feed.xml"><img src="/imgs/media/rss.png"></a>',
      '<a class="link" href="https://inv.nadeko.net/watch?v=VgDgWzBL7s4" target="_blank" rel="noopener noreferrer">Rock lee vs Gaara - Linkin park</a>',
      "pútrida rosa",
      "broken rose",
      "senhora (em)piedosa",
    ];

    const data = new Date(),
      h = data.getHours(),
      dWeek = data.getDay(),
      M = data.getMonth(),
      d = data.getDate(),
      webMs = data.toLocaleTimeString("en", {
        hour12: false,
        hour: "numeric",
        timeZone: "America/Sao_Paulo",
      });

    // conditions
    const add = (...msgs) => txt.push(...msgs);
    const clear = (...msgs) => (txt = msgs);

    // specials
    slang = [
      "boymodder envying yungshit",
      "heard she was manmodder agp",
      "now complimenting is hugboxxing",
    ];
    add(slang[Math.floor(Math.random() * 3)]);

    add(
      `<div class="specials"><div class="specials--content" data-text="yataaa mello-sama ^^ (˶^ ᵕ^(˃દ ˂ ˶)">yataaa mello-sama ^^ (˶^ ᵕ^(˃દ ˂ ˶)</div></div>`,
      `<div class="specials"><div class="specials--content" data-text="omg nina hi!!! rawr xD">omg nina hi!!! rawr xD</div></div>`
    );

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
          "right behind you",
          "I found you",
          "you found me",
          "in a dark corner creeping . . .",
          "mismatched forms unseen in the dark",
          "seen any eyes in the shadows recently?",
          "⋆｡°✩🎃✩°｡⋆"
        );
      }
    }
    return txt;
  }

  const clock = document.getElementById("clock");
  clock.innerHTML = `
  <div class="clock__time"></div>
  <div class="clock__date"></div>
  <p class="clock__txt"></p>
`;

  const clockTime = clock.querySelector(".clock__time");
  const clockDate = clock.querySelector(".clock__date");
  const clockTxt = clock.querySelector(".clock__txt");

  let txtList = varTxtChck();
  let txtI = Math.floor(Math.random() * txtList.length);

  clockTxt.innerHTML = txtList[txtI];
  const txtBtn = document.getElementById("txtReset");

  txtBtn.addEventListener("click", () => {
    clockTxt.innerHTML = txtList[Math.floor(Math.random() * txtList.length)];
  });

  function tempo() {
    if (!clock) return;

    const date = new Date();
    let [h, m, s] = [
      date.getHours().toString().padStart(2, "0"),
      date.getMinutes().toString().padStart(2, "0"),
      date.getSeconds().toString().padStart(2, "0"),
    ];

    clockTime.textContent = `${h}:${m}:${s}`;
    clockDate.textContent = new Intl.DateTimeFormat("en-GB", {
      weekday: "short",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZoneName: "short",
    })
      .format(date)
      .replace(/,/g, "");

    if (h === m) {
      clockTxt.textContent = "woohoo twin time";
      if (s === h) clockTxt.textContent = "T R I P L E T S";
    }

    setTimeout(tempo, 1000);
  }
  tempo();
})();
