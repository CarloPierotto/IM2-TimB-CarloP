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
            <svg id="auto" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130.55 43">
                <defs>
                  <linearGradient id="carGradient_${ph.id}" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#172d3f"/>
                    <stop offset="${auslastung}%" stop-color="#172d3f"/>
                    <stop offset="${auslastung+0.001}%" stop-color="#ffffff"/>
                    <stop offset="100%" stop-color="#ffffff"/>
                  </linearGradient>
                </defs>
                <path fill="url(#carGradient_${ph.id})" d="M.7,31.71c.78.86,1.9,1.51,2.87,2.13l14.4,2.03h1.95s.08.09.08.09c1.32,5.65,7.2,7.92,12.53,6.74,3.05-.68,5.98-2.66,6.96-5.74l3.77.1c.26-.05.46-.78.76-.82,16.14.23,32.28.18,48.41.49,1.08.02,2.24-.4,3.31-.5,3.43,7.16,15.6,8.05,18.95.33.78-.13,1.55-.45,2.33-.59,2.8-.5,5.81-.59,8.63-1.05l4.44-1.79c-.04-.39.05-.79.06-1.16.04-1-.03-2.11.05-3.1.05-.56.28-1.15.33-1.71.04-.44-.03-.92,0-1.36-.13-.55-.27-.82-.68-1.2-.08-.07-.21-.08-.25-.15-.09-.17-.18-.73-.26-.98-.48-1.46-1.59-3.74-2.63-4.88-1.25-1.37-5.9-2.45-7.78-2.88-7.19-1.64-14.65-2.43-21.99-3.08-4.78-2.87-9.69-5.52-14.71-7.97-2.8-1.36-5.6-2.87-8.66-3.52C69.16.21,64.46.09,59.93.05c-.49,0-.98,0-1.47,0-3.27-.02-6.55.04-9.82,0-.09,0-.24.03-.3-.06h-3.05c-3.42.11-6.96.49-10.35,1.05-7.87,1.3-14.69,5.5-21.86,8.7l-9.36,1.25c-1.47.41-1.88,3.83-2.01,5.11-.21,2.07-.19,4.16-.22,6.24-1.02.42-1.22,1.54-1.42,2.51l.48,4.73C.53,29.83,0,30.31,0,30.51c0,.29.5.97.7,1.2Z"/>
                <path fill="url(#carGradient_${ph.id})" d="M48.65.06c3.27.03,6.55-.02,9.82,0v-.05h-10.12c.06.09.21.05.3.06Z"/>
                <path fill="url(#carGradient_${ph.id})" d="M59.93.05v-.05h-1.47v.05c.49,0,.98,0,1.47,0Z"/>
              </svg>
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
