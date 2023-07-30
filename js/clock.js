let clock = document.getElementById('clock');

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

    const dayNames = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
    ];
    
    if (h < 10) {
        h = chckTime(h);
    }
    
    m = chckTime(m);
    s = chckTime(s);

    clock.innerHTML = `<p>${h}:${m}:${s} \ ${dayNames[D]} ${d}/${M + 1}/${y}</p><p>Have a great night</p>`;
    setTimeout(tempo, 1000);
};
tempo();