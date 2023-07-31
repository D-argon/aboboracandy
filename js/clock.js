let clock = document.getElementById('clock');
let clockH = document.getElementById('clock__hour');
let clockD = document.getElementById('clock__date');
let clockTxt = document.getElementById('clock__txt');

const txt = [
    "Welcome!",
    "Hey there",
    "pumpkin !",
    ":3",
    '<a class="links" href="https://youtu.be/MPUCEz-RCg0">ChuuChuu Lovely MuniMuni MuraMura</a>',
    "La luna roja",
    "i'm not in Agora Road",
    "Neon Genesis Evangelion"
]

let txtN = Math.round(Math.random() * txt.length);

const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

function chckTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}

const tempo = () => {
    let date = new Date();
    
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let y = date.getFullYear();
    let M = date.getMonth();
    let d = date.getDate();
    let D = date.getDay();
    
    if (h < 10) {
        h = chckTime(h);
    }
    
    m = chckTime(m);
    s = chckTime(s);

    // if (h < 6 || h > 21) {
    //     txt.push('Hope');
    // }
    // Do variables

    clock.innerHTML = `<div class="clock__time">${h}:${m}:${s}</div>
                       <div class="clock__date">${dayNames[D]} ${d}/${M + 1}/${y}</div>
                       <div class="clock__txt">${txt[txtN]}</div>`;

    setTimeout(tempo, 1000);
};
tempo();
