function setProgress(id, wert) {
  const bar = document.querySelector(`#ph_${id} #progressBar`);
  const prozent = document.querySelector(`#ph_${id} #prozentanzeige`);

  bar.style.width = wert + "%";
  prozent.innerText = "Auslastung: " + wert + "%";
}

//Variable parkahusData definieren
let parkhausData = []; // global definieren

// JSON-Datei laden und in die Variable parkhausData speichern
fetch('locations.json')
  .then(response => response.json())
  .then(data => {
    parkhausData = data.parkhaeuser; // global befüllen
    data.parkhaeuser.forEach(ph => {
      console.log(`ID: ${ph.id}, Breitengrad: ${ph.location.breitengrad}, Längengrad: ${ph.location.laengengrad}`);
    });
  })
  .catch(error => {
    console.error('Fehler beim Laden der JSON-Datei:', error);
  });

// Funktion zum Ermitteln des Standorts
function getLocation() {
      navigator.geolocation.getCurrentPosition(showPosition);
  }

  function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  // Schritt 1: Berechne die (vereinfachte) Distanz für jedes Parkhaus
  const distanzen = parkhausData.map(ph => {
    const dx = lon - ph.location.laengengrad;
    const dy = lat - ph.location.breitengrad;
    const dist = dx**2 + dy**2; // keine echte Distanz in Metern, aber ausreichend zum Vergleich
    return { ...ph, distanz: dist }; // erweitere jedes Parkhaus mit der Distanz
  });

  // Schritt 2: Sortiere nach Distanz
  distanzen.sort((a, b) => a.distanz - b.distanz);

  // Schritt 3: Gib die 3 nächsten Parkhäuser aus
  document.getElementById("button").style.display = "none";
  const parkhaeuserList = document.getElementById("parkhaeuser-list");
  parkhaeuserList.innerHTML = "";

  const naechstes = distanzen.slice(0, 3);

  fetch("https://data.bs.ch/api/explore/v2.1/catalog/datasets/100088/records?limit=50")
  .then(res => res.json())
  .then(data => {
    distanzen.slice(0, 3).forEach(ph => {
      parkhaeuserList.innerHTML += `<div class="parkhaeuser" id="ph_${ph.id}"><h2>${data.results[ph.id].title}</h2><span id="prozentanzeige">Auslastung: ${Math.round(data.results[ph.id].auslastung * 100)}%</span><div class="progress-container"><div class="progress-bar" id="progressBar"></div></div></div>`;
      console.log("id:", ph.id);
      setProgress(ph.id, Math.round(data.results[ph.id].auslastung * 100));//Prozentanzeige bestimmen
    });
  })
  .catch(err => {
    console.error("Fehler beim Abrufen:", err);
  });
}




