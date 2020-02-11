const endpoint = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json";

let menu = [];

let filter = "alle";

document.addEventListener("DOMContentLoaded", start);

window.addEventListener("load", sidenVises)

function start() {
    loadData();
    buttons();
}

async function loadData() {
    const response = await fetch(endpoint);
    console.log(response);
    menu = await response.json();
    console.log(menu);

    visMenu();
}

function visMenu() {
    const listevisning = document.querySelector(".data-container");
    const template = document.querySelector("template");

    listevisning.innerHTML = "";

    menu.feed.entry.forEach(mad => {
        if (filter == "alle" || filter == mad.gsx$kategori.$t) {

            let klon = template.cloneNode(true).content;

            klon.querySelector("img").src = "imgs/small/" + mad.gsx$billede.$t + "-sm.jpg";
            klon.querySelector("img").alt = "billede af" + mad.gsx$navn.$t;

            klon.querySelector("#navn").textContent = mad.gsx$navn.$t;
            klon.querySelector("#p1").textContent = mad.gsx$kort.$t;
            klon.querySelector("#pris").textContent = mad.gsx$pris.$t;

            listevisning.appendChild(klon);
        }
    })
}

function buttons() {
    document.querySelectorAll(".filter").forEach(elm => {
        elm.addEventListener("click", filtrering);
    })
}

function filtrering() {
    filter = this.dataset.kategori;
    document.querySelector("h1").textContent = this.textContent;
    document.querySelectorAll(".filter").forEach(elm => {
        elm.classList.remove("valgt");
    })

    this.classList.add("valgt");
    visMenu();
}

function sidenVises() {
    console.log("sidenVises");
    document.querySelector("#menuknap").addEventListener("click", toggleMenu);
}

function toggleMenu() {
    console.log("toggleMenu");
    document.querySelector("#menu").classList.toggle("hidden");

    let erSkjult = document.querySelector("#menu").classList.contains("hidden");
    if (erSkjult == true) {
        document.querySelector("#menuknap").textContent = "☰";
    } else {
        document.querySelector("#menuknap").textContent = "X";
    }
}
