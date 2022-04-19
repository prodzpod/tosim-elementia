let txt = "";
window.onload = function() {
    render("title", "tosim elementija");
    document.getElementById("mobile").focus();
}

const REPLS = {"b": "p", "d": "t", "g": "k", "c": "k", "y": "j", "h": "x", "ŋ": "ng", "w": "v"};
function repl(_char) {
    let char = _char;
    if (!char?.length) return "";
    char = char.toLowerCase();
    if (txt.at(-1) === "n" && char === "g") return char;
    return REPLS[char] ?? char;
}

const CHARS = ["a", "e", "i", "ja", "je", "ji", "jo", "ju", "k", "ka", "ke", "ki", "ko", "ku", "l", "la", "le", "li", "lo", "lu", "m", "ma", "me", "mi", "mo", "mu", "n", "na", "ne", "ng", "nga", "nge", "ngi", "ngo", "ngu", "ni", "no", "nu", "o", "p", "pa", "pe", "pi", "po", "pu", "r", "ra", "re", "ri", "ro", "ru", "s", "sa", "se", "si", "so", "space", "su", "t", "ta", "te", "ti", "to", "tu", "u", "v", "va", "ve", "vi", "vo", "vu", "x", "xa", "xe", "xi", "xo", "xu"];
const VOWEL = ["a", "e", "i", "o", "u"];
function render(id, txt) {
    let el = document.getElementById(id);
    while (el.firstChild) el.removeChild(el.firstChild);
    for (let ptr = 0; ptr < txt.length; ptr++) {
        let char = txt[ptr];
        if (char === " ") char = "space";
        else {
            if (char === "n" && txt[ptr+1] === "g") { char += txt[ptr+1]; ptr++; }
            if (char === "y" && VOWEL.includes(txt[ptr+1])) { char += txt[ptr+1]; ptr++; }
            else if (!VOWEL.includes(char) && VOWEL.includes(txt[ptr+1])) { char += txt[ptr+1]; ptr++; }
        }
        if (!CHARS.includes(char)) continue;
        let img = document.createElement("img");
        img.src = "./img/" + char + ".png";
        el.appendChild(img);
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === "Backspace") txt = txt.slice(0, -1);
    else if (event.key === "Space") txt += " ";
    else if (event.key.length === 1) txt += repl(event.key[0]);
    render("input", txt);
    document.getElementById("input-type").innerHTML = txt;
}, false);

function updateTheme() {
    let bg = document.getElementById("bg").value;
    let text = document.getElementById("text").value;
    document.querySelector(':root').style.setProperty('--bg', bg);
    document.querySelector(':root').style.setProperty('--color', text);
    let hsv = RGBtoHSV(parseInt(text.slice(1, 2), 16), parseInt(text.slice(3, 4), 16), parseInt(text.slice(5, 6), 16));
    document.querySelector(':root').style.setProperty('--color-h', (hsv.h * 360 - 80) + "deg");
    document.querySelector(':root').style.setProperty('--color-s', (hsv.s * 100) + "%");
    document.querySelector(':root').style.setProperty('--color-v', (hsv.v * 1700) + "%");
    console.log(bg, text, hsv);
}

function RGBtoHSV(r, g, b) {
    if (arguments.length === 1) {
        g = r.g, b = r.b, r = r.r;
    }
    var max = Math.max(r, g, b), min = Math.min(r, g, b),
        d = max - min,
        h,
        s = (max === 0 ? 0 : d / max),
        v = max / 255;

    switch (max) {
        case min: h = 0; break;
        case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
        case g: h = (b - r) + d * 2; h /= 6 * d; break;
        case b: h = (r - g) + d * 4; h /= 6 * d; break;
    }

    return {
        h: h,
        s: s,
        v: v
    };
}