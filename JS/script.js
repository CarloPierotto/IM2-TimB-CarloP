// ========================================
// Fortschrittsbalken für Auslastung setzen
// ========================================
function setProgress(id, wert) {
  const bar = document.querySelector(`#ph_${id} #progressBar`);
  const prozent = document.querySelector(`#ph_${id} #prozentanzeige`);

  if (bar && prozent) {
    bar.style.width = wert + "%";
    prozent.innerText = `Auslastung: ${wert}%`;
  }
}

// ========================================
// Globale Variable zum Speichern der Daten
// ========================================
let parkhausData = [];

// ========================================
// Daten von der API laden
// ========================================
fetch("https://data.bs.ch/api/explore/v2.1/catalog/datasets/100088/records?limit=50")
  .then(res => res.json())
  .then(data => {
    // Nur relevante Infos extrahieren und in parkhausData speichern
    parkhausData = data.results.map((ph, index) => ({
      id: index, // Eigene ID (für HTML-Elemente)
      apiIndex: index, // Position im API-Array
      name: ph.name,
      location: {
        breitengrad: ph.geo_point_2d.lat,
        laengengrad: ph.geo_point_2d.lon
      }
    }));

    console.log("Parkhausdaten erfolgreich geladen:", parkhausData);
  })
  .catch(error => {
    console.error("❌ Fehler beim Laden der Standortdaten:", error);
  });

// ========================================
// Geoposition abfragen (Button-Event)
// ========================================
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation wird von diesem Browser nicht unterstützt.");
  }
}

// ========================================
// Nächste Parkhäuser berechnen und anzeigen
// ========================================
function showPosition(position) {
  const userLat = position.coords.latitude;
  const userLon = position.coords.longitude;

  // Distanzen zu allen Parkhäusern berechnen
  const distanzen = parkhausData.map(ph => {
    const dx = userLon - ph.location.laengengrad;
    const dy = userLat - ph.location.breitengrad;
    const dist = dx ** 2 + dy ** 2; // einfache quadratische Distanz
    return { ...ph, distanz: dist };
  });

  // Nach Entfernung sortieren
  distanzen.sort((a, b) => a.distanz - b.distanz);

  // UI vorbereiten
  document.getElementById("button").style.display = "none";
  const listContainer = document.getElementById("parkhaeuser-list");
  listContainer.innerHTML = "";

  const naechste = distanzen.slice(0, 3); // Die 3 nächsten

  // Aktuelle Auslastung erneut aus der API holen
  fetch("https://data.bs.ch/api/explore/v2.1/catalog/datasets/100088/records?limit=50")
    .then(res => res.json())
    .then(data => {
      naechste.forEach(ph => {
        const apiInfo = data.results[ph.apiIndex];
        const auslastung = Math.round(apiInfo.auslastung * 100);

        // HTML für jedes Parkhaus hinzufügen
        listContainer.innerHTML += `
          <div class="parkhaeuser" id="ph_${ph.id}">
            <h2>${apiInfo.title}</h2>
            <span id="prozentanzeige">Auslastung: ${auslastung}%</span>
            <div class="progress-container">
                <img src="Bilder/Silhouette.svg" alt="Silhouette" class="Silhouette">
                <div class="progress-bar" id="progressBar"></div>
            </div>
            <p>${apiInfo.status === "offen" ? "Offen" : "Geschlossen"}</p>
            <a href="https://www.google.com/maps/dir/?api=1&destination=${ph.location.breitengrad},${ph.location.laengengrad}">Route</a>
            <p>Freie Plätze: ${apiInfo.free}</p>
          </div>
        `;

        // Balken setzen
        setProgress(ph.id, auslastung);
      });
    })
    .catch(err => {
      console.error("Fehler beim Abrufen der Auslastungsdaten:", err);
    });
}
