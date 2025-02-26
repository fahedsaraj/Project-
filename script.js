async function fetchAirQuality() {
    const city = document.getElementById('cityInput').value.trim();
    if (!city) {
        alert("Please enter a city name.");
        return;
    }
    
    const url = `https://api.openaq.org/v2/latest?city=${encodeURIComponent(city)}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.results && data.results.length > 0) {
            const measurements = data.results[0].measurements;
            let output = `<h2>Air Quality in ${city}</h2>`;
            measurements.forEach(m => {
                output += `<p>${m.parameter.toUpperCase()}: ${m.value} ${m.unit}</p>`;
            });
            document.getElementById('result').innerHTML = output;
        } else {
            document.getElementById('result').innerHTML = "No data available for this city.";
        }
    } catch (error) {
        console.error("Error fetching data:", error);
        document.getElementById('result').innerHTML = "Error fetching data. Try again later.";
    }
}
