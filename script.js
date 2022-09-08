const url = "https://database-4ee2.restdb.io/rest/skoudvalg ";
const mereinfo = {
  headers: {
    "x-apikey": "f19d5650d27a620e47987f0c68b8a6a4e5421",
  },
};

let data;
let filter = "alle";

const filterKnapper = document.querySelectorAll("nav li");
filterKnapper.forEach(knap => knap.addEventListener("click", filtrerKategorier));
hentData();

function filtrerKategorier() {
  filter = this.dataset.kategori;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");
  vis(data);
}

async function hentData() {
  const respons = await fetch(url, mereinfo);
  data = await respons.json();
  console.log(data);
  vis(data);
}
hentData();

function vis(data) {
  const main = document.querySelector("main");
  const template = document.querySelector("template").content;
  main.textContent = "";
  data.forEach(sko => {
    if (filter == sko.kategori || "alle") {
      const klon = template.cloneNode(true);
      klon.querySelector(".billedeurl").src = "skogalleri/" + sko.billedetekst + ".webp";
      klon.querySelector(".navn").textContent = sko.navn;
      klon.querySelector(".type").textContent = sko.type;
      klon.querySelector(".størrelse").textContent = sko.størrelse;
      klon.querySelector(".beskrivelse").textContent = sko.beskrivelse;
      klon.querySelector(".pris").textContent = sko.pris;
    }
  });
}
