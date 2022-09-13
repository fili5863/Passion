/* Variabler med værdien af restdb url + Api-key kode. */
const url = "https://database-4ee2.restdb.io/rest/skoudvalg";
const header = document.querySelector("h2");
const mereinfo = {
  headers: {
    "x-apikey": "631affccfdc15b0265f17258",
  },
};

/*  */
let data;
let filter = "alle";
const overskrift = document.querySelector("section h1");

/* Variabel "filterknapper" med værdien af alle punkter fra navigationen. Tilføjet klik element 
på alle knapper. Når der klikkes på kanppen hentes data. */
const filterKnapper = document.querySelectorAll("nav li");
filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerKategorier));
hentData();

/* Funktionen "filterKategorier" gør at dataen bliver filtreret når der klikkes på en bestemt
kategori. */
function filtrerKategorier() {
  filter = this.dataset.type;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");
  vis(data);
  overskrift.textContent = this.textContent;
}

/* Funktionen hentData hjælper os med at få data hentet igennem fetch ned fra variablerne url og mereinfo. Derudover bliver data vist i konsollen. */
async function hentData() {
  const response = await fetch(url, mereinfo);
  data = await response.json();
  console.log(data);
  vis(data);
}
/* Funktionen vis putter al vores data ind i ting som navn, pris, bekrivelse etc. */
function vis(data) {
  const main = document.querySelector("main");
  const template = document.querySelector("template").content;
  main.textContent = "";
  data.forEach((sko) => {
    if (filter == sko.type || filter == "alle") {
      const klon = template.cloneNode(true);
      klon.querySelector(".billedeurl").src = "skogalleri/" + sko.billedetekst + ".webp";
      klon.querySelector(".navn").textContent = sko.navn;
      // klon.querySelector(".type").textContent = sko.type;
      klon.querySelector(".størrelse").textContent = "Str. " + sko.størrelse;
      klon.querySelector(".køn").textContent = sko.køn;
      klon.querySelector(".type").textContent = sko.type;
      klon.querySelector(".stand").textContent = sko.stand;
      klon.querySelector(".pris").textContent = sko.pris + "kr.";
      klon.querySelector("article").addEventListener("click", () => visDetaljer(sko));
      main.appendChild(klon);
    }
  });
}
/* Funktionen visDetaljer putter al vores data ind i ting som navn, pris og beskrivelse i vores popup. */
const popup = document.querySelector("#popup");
function visDetaljer(sko) {
  popup.style.display = "flex";
  popup.querySelector(".navn").textContent = sko.navn;
  popup.querySelector(".billedeurl").src = "skogalleri/" + sko.billedetekst + ".webp";
  popup.querySelector(".beskrivelse").textContent = sko.beskrivelse;
  popup.querySelector(".pris").textContent = sko.pris + "kr.";
  popup.querySelector(".størrelse").textContent = "Str. " + sko.størrelse;
  document.querySelector("#popup article").addEventListener("click", () => (popup.style.display = "none"));
}

hentData();
