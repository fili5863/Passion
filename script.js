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

/* Variabel "filterknapper" med værdien af alle punkter fra navigationen. Tilføjet klik element 
på alle knapper. Når der klikkes på kanppen hentes data. */
const filterKnapper = document.querySelectorAll("nav li");
filterKnapper.forEach((knap) => knap.addEventListener("click", filtrerKategorier));
hentData();

/* Funktionen "filterKategorier" gør at dataen bliver filtreret når der klikkes på en bestemt
kategori. */
function filtrerKategorier() {
  filter = this.dataset.kategori;
  document.querySelector(".valgt").classList.remove("valgt");
  this.classList.add("valgt");
  vis(data);
  header.textContent = this.textContent;
}

/* Funktionen hentData hjælper os med at få data hentet igennem fetch ned fra variablerne url og mereinfo. Derudover bliver data vist i konsollen. */
async function hentData() {
  const response = await fetch(url, mereinfo);
  data = await response.json();
  console.log(data);
  vis(data);
}
hentData();

function vis(data) {
  const main = document.querySelector("main");
  const template = document.querySelector("template").content;
  main.textContent = "";
  data.forEach((sko) => {
    if (filter == sko.kategori || "alle") {
      const klon = template.cloneNode(true);
      klon.querySelector(".billedeurl").src = "skogalleri/" + sko.billedetekst + ".webp";
      klon.querySelector(".navn").textContent = sko.navn;
      klon.querySelector(".type").textContent = sko.type;
      klon.querySelector(".størrelse").textContent = sko.størrelse;
      klon.querySelector(".beskrivelse").textContent = sko.beskrivelse;
      klon.querySelector(".pris").textContent = sko.pris + "kr.";
      main.appendChild(klon);
    }
  });
}
