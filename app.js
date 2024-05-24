const dadButton = document.querySelector("#dadButton");
const background = document.querySelector("body");
const header = document.querySelector("#dadHeader");
const button = document.querySelector("#dadButton");

const createDadJoke = async () => {
    const dadJoke = await getDadJoke();
    const dadBox = document.querySelector("#dadBox");
    dadBox.innerHTML = dadJoke;
    function randomizeColor() {
        const randomColorNumber = () => Math.floor(Math.random() * 256);
        const r = randomColorNumber();
        const g = randomColorNumber();
        const b = randomColorNumber();
        return jokeColor = new Color(r, g, b);
    }
    randomizeColor();
    dadBox.style.color = jokeColor.rgb();
    background.style.backgroundColor = jokeColor.opposite();
    button.style.color = jokeColor.opposite();
    button.style.backgroundColor = jokeColor.rgb();
    header.style.color = jokeColor.rgb();
}

dadButton.addEventListener("click", () => createDadJoke())

const getDadJoke = async () => {
    try {
        const config = { headers: { Accept: "application/json" } }
        const res = await axios.get("https://icanhazdadjoke.com/", config);
        console.log(res.data);
        return res.data.joke;
    } catch (e) {
        return "No jokes available! Sorry, dad's out buying a fresh pair of New Balances.";
    }
}

class Color {
    constructor(r, g, b, name) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.name = name;
        this.calcHSL();
    }
    innerRGB() {
        const { r, g, b } = this;
        return `${r}, ${g}, ${b}`;
    }
    rgb() {
        return `rgb(${this.innerRGB()})`;
    }
    rgba(a = 1.0) {
        return `rgba(${this.innerRGB()}, ${a})`;
    }
    hex() {
        const { r, g, b } = this;
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }
    hsl() {
        const { h, s, l } = this;
        return `hsl(${h},${s}%, ${l}%)`;
    }
    fullySaturation() {
        const { h, l } = this;
        return `hsl(${h},100%, ${l}%)`;
    }
    opposite() {
        const { h, s, l } = this;
        const newHue = (h + 180) % 360
        return `hsl(${newHue},${s}%, ${l}%)`;
    }
    calcHSL() {
        let { r, g, b } = this;
        // Make r, g, and b fractions of 1
        r /= 255;
        g /= 255;
        b /= 255;

        // Find greatest and smallest channel values
        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;
        if (delta == 0) h = 0;
        else if (cmax == r)
            // Red is max
            h = ((g - b) / delta) % 6;
        else if (cmax == g)
            // Green is max
            h = (b - r) / delta + 2;
        else
            // Blue is max
            h = (r - g) / delta + 4;

        h = Math.round(h * 60);

        // Make negative hues positive behind 360°
        if (h < 0) h += 360;
        // Calculate lightness
        l = (cmax + cmin) / 2;

        // Calculate saturation
        s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

        // Multiply l and s by 100
        s = +(s * 100).toFixed(1);
        l = +(l * 100).toFixed(1);
        this.h = h;
        this.s = s;
        this.l = l;
    }
}
const c1 = new Color(255, 67, 89, "tomato");