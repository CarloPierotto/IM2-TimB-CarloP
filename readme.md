--------------------------------------
Projektbeschrieb:
--------------------------------------
Wir haben eine Website gemacht, 
die dem User die 3 nächsten Parkhäuser 
in Basel anzeigt.
Die Website funktioniert natürlich
auch ausserhalb von Basel, jedoch
macht das nicht viel Sinn, sie an einem
anderen Ort zu brauchen.

Der Code Sucht aus der API die 3 
nächsten Parkhäuser (Falls sie offen sind)
und zeigt an, wie voll sie bereits
sind.
Ausserdem zeigt ein SVG eines Autos
per Verlauf an, wie voll das Parkhaus
ist. 

--------------------------------------
Learnings Carlo Pierotto:
--------------------------------------
Durch die Übung konnte ich mein JS-Wissen auffrischen, APIs nutzen lernen und Neues wie Farbverläufe im SVG anwenden. Auch die forEach-Funktion konnte ich sinnvoll einsetzen.

--------------------------------------
Learnings Tim Brönimann:
--------------------------------------
Indem ich hauptsächlich den HTML / CSS Teil übernahm, konnte ich meine Kenntnisse dort festigen.  Die JS-Übungen aus dem Kurs haben mir sehr geholfen, mich in der Welt von JS zurechtzufinden.

--------------------------------------
benutzte Ressourcen und Prompts:
--------------------------------------
Chat GPT:
Wie kann ich in JS kontrollieren, ob das Gerät fähig ist einen hover zu machen?
Ich möchte diesen Code einbauen aber vielleicht ist er falsch. Er soll machen, dass wenn die const auslastung kleiner als 1 ist, der Wert "-" wird
Wie kann ich hier am ende noch ein Prozentzeichen zum Wert aus der API hinzufügen?
auslastung = Math.round(apiInfo.auslastung * 100),"%";
wie mache in in html einen button, der eine js funktion startet?
Kannst du den Code so schreiben, dass die Funktion startet, gleichzeitig nach einem 2 Sekunden Delay die Seite (zu parkhaeuser.html) gewechselt wird?
Wie kann ich nur die seite wechseln mit JS?
Ich habe diesen Code. Wenn ich den Button drücke wird kein alert aktiviert, was ist falsch?
Wie kann ich eine Funktion automatisch starten, wenn eine HTML Seite geöffnet wird?
Ich habe da Schwierigkeiten. Ich gebe dir meinen code und du sagst mir, wie ich machen kann, dass wenn ich den Button im index.html drücke, sich nach einem delay von 1 Sekunde die parkhaeuser.html Seite öffnet und die funktion getLocation() gestartet wird, ohne dass ich auf der parkhaeuser.html Seite einen Button drücken muss.
wie kann ich eine ladeanimation hinzufügen, sobald die parkhaeuser.html seite geöffnet wird, bis die funktionen fertig ausgeführt sind?
Jetzt funktioniert das mit dem Ausführen der getLocation funktion nicht mehr. Was ist falsch?
Wie kann ich in CSS einen Gegenstand offset verschieben? Dass er weiter links ist, als er eigendlich sein müsste
Kannst du mir einen beispielcode zeigen, wie du in HTML ein SVG einbettest und ihm in css einen Farbverlauf gibst?
Kannst du dieses SVG einbetten und einen Farbverlauf geben?...
Bei mir geht es nicht, kannst du mir sagen, was man an diesem code ändern muss, dass das auto svg einen Verlauf hat:
Wie kann ich ein SVG Bild als Code in HTML einbetten, wenn ich es nur als SVG Datei habe
Wie kann ich ein SVG von illustrator exportieren, dass der Hintergrund transparent ist?
Ich möchte per JS alle Daten in die Konsole schreiben. Schreibe mir den JS code dazu
Wie kann ich im JS einen Wert in eine Variable schreiben
Warum funktioniert 
let dis1 = lon-data.parkhaeuser[1].location.breitengrad
    console.log(dis1);
nicht?
Wie kann ich in JS etwas quadrieren (rechnen)
ich habe diese Rechnung um herauszufinden, wie weit die Distanz vom Parkhaus zum User ist:
(lon - parkhausData[1].location.laengengrad)**2 + (lat - parkhausData[1].location.breitengrad)**2;

Ich möchte für jedes Parkhaus herausfinden, wie weit die Distanz zum User ist und dann die 3 nächsten Parkhäuser in der Konsole ausgeben.
Muss ich für jede Distanz eine Variable erstellen oder kann man das auch umgehen?
Wie kann ich machen, dass die Daten nicht in der Konsole angezeigt werden, sondern im HTML?
Wie kann ich jetzt von ID 3 (wenn das als Resultat kam) Daten von dieser API holen?
geht das auch ohne idmapping. Einfach, dass ich, wenn ich die id 3 als nächstes Parkhaus habe, dass ich dann in der API die Daten der id 3 ausgebe?
Wie kann ich im JS sagen, dass ein Wert wie "0.6719999999999999" als 67% angezeigt werden soll?
Wie kann ich mit JS in HTML eine progress bar machen?
Du:
Wie kann ich (Statt, dass ich ein JSON File mit allen Locations habe) die Locations (mit einer Anfrage) von der API abfragen und diese in einer Variable speichern?
als id wird jetzt der Name des Parkhauses ausgegeben. Ich möchte aber, dass die Zahl davor (0 - 15) ausgegeben wird. Wie mache ich das?
wie kann ich ein if statement in diesem Teil einbauen?

parkhaeuserList.innerHTML += 
          <div class="parkhaeuser" id="ph_${ph.id}">
            <h2>${apiData.title}</h2>
            <span id="prozentanzeige">Auslastung: ${auslastung}%</span>
            <div class="progress-container">
              <div class="progress-bar" id="progressBar"></div>
            </div>
          </div>
        ;
Also if auslastung == offen -> soll der Text offen angezeigt werden
Kann ich, wenn ich eine Location habe, damit einen Google Maps Link erstellen, der mich von meinem Standort zur Location führt?
ich habe die locations.json datei, von der ich dir die 15 Parkhäuser oben angegeben habe. Bitte mache mir ein Beispiel, bei dem du alle Daten des json files in die Konsole schreibst


Chat GPT:
Wie kann ich ohne java script erreichen, dass wenn ich auf "search_auto" klicke, sich die "schranke" leicht nach oben bewegt. Dies mit einem Ankerpunkt auf der rechten Seite der Schranke. Um zu sehen, dass es funktioniert nehme ich vorübergehend den link zum Index.html weg, um zu überprüfen, dass die Bewegung auch funktioniert. Bevor du mir antwortest, stelle mir zuerst 2 Verständigungsfragen.
Wie kann ich machen, dass die SVG Bilder des HMTL im Browser so angezeigt werden, dass links und rechts etwas davon abgeschnitten ist. Ich will das nicht alles sichtbar ist, ohne dass ich horizontal scrollen kann. Ich stelle es mir so vor, als hätte ich ein Fenster (das iPhone) und nur so viel des SVG's das darin Platz hat ist auch sichtbar. Wie kann ich dies umsetzen?
Wie kann ich der class Füllstand eine maximale Größe geben, dass sich das ganze div in der Mitte einrastet und nicht unendlich vergrössert?