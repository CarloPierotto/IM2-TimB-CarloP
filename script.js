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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      document.getElementById("output").innerText = "Geolocation wird von diesem Browser nicht unterstützt.";
    }
  }

  function showPosition(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;

  document.getElementById("output").innerText =
    "Breitengrad: " + lat + "\nLängengrad: " + lon;

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
  console.log("Die 3 nächsten Parkhäuser:");
  distanzen.slice(0, 3).forEach(ph => {
    console.log(`ID: ${ph.id}, Distanz: ${ph.distanz.toFixed(8)}`);
  });
}