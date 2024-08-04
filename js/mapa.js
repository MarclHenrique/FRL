document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const atrativoId = params.get('id');
    console.log("ID do atrativo:", atrativoId); 

    // Configura o botão "Voltar" para redirecionar para a página index.html
    const backButton = document.getElementById('backButton');
    backButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    if (atrativoId) {
        try {
            const response = await fetch(`https://apidesafio5.onrender.com/atrativos/${atrativoId}`);
            const data = await response.json();
            console.log("Dados do atrativo:", data); 

            // Verifique se as coordenadas estão disponíveis
            if (data && data.latitude && data.longitude) {
                let map = L.map('map').setView([data.latitude, data.longitude], 14);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                }).addTo(map);

                L.marker([data.latitude, data.longitude]).addTo(map)
                    .bindPopup(`${data.nome}`)
                    .openPopup();
            } else {
                console.error("Dados de coordenadas não disponíveis.");
            }
        } catch (error) {
            console.error("Erro ao buscar dados do atrativo:", error);
        }
    }
});
