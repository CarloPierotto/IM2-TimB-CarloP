// ========================================
// Fortschrittsbalken für Auslastung setzen
// ========================================
function setProgress(id, wert) {
  const bar = document.querySelector(`#ph_${id} #progressBar`);
  const prozent = document.querySelector(`#ph_${id} #prozentanzeige`);

  if (bar && prozent) {
    bar.style.width = wert + "%";
    prozent.innerText = `Auslastung:${wert}%`;
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
        if (apiInfo.status !== "offen") {
          return; // Überspringen, wenn nicht offen
        }
        let auslastung;
        if (apiInfo.auslastung < 0.01) {
         auslastung = "-";
        } else {
         auslastung = Math.round(apiInfo.auslastung * 100) + "%";
        }
        

        // HTML für jedes Parkhaus hinzufügen
        listContainer.innerHTML += `
          <div class="parkhaeuser" id="ph_${ph.id}">
            <div class="ort_parkhaus">
              <h2 class="ph_titel">${apiInfo.title}</h2>
            </div>
            
            <div class="fuellstand"><div>
            <span id="prozentanzeige"><h2 class="prozent_text">${auslastung}</h2></span>
            <svg id="auto" data-name="Ebene 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 254.77 96.21">
                <defs>
                  <linearGradient id="carGradient_${ph.id}" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#1e67a3"/>
                    <stop offset="${apiInfo.auslastung_prozent}%" stop-color="#1e67a3"/>
                    <stop offset="${apiInfo.auslastung_prozent+0.001}%" stop-color="#84cfff"/>
                    <stop offset="100%" stop-color="#84cfff"/>
                  </linearGradient>
                </defs>
                <path class="auto_breite" fill="url(#carGradient_${ph.id})" d="M1.5,33.16c.31-2.7,3.35-3.3,3.35-3.3,1.21-.6,3.48-1.31,6.25-2.05,3.05-.81,6.17-1.27,9.25-1.99,1.88-.44,3.78-.93,5.54-1.74,8.74-4.06,24.94-16.84,34.67-21.2,3.4-1.53,6.22-2.29,9.91-2.75,3.85-.49,85.78.57,89.61,1.23,2.43.42,4.72,1.58,6.85,2.76,2.87,1.6,5.59,3.45,8.26,5.33,3.04,2.13,6.01,4.35,9.02,6.54,3.01,2.19,6,4.35,9.1,6.4,2.73,1.8,5.53,3.53,8.5,4.9,1.5.69,3.01,1.29,4.66,1.55.03,0,.07.02.07.04s-.06.04-.05,0c1.59.17,3.19.31,4.79.44.88.07,1.75.13,2.62.21,1.75.17-8.36-.89-6.6-.7,3.85.4,7.69.82,11.55,1.26,3.55.41,7.08.83,10.62,1.29,2.32.3,4.65.58,6.94,1.03.09.02.19.04.28.06.16.03.32.05.48.08,15.22,3.2,16.74,3.92,17.6,14.74,1.05,13.29-1.52,27.32-18.56,27.93-.02.33-.04.65-.07.99-2.59,25.99-42.85,26.4-45.62-.5h-126.49v.1c-.56,7.55-4.58,14.35-11.46,17.84-6.16,3.14-13.75,3.4-20.14.75-7.84-3.24-11.97-10.34-13.06-18.41-3.82.91-8.12.06-11.54-1.78-3.31-1.78-5.61-4.82-6.86-8.31C-.04,63.09.2,59.49.11,56.56c-.15-4.75-.15-9.51.05-14.26.13-3.1-.09-6.45,1.4-9.14h-.06Z"/>
              </svg>
            </div>
            <div class="free_space">
              <h4>Freie Plätze: </h4><h2 class="anzahl_space">${apiInfo.free}</h2>
              <a href="https://www.google.com/maps/dir/?api=1&destination=${ph.location.breitengrad},${ph.location.laengengrad}"><svg class="button_maps" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M320-360h80v-120h140v100l140-140-140-140v100H360q-17 0-28.5 11.5T320-520v160ZM480-80q-15 0-29.5-6T424-104L104-424q-12-12-18-26.5T80-480q0-15 6-29.5t18-26.5l320-320q12-12 26.5-18t29.5-6q15 0 29.5 6t26.5 18l320 320q12 12 18 26.5t6 29.5q0 15-6 29.5T856-424L536-104q-12 12-26.5 18T480-80ZM320-320l160 160 320-320-320-320-320 320 160 160Zm160-160Z"/></svg></a>
            </div>
          </div>
        `;

        // Balken setzen
        setProgress(ph.id, auslastung);

        console.log(apiInfo.auslastung);
        console.log(auslastung);
      });
    })
    .catch(err => {
      console.error("Fehler beim Abrufen der Auslastungsdaten:", err);
    });

    document.getElementById("loader").style.display = "none";
}

getLocation()