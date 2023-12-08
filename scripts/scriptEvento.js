function initGoogleSheetsApi() {
  gapi.client
    .init({
      apiKey: "AIzaSyDTyaj6AieLU4siuFiUfTQkKKnpZFFr7jg",
      discoveryDocs: [
        "https://sheets.googleapis.com/$discovery/rest?version=v4",
      ],
    })
    .then(function () {
      loadPosts();
      loadGaleriaFromGoogleSheet();
    });
}

function loadPosts() {
  fetch(
    "https://api-sa-east-1.hygraph.com/v2/clprnaodn1ka801ul14xnafil/master",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: `
        query Posts {
            posts {
              createdAt
              id
              slug
              title
              description {
                html
              }
              imagem {
                url
              }
            }
          }
          `,
      }),
    }
  )
    .then((res) => {
      if (!res.ok) return Promise.reject(response);

      return res.json();
    })
    .then(async (res) => {
      const { posts } = res.data;
      console.log(res.data);

      const productsList = document.getElementById("eventos-container");

      console.log(productsList);

      await posts.map((post) => {
        const foto = post.imagem?.url;
        const titulo = post.title;
        const descricao = post.description.html;

        const eventosDiv = document.createElement("div");
        eventosDiv.className = "col-md-4";
        eventosDiv.innerHTML = `
                    <div class="card">
                        <img src="${foto}" alt="${titulo}" class="img-fluid">
                        <h3>${titulo}</h3>
                         ${descricao}
                      
                    </div>
                `;
        console.log(post);
        productsList.appendChild(eventosDiv);
      });
    });
}

function loadGaleriaFromGoogleSheet() {
  const spreadsheetId = "1vzADqzTkra7N4Mv7zAb_r7_Hp1iIhJcnNOw12W02gws";
  const sheetName = "GALERIA";
  gapi.client.sheets.spreadsheets.values
    .get({
      spreadsheetId: spreadsheetId,
      range: sheetName,
    })
    .then(function (response) {
      const data = response.result.values;

      if (data.length > 0) {
        const galeriaContainer = document.getElementById("galeria-container");
        data.forEach(function (row) {
          const foto = row[0];
          const galeriaDiv = document.createElement("div");
          galeriaDiv.className = "col-md-4";
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

gapi.load("client", initGoogleSheetsApi);
