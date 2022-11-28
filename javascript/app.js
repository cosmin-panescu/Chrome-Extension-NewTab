window.addEventListener("load", () => {

    // Current time
    function getCurrentTime() {
        const date = new Date();

        if (date.getHours() < 10) {
            document.getElementById('hour').textContent = `0${date.getHours()}`;
        } else {
            document.getElementById('hour').textContent = date.getHours();
        }

        if (date.getMinutes() < 10) {
            document.getElementById('minute').textContent = `0${date.getMinutes()}`;
        } else {
            document.getElementById('minute').textContent = date.getMinutes();
        }
    }
    setInterval(getCurrentTime, 1000);

    // Weather
    navigator.geolocation.getCurrentPosition(position => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=52eb4bf969616067941f8213b6ed2401&units=imperial`)
        // fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`)
            .then(res => {
                if (!res.ok) {
                    throw Error("Weather data not available!");
                }
                return res.json();
            })
            .then(data => {
                let celsiusTemp = (data.main.temp - 32) * 5 / 9; //Fahrenheit to Celsius conversion

                const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                document.getElementById("weather").innerHTML = `
                    <p class="location title">${data.name}</p>
                    <div class="weather-info">
                        <img src=${iconUrl} />
                        <p class="temperature">${Math.round(celsiusTemp)}º</p>
                    </div>
                `
            })
            .catch(err => console.log(err));
    });
});