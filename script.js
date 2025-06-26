const container = document.querySelector('.container');
const searchButton = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-detalhes');

searchButton.addEventListener('click', () => {
    const APIKEY = 'da781cea91f690d0fdb2ff1b11ad02a5';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${APIKEY}`)
        .then(response => response.json())
        .then(json => {
            const image = document.querySelector('.weather-box img');
            const temperatura = document.querySelector('.weather-box .temperatura');
            const descricao = document.querySelector('.weather-box .descrição');
            const umidade = document.querySelector('.weather-detalhes .umidade span');
            const vento = document.querySelector('.weather-detalhes .vento span');

            
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;
                case 'Mist':
                case 'Haze':
                    image.src = 'images/mist.png';
                    break;
                default:
                    image.src = 'images/cloud.png';
            }

             
            temperatura.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            descricao.textContent = json.weather[0].description;
            umidade.textContent = `${json.main.humidity}%`;
            vento.textContent = `${json.wind.speed} km/h`;
        })
        .catch(error => {
            console.error("Erro ao buscar dados da API:", error);
        });
});
