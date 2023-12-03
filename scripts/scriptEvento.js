function initGoogleSheetsApi() {
    gapi.client.init({
        apiKey: 'AIzaSyDTyaj6AieLU4siuFiUfTQkKKnpZFFr7jg',
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
    }).then(function () {
        loadEventosFromGoogleSheet();
        loadGaleriaFromGoogleSheet();
    });
}

function loadEventosFromGoogleSheet() {
    const spreadsheetId = '1vzADqzTkra7N4Mv7zAb_r7_Hp1iIhJcnNOw12W02gws'; 
    const sheetName = 'EVENTOS'; 
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: sheetName
    }).then(function (response) {
        const data = response.result.values;

        if (data.length > 0) {
            const eventosContainer = document.getElementById('eventos-container');
            data.forEach(function (row) {
                const foto = row[0];
                const titulo = row[1];
                const descricao = row[2];
                
                const eventosDiv = document.createElement('div');
                eventosDiv.className = 'col-md-4';
                eventosDiv.innerHTML = `
                    <div class="card">
                        <img src="${foto}" alt="${titulo}" class="img-fluid">
                        <h3>${titulo}</h3>
                        <p>${descricao}</p>
                      
                    </div>
                `;
                eventosContainer.appendChild(eventosDiv);
            });
        }
    });
}

function loadGaleriaFromGoogleSheet() {
    const spreadsheetId = '1vzADqzTkra7N4Mv7zAb_r7_Hp1iIhJcnNOw12W02gws'; 
    const sheetName = 'GALERIA'; 
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: sheetName
    }).then(function (response) {
        const data = response.result.values;

        if (data.length > 0) {
            const galeriaContainer = document.getElementById('galeria-container');
            data.forEach(function (row) {
                const foto = row[0];
                const galeriaDiv = document.createElement('div');
                galeriaDiv.className = 'col-md-4';
                galeriaDiv.innerHTML = `
                    <div class="card">
                        <img src="${foto}" class="img-fluid">
                    </div>
                `;
                galeriaContainer.appendChild(galeriaDiv);
            });
        }
    });
}

gapi.load('client', initGoogleSheetsApi);
 
