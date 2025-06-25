
/* Filter-Edit.js */
//ladenFilterparameter();
function ladenFilterparameter() {
    if (localStorage.getItem("dokumenteFilterparameter") === null) {
        alert ("In deinem Brwoser sind keine Filterparamter gespeichert! \n" + 
                "Führe erst ein restore der Filterparameter durch! \n" +
                "Die Filterparamter wurden initialisiert = Neustart!"
        ) ;
        workingCopy = filterjsoninit;
        originalFilters = filterjsoninit;
        filterjson = filterjsoninit;
        console.log (" filterjsoninit wurde geladen " + JSON.stringify(filterjsoninit).length + " Zeichen");
    } else {
        workingCopy = JSON.parse(localStorage.getItem("dokumenteFilterparameter"));
        originalFilters = workingCopy;
        //alert (" dokumenteFilterparameter wurde geladen" )
    } 
}

// Render-Funktionen - Spalten aufbauen
function renderFilters() {
    renderFilterPanel('currentFilters', originalFilters); // aktuellen Filter aufbauen
    renderFilterPanel('newFilters', workingCopy); // neuen Filter aufbauen
}

function renderFilterPanel(containerId, filters) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    for (const [filterId, filterData] of Object.entries(filters)) {
        const card = document.createElement('div');
        card.className = 'filter-card';
        card.innerHTML = `
            <div class="filter-header">
                <span class="filter-name"> ${filterData.filtername}</span>
                <div>
                    ${containerId === 'newFilters' ?
                        `<button class="btn btn-primary" onclick="showEditForm('${filterId}')">Bearbeiten</button>` : ''
                        }
                    ${containerId === 'newFilters' ? 
                        `<button class="btn btn-danger" onclick="deleteFilter('${filterId}')">Löschen</button>` : ''
                        }
                </div>
            </div>
            <div class="filter-options" id="options-${filterId}-${containerId}"></div>
            ${containerId === 'newFilters' ? 
                `<button class="btn btn-addoption" onclick="showAddOptionForm('${filterId}')">Option hinzufügen</button>` : ''}
        `;           
        container.appendChild(card);
        renderOptions(filterId, containerId, filterData.option);
    }
    
    if (containerId === 'newFilters' && Object.keys(filters).length === 0) {
        container.innerHTML = '<p>Keine Filter vorhanden</p>';
    }
}
// Filteroptionen aufbauen
function renderOptions(filterId, containerId, options) {
    const container = document.getElementById(`options-${filterId}-${containerId}`);
    container.innerHTML = '';
    if (options.length === 0) {
        container.innerHTML = '<p>Keine Optionen definiert</p>';
        return;
    }
    options.forEach((opt, idx) => {
        const optDiv = document.createElement('div');
        optDiv.className = 'option-details';
        optDiv.innerHTML = `
            <span class="option-label">Anzeigename:</span>
            <span class="option-value">${opt.optname}</span>
            <span class="option-label">Filtertext:</span>
            <span class="option-value">${opt.optwert || '(leer)'}</span>
        `;
        if (containerId === 'newFilters') {
            optDiv.innerHTML += `
                <button class="btn btn-primary" style="grid-column: 1; width: 100%" 
                        onclick="editOption('${filterId}', ${idx})">Bearbeiten</button>
                <button class="btn btn-danger" style="grid-column: 2; width: 100%" 
                        onclick="deleteOption('${filterId}', ${idx})">Löschen</button>
            `;
        }
        container.appendChild(optDiv);
    });
}
// Bearbeitungsfunktionen neuen Filter "workingCopy" ändern
function showEditForm(filterId) {
    const newName = prompt("Neuer Filter-Name:", workingCopy[filterId].filtername);
    if (newName !== null) {
        workingCopy[filterId].filtername = newName;
        //renderFilters(); bis 24062025
        renderFilterPanel('newFilters', workingCopy); // neuen Filter aufbauen 
    }
}
// Option hinzufügen im workingCopy - Filter
function showAddOptionForm(filterId) {
    const optname = prompt("Anzeigename:"); // bisher Option-Name
    if (optname !== null) {
        const optwert = prompt("Filtertext:"); //Option-Wert 
        workingCopy[filterId].option.push({
            optname: optname,
            optwert: optwert || ""
        });
        //renderFilters();
        //renderFilters(); bis 24062025
        renderFilterPanel('newFilters', workingCopy); // neuen Filter aufbauen 

    }
}
// Optionsname und -wert bearbeiten im workingCopy - Filter
function editOption(filterId, optionIndex) {   
    const option = workingCopy[filterId].option[optionIndex];
    const newName = prompt("Neuer Anzeigename:", option.optname);
    if (newName !== null) {
        const newValue = prompt("Neuer Filtertext:", option.optwert);
        workingCopy[filterId].option[optionIndex] = {
            optname: newName,
            optwert: newValue || ""
        };
        //renderFilters();
        //renderFilters(); bis 24062025
        renderFilterPanel('newFilters', workingCopy); // neuen Filter aufbauen 
    }
}
// Option löschen im workingCopy - Filter
function deleteOption(filterId, optionIndex) {
    if (confirm("Option wirklich löschen?")) {
        workingCopy[filterId].option.splice(optionIndex, 1);
        //renderFilters();
        //renderFilters(); bis 24062025
        renderFilterPanel('newFilters', workingCopy); // neuen Filter aufbauen 
    }
}
// Filter und alle Optionen löschen workingCopy - Filter
function deleteFilter(filterId) {
    if (confirm("Filter und alle Optionen wirklich löschen?")) {
        delete workingCopy[filterId];
        //renderFilters();
        //renderFilters(); bis 24062025
        renderFilterPanel('newFilters', workingCopy); // neuen Filter aufbauen
    }
}
// Änderungen übernehmen vom workingCopy - Filter in den originalFilters (aktueller Filter)
document.getElementById('applyChanges').addEventListener('click', () => {
    if (confirm("Alle Änderungen übernehmen?")) {
        Object.assign(originalFilters, workingCopy);
        workingCopy = JSON.parse(JSON.stringify(originalFilters));
        renderFilters();
        localStorage.setItem("dokumenteFilterparameter", JSON.stringify(workingCopy));
        //alert("Die Änderungen wurden übernommen!");
        //filterjson = JSON.parse(localStorage.getItem("dokumenteFilterparameter"));
        filterjson = workingCopy;
        //alert ("filterjson.fliter1.filtername" + JSON.stringify(filterjson))
        //ladenFilterparameter();
        //filteraufbau(filterjson);
        location.reload();
    }
});
// Änderungen verwerfen
document.getElementById('deleteChanges').addEventListener('click', () => {
    //workingCopy = JSON.parse(JSON.stringify(originalFilters)); bis 24062025
    workingCopy = JSON.parse(localStorage.getItem("dokumenteFilterparameter"));
    //renderFilters();
    //renderFilters(); bis 24062025
    renderFilterPanel('newFilters', workingCopy); // neuen Filter aufbauen
    alert("Die Änderungen wurden verworfen!");
});
// Initiales Rendern  - Alle Spalten aufbauen
renderFilters();
//Backup Filterparameter in eine Datei speichern
datum = new Date();
backupname = "backup-dokumente-filterparameter" + "-" + datum.getFullYear() + "-" + (datum.getMonth()+1).toLocaleString ()
+ "-" + datum.getDate().toLocaleString () + ".txt";

// restore der backupdatei
document.getElementById('fileinput').addEventListener('change', function() {
    file = new FileReader();           
    file.onload = () => {  
        let loadedjsonobjekt = "";           
        loadedjsonobjekt = file.result; 
        workingCopy = JSON.parse(loadedjsonobjekt);
        originalFilters = JSON.parse(loadedjsonobjekt);
        localStorage.setItem("dokumenteFilterparameter", JSON.stringify(workingCopy));
        alert("Die Änderungen wurden in den Browser übernommen");
        let satznr = JSON.stringify(workingCopy).length;
        let text = JSON.stringify(workingCopy);
        text = "Zeichenanzahl: " + satznr + " \n " + text;
        //console.log (text)
    }
    file.readAsText(this.files[0], 'windows-1252');                                   
});
