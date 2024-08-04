const Information = document.querySelector("#Information");

class Cidade {
    static async listarCidadeId(cidadeId) {
        try {
            const response = await fetch(`https://apidesafio5.onrender.com/cidades/${cidadeId}`);
            const data = await response.json();
            console.log("Cidades recebidos no front-end:", data); 
            return Array.isArray(data) ? data : [data];
        } catch (error) {
            console.error("Erro ao listar Cidade:", error);
            return [];
        }
    }
}

function displayCidades(cidades) {
    Information.innerHTML = ''; 

    cidades.forEach(cidade => {
        const cidadeElement = document.createElement('div');
        cidadeElement.className = 'cidade';

        console.log("Processando cidade:", cidade);

        cidadeElement.innerHTML = `
            <h3>${cidade.nome_cidade || 'Nome não disponível'}</h3>
            <img src="${cidade.img_cidade}" alt="${cidade.nome_cidade}" />
            <p>${cidade.descricao || 'Descrição não disponível'}</p>
            <button class="buttonFiltro" role="button" data-id="${cidade.id_cidade}">Venha conhecer</button>
            <button class="buttonFiltro" role="button" onclick="window.location.href='index.html'">Voltar</button>

        `;

        Information.appendChild(cidadeElement);

        cidadeElement.querySelector('.buttonFiltro').addEventListener('click', () => {
            window.location.href = `atrativos.html?cidade=${cidade.id_cidade}`;
        });
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const cidadeId = params.get('cidade');
    console.log("ID da cidade:", cidadeId); 

    if (cidadeId) {
        const cidades = await Cidade.listarCidadeId(cidadeId);
        displayCidades(cidades);
    }
});
