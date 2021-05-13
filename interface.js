document.addEventListener("DOMContentLoaded", () => {
  const updateTemperature = () => {
    document.querySelector('#temperature').innerText = thermostat.temperature;
    document.querySelector('#temperature').className = thermostat.energyUsage();
  }

  const thermostat = new Thermostat();
  updateTemperature();
  getWeather()


  document.querySelector('#up').addEventListener('click', () => {
    thermostat.up(1);
    updateTemperature();
  });

  document.querySelector('#down').addEventListener('click', () => {
    thermostat.down(1);
    updateTemperature();
  });

  document.querySelector('#reset').addEventListener('click', () => {
    thermostat.reset();
    updateTemperature();
  });

  document.querySelector('#PSM_on').addEventListener('click', () => {
    thermostat.powersave = true;
    document.querySelector('#power-save-status').innerText = 'on';
    updateTemperature();
  })

  document.querySelector('#PSM_off').addEventListener('click', () => {
    thermostat.powersave = false;
    document.querySelector('#power-save-status').innerText = 'off';
    updateTemperature();
  })
});

async function getWeather(location = 'London') {
  let weatherResponse = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=6976989e9ec70de9016d9d9bd4e590ac&units=metric`)
  let post = await weatherResponse.json()
  document.querySelector('#weather').innerText = `The weather today in ${location} is: ${capitalize(post.weather[0].description)}, ${Math.round(post.main.temp)}°C`
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1)
}