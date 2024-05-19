const dadButton = document.querySelector("#dadButton");
dadButton.addEventListener("click", () => getDadJoke())

const getDadJoke = async () => {
    const dadBox = document.querySelector("#dadBox");
    const config = {headers: {Accept: "application/json"}}
    const res = await axios.get("https://icanhazdadjoke.com/", config);
    const dadJoke = res.data.joke;
    dadBox.innerHTML = dadJoke;
    const randomColor = () => Math.floor(Math.random() * 256)
    dadBox.style.color = `rgb(${randomColor()}, ${randomColor()}, ${randomColor()})`
    console.log(res.data)
}