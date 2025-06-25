// Hauptverarbeitung
//Menüfunktion    
function showContent(id) {
  if (id === "logout") { logout();}
    document.querySelectorAll('.content').forEach(el => el.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    // hinzugefügte Dokumente auf leer setzen
    anzdokumente = "";
    dokumente_add = "";
    document.getElementById('anzdoks').innerHTML = anzdokumente;
    document.getElementById('dokadd').innerHTML = dokumente_add;
}
function logout() {
  window.open('', '_self', '');
  window.close();
  window.location.href = "about:blank";
}
let filterjson = null;
filteraufbau(filterjson);
function filteraufbau(filterjson) {
  //alert ("filteraufbau filterjson.fliter1.filtername" + JSON.stringify(filterjson))
// Aufbau der DIV,s innerhalb des Containers id="filter-wraper"
    // Sicherstellen, dass das DOM bereit ist (obwohl am Ende von body meist ok)
    document.addEventListener('DOMContentLoaded', () => {
        // Definition Wrapper  - "Verpackung"
        const filterWrapper = document.getElementById('filter-wrapper');
        // Prüfen, ob der Wrapper gefunden wurde (wichtig!)
        if (filterWrapper) {
          // Filter 1: Funktion anzeigefilter1 gibt das radioDiv zurück
          const filter1Div = anzeigefilter1(); // Funktion muss divElement zurückgeben
          if (filter1Div) filterWrapper.appendChild(filter1Div);
          // Filter 2: Funktion anzeigefilter2 gibt das radioDiv zurück
          const filter2Div = anzeigefilter2();
          if (filter2Div) filterWrapper.appendChild(filter2Div);
          // Event-Listener für Filter 2 initialisieren (falls nötig und nicht in anzeigefilter2)
          initFilter2Listeners();
          // Filter 3: Funktion anzeigefilter3 gibt das radioDiv zurück
          const filter3Div = anzeigefilter3();
          if (filter3Div) filterWrapper.appendChild(filter3Div);
          // Event-Listener für Filter 3 initialisieren (falls nötig und nicht in anzeigefilter3)
          initFilter3Listeners();
    
        } else {
          console.error("Filter-Wrapper Element nicht gefunden!");
        }
      });
  }


const filterjsoninit = {
    "filter1": {
      "filtername": "Dokumenten-Art",
      "option":[{
        "optname": "alles anzeigen",
        "optwert": ""},
        {
        "optname": "Ausweis",
        "optwert": "Ausweis"}
        ]
    },
    "filter2": {
      "filtername": "Personen",
      "option":[{
        "optname": "alle anzeigen",
        "optwert": ""},
        {
        "optname": "Winfried",
        "optwert": "winfried"}
        ]
    },
    "filter3": {
      "filtername": "Dokumenten-Format",
      "option":[{
        "optname": "alle anzeigen",
        "optwert": ""},
        {
        "optname": "Bilder-jpg",
        "optwert": "jpg"},
        {
        "optname": "Schriftstücke-pdf",
        "optwert": "pdf"}
        ]
    }
};

ladenFilterparameter();
function ladenFilterparameter() {
    if (localStorage.getItem("dokumenteFilterparameter") === null) {
        alert ("In deinem Brwoser sind keine Filterparamter gespeichert! \n" + 
            "Fuehre erst ein restore der Filterparameter durch! \n" +
            "Die Filterparamter wurden initialisiert = Neustart!"
        ) ;
        workingCopy = filterjsoninit;
        originalFilters = filterjsoninit;
        filterjson = filterjsoninit;
    } else {
        workingCopy = JSON.parse(localStorage.getItem("dokumenteFilterparameter"));
        originalFilters = workingCopy;
        filterjson = workingCopy;
        //let filterparameter = localStorage.getItem("dokumenteFilterparameter");
        // alert ("ladenFilterparameter filterjson.fliter1.filtername" + JSON.stringify(filterjson))
    } 
}
let ersetzenlöschen = "nein"; // Anzeigen der Button Erstezen, Löschen 
let filter1auswahl = "";
let filter2auswahl = "";
let filter3auswahl = "";
function hauptverarbeitung() {  
    let filterprotokoll = "gesetzte Filter: " + filter1auswahl + " " + filter2auswahl + " " + filter3auswahl;  
    document.getElementById('filter-output').innerHTML = filterprotokoll;
    ladenFilterparameter();
    renderItemsFilter();
}
// Anzeigen "Ersetzen/Löschen" JA / NEIN
document.addEventListener('DOMContentLoaded', function() {
        const radioButtons = document.querySelectorAll('input[name="fortfahren"]');
        radioButtons.forEach(radio => {
            radio.addEventListener('change', function() {
                if (this.value === 'ja') {
                    ersetzenlöschen = "ja";
                    //console.log("Benutzer hat JA gewählt.");
                    // Hier deine Logik für "Ja" einfügen
                    //janein= "ja";
                    // Beispiel: zeigeEinElement();
                    //zeigeEinElement();
                    hauptverarbeitung();
                } else {
                    ersetzenlöschen = "nein";
                    //console.log("Benutzer hat NEIN gewählt.");
                    // Hier deine Logik für "Nein" einfügen
                    //janein = "nein";
                    // Beispiel: versteckeEinElement();
                    //versteckeEinElement();
                    hauptverarbeitung();
                }
            });
        });
    }); 

