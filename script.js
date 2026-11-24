const STORAGE_KEY = "kamusDayakTobak";

let words = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]"
);

let activeLetter = "Semua";

function saveData() {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(words)
    );
}

function showAlphabet() {
    const alphabet = document.getElementById("alphabet");

    alphabet.innerHTML = "";

    ["Semua", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"].forEach(letter => {
        const button = document.createElement("button");

        button.textContent = letter;
        button.className =
            activeLetter === letter ? "active" : "";

        button.onclick = () => {
            activeLetter = letter;
            showAlphabet();
            showWords();
        };

        alphabet.appendChild(button);
    });
}

function showWords() {
    const search = document.getElementById("search")
        .value.toLowerCase();

    const container = document.getElementById("words");

    const filtered = words
        .filter(item =>
            item.word.toLowerCase().includes(search) ||
            item.meaning.toLowerCase().includes(search)
        )
        .filter(item =>
            activeLetter === "Semua" ||
            item.word.toUpperCase().startsWith(activeLetter)
        )
        .sort((a, b) => a.word.localeCompare(b.word));

    container.innerHTML = "";

    document.getElementById("count").textContent =
        filtered.length + " kosakata";

    if (filtered.length === 0) {
        container.textContent = "Kosakata belum ditemukan.";
        return;
    }

    filtered.forEach(item => {
        const card = document.createElement("div");
        card.className = "word-card";

        const title = document.createElement("h3");
        title.textContent = item.word;

        const meaning = document.createElement("p");
        meaning.textContent = item.meaning;

        card.appendChild(title);
        card.appendChild(meaning);

        container.appendChild(card);
    });
}

document.getElementById("wordForm")
    .addEventListener("submit", function(event) {

    event.preventDefault();

    const word = document.getElementById("dayakWord")
        .value.trim();

    const meaning = document.getElementById("indoMeaning")
        .value.trim();

    if (!word || !meaning) return;

    words.push({
        word: word,
        meaning: meaning
    });

    saveData();

    this.reset();

    activeLetter = "Semua";
    showAlphabet();
    showWords();

    alert("Kosakata berhasil disimpan!");
});

document.getElementById("search")
    .addEventListener("input", showWords);

showAlphabet();
showWords();