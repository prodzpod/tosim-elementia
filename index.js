let txt = "";
window.onload = function() {
    render("title", "tosim elementija");
}

const REPLS = {"b": "p", "d": "t", "g": "k", "c": "k", "y": "j", "h": "x", "ŋ": "ng", "w": "v"};
function repl(_char) {
    let char = _char;
    if (!char?.length) return "";
    char = char.toLowerCase();
    if (txt.at(-2) === "n" && char === "g") return char;
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