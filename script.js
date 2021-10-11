let form = document.querySelector("#pick-location")
let searches =[];

form.addEventListener("submit", (e)=>{
    e.preventDefault();

    let chooseLocation = e.target["location"].value;
    let errorMsg = document.querySelector("#error-message")
    

    if(!chooseLocation){
        errorMsg.textContent = "Please enter a location"
        
    } else {

        errorMsg.textContent = "";
        e.target["location"].value = "";
    
        fetch(`https://wttr.in/${chooseLocation}?format=j1`)
            .then((res)=> {
                return res.json();
            }).then((data)=> {

                console.log(data);

                let dateTime = data.current_condition[0].localObsDateTime;


                let previousSearch = document.querySelector("#no-search-yet")
                let ul = document.querySelector("#previous-list")
                let listItem = document.createElement("li")
                
                currentLocation.innerHTML = `
                <div id ="current-location" class="display"> </div>
                <h2>${data.nearest_area[0].areaName[0].value}</h2>
                <div><strong>${dateTime}<strong><div>
                <br>
                <div><strong>Area: </strong><span id="area">${data.nearest_area[0].areaName[0].value}</span></div>
                <br>
                <div><strong>Region: </strong><span id="region"> ${data.nearest_area[0].region[0].value}</span></div>
                <br>
                <div><strong>Country: </strong><span id="country">${data.nearest_area[0].country[0].value}</span></div>
                <br>
                <div><strong>Currently: </strong><span id="current">Feels like ${data.current_condition[0].FeelsLikeF}°F</span></div>
                
                <br>`;

                let forecast = document.querySelector("#forecast");

                forecast.innerHTML =`
                <div id = "today">
                    <h3>Today</h3>
                    <div><strong>Average Temp: </strong><span>${data.weather[0].avgtempF} °F</span></div>
                    <br>
                    <div><strong>Max Temp: </strong><span> ${data.weather[0].maxtempF} °F</span></div>
                    <br>
                    <div><strong>Min Temp: </strong><span> ${data.weather[0].mintempF} °F</span></div>
                <br>      
                </div>
                <div id ="tomorrow">
                    <h3>Tomorrow</h3>
                    <div><strong>Average Temp:</strong><span> ${data.weather[1].avgtempF}°F</span></div>
                    <br>
                    <div><strong>Max Temp:</strong><span> ${data.weather[1].maxtempF}°F</span></div>
                    <br>
                    <div><strong>Min Temp:</strong><span> ${data.weather[1].mintempF}°F</span></div>
                    <br>          
                 </div>
                 <div id="day-after">
                    <h3>Day After Tomorrow</h3>
                    <div><strong>Average Temp:</strong><span> ${data.weather[2].avgtempF}°F</span></div>
                    <br>
                    <div><strong>Max Temp:</strong><span> ${data.weather[2].maxtempF}°F</span></div>
                    <br>
                    <div><strong>Min Temp:</strong><span> ${data.weather[2].mintempF}°F</span></div>
                    <br>
                 </div>`;

                previousSearch.textContent = "";

                let anchor = document.createElement("a");
                anchor.setAttribute("href", "#")

                anchor.textContent = data.nearest_area[0].areaName[0].value;
                anchor.addEventListener("click", (e)=>{
                    e.preventDefault();
                    console.log(e.target.textContent)
                    updateWeather(e.target.textContent)
                    
                })
                
                listItem.textContent =  ` - ${data.current_condition[0].FeelsLikeF}°F`
                if (!searches.includes(anchor.textContent) && searches.length < 15){
                    searches.push(anchor.textContent)

                    listItem.prepend(anchor);
                    ul.append(listItem);
                    console.log(searches)
                    
                }
                


            }).catch((err)=>{
                throw err;// still returns data when random info entered into form 
            });
    }
                

});

function updateWeather(city){
    fetch(`https://wttr.in/${city}?format=j1`)
    .then((res)=> {
        return res.json();
    }).then((data)=> {

        currentLocation.innerHTML = `
                <div id ="current-location" class="display"> </div>
                <h2>${data.nearest_area[0].areaName[0].value}</h2>
                <div><strong>${data.current_condition[0].localObsDateTime}<strong><div>
                <br>
                <div><strong>Area: </strong><span id="area">${data.nearest_area[0].areaName[0].value}</span></div>
                <br>
                <div><strong>Region: </strong><span id="region"> ${data.nearest_area[0].region[0].value}</span></div>
                <br>
                <div><strong>Country: </strong><span id="country">${data.nearest_area[0].country[0].value}</span></div>
                <br>
                <div><strong>Currently: </strong><span id="current">Feels like ${data.current_condition[0].FeelsLikeF}°F</span></div>
                <br>`;

                let forecast = document.querySelector("#forecast");

                forecast.innerHTML =`
                <div id = "today">
                    <h3>Today</h3>
                    <div><strong>Average Temp: </strong><span>${data.weather[0].avgtempF} °F</span></div>
                    <br>
                    <div><strong>Max Temp: </strong><span> ${data.weather[0].maxtempF} °F</span></div>
                    <br>
                    <div><strong>Min Temp: </strong><span> ${data.weather[0].mintempF} °F</span></div>
                <br>      
                </div>
                <div id ="tomorrow">
                    <h3>Tomorrow</h3>
                    <div><strong>Average Temp:</strong><span> ${data.weather[1].avgtempF} °F</span></div>
                    <br>
                    <div><strong>Max Temp:</strong><span> ${data.weather[1].maxtempF} °F</span></div>
                    <br>
                    <div><strong>Min Temp:</strong><span> ${data.weather[1].mintempF} °F</span></div>
                    <br>          
                 </div>
                 <div id="day-after">
                    <h3>Day After Tomorrow</h3>
                    <div><strong>Average Temp:</strong><span> ${data.weather[2].avgtempF} °F</span></div>
                    <br>
                    <div><strong>Max Temp:</strong><span> ${data.weather[2].maxtempF} °F</span></div>
                    <br>
                    <div><strong>Min Temp:</strong><span> ${data.weather[2].mintempF} °F</span></div>
                    <br>
                 </div>`;


            }).catch((err)=>{
                throw err;
            });
                
}

