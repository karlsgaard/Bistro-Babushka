let menu = [];

let filter = "alle";

const detalje = document.querySelector("#detalje");

const endpoint = "https://spreadsheets.google.com/feeds/list/17Dd7DvkPaFamNUdUKlrFgnH6POvBJXac7qyiS6zNRw0/od6/public/values?alt=json";

document.addEventListener("DOMContentLoaded", start);

document.querySelector("#menuknap").addEventListener("touched", toggleMenu);

document.querySelector("#menuknap").addEventListener("click", toggleMenu);

window.addEventListener("load", sidenVises)

function start() {
    loadData();
    buttons();
    detalje.classList.add("luk")
}

async function loadData() {
    const response = await fetch(endpoint);
    console.log(response);
    menu = await response.json();
    console.log(menu);
    visMenu();
}

//function visMenu() {
//    const listevisning = document.querySelector(".data-container");
//    const template = document.querySelector("template");
//
//    listevisning.innerHTML = "";
//
//    menu.feed.entry.forEach(mad => {
//        if (filter == "alle" || filter == mad.gsx$kategori.$t) {
//
//            let klon = template.cloneNode(true).content;
//
//            klon.querySelector("img").src = "imgs/small/" + mad.gsx$billede.$t + "-sm.jpg";
//            klon.querySelector("img").alt = "billede af" + mad.gsx$navn.$t;
//
//            klon.querySelector("#navn").textContent = mad.gsx$navn.$t;
//            klon.querySelector("#p1").textContent = mad.gsx$kort.$t;
//            klon.querySelector("#pris").textContent = mad.gsx$pris.$t;
//
//            listevisning.appendChild(klon);
//        }
//    })
//}

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

            klon.querySelector("#pris").textContent = mad.gsx$pris.$t + ",-";

            klon.querySelector("article").addEventListener("click", visDetalje(mad));
            klon.querySelector("article").addEventListener("click", skjulDetalje);

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
    visMenu();
    document.querySelector("h1").textContent = this.textContent;
    document.querySelectorAll(".filter").forEach(elm => {
        elm.classList.remove("valgt");
    })

    this.classList.add("valgt");
}

function skjulDetalje() {
    detalje.classList.remove("luk");
}

function visDetalje(mad) {
    detalje.querySelector("button").addEventListener("click", () => detalje.classList.add("luk"));
    detalje.querySelector("img").src = `imgs/large/${mad.gsx$billede.$t}.jpg`;
    detalje.querySelector("h2").textContent = mad.gsx$navn.$t;
}


function sidenVises() {
    console.log("sidenVises");
    document.querySelector("#menuknap").addEventListener("click", toggleMenu);
}

//function toggleMenu() {
//    console.log("toggleMenu");
//    document.querySelector("#menu").classList.toggle("hidden");
//
//    let erSkjult = document.querySelector("#menu").classList.contains("hidden");
//    if (erSkjult == true) {
//        document.querySelector("#menuknap").textContent = "☰";
//    } else {
//        document.querySelector("#menuknap").textContent = "X";
//    }
//}

function toggleMenu() {
    console.log("menu pressed");
    this.classList.toggle("menu_luk");
    let x = document.querySelector("#filter_menu");
    if (x.style.display === "block") {
        x.style.display = "none";

        document.querySelector("#menu").textContent = "☰";
    } else {
        x.style.display = "block";
        document.querySelector("#menu").textContent = "X";
    }
}
