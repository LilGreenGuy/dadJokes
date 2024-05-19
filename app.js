const dadButton = document.querySelector("#dadButton");

const createDadJoke = async () => {
    const dadJoke = await getDadJoke()
    const dadBox = document.querySelector("#dadBox");
    dadBox.innerHTML = dadJoke;
    const randomColor = () => Math.floor(Math.random() * 256)
    dadBox.style.color = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`
}
dadButton.addEventListener("click", () => createDadJoke())

const getDadJoke = async () => {
    try {
        const config = { headers: { Accept: "application/json" } }
        const res = await axios.get("https://icanhazdadjoke.com/", config);
        console.log(res.data)
        return res.data.joke;
    } catch(e) {
        return "No jokes available! Sorry, dad's out buying a fresh pair of New Balances."
    }
}