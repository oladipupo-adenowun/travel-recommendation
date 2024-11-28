var resetButton = document.getElementById('resetBtn');
var searchButton = document.getElementById('searchBtn');
var keywordInput = document.getElementById('keyword');
var placesBar = document.getElementById('places');

searchButton.addEventListener('click',()=>{
    if(keywordInput.value !== ""){
        fetch("./data.json",{method:'GET'})
        .then(response => response.json())
        .then(data => {
            //process
            loadPlaces(data);
        })
        .catch(error => console.log(error));      
    }else{
        alert('Enter a keyword to search!');
    }
});

resetButton.addEventListener('click',()=>{
    clearPlaces();
});

function loadPlaces(data){
    const keywordValue = keywordInput.value.toLowerCase();
    let placeHTML = "";
    if(keywordValue.indexOf('beach') !== -1){
        data.beaches.forEach((place,index)=>{
            placeHTML += `
                <div class="place">
                    <img src="./city-pics/${place.imageUrl}" />
                    <h3>${place.name}</h3>
                    <p>${place.description}</p>
                    <button class="btn purple center">Visit</button>
                </div>
            `;
});
    }else if(keywordValue.indexOf('temple') !== -1){
        data.temples.forEach((place,index)=>{
                placeHTML += `
                    <div class="place">
                        <img src="./city-pics/${place.imageUrl}" />
                        <h3>${place.name}</h3>
                        <p>${place.description}</p>
                        <button class="btn purple center">Visit</button>
                    </div>
                `;
    });
    }else if(keywordValue.indexOf('countr') !== -1){
        data.countries.forEach((place,index)=>{
                place.cities.forEach((city,id)=>{
                    placeHTML += `
                        <div class="place">
                            <img src="./city-pics/${city.imageUrl}" />
                            <h3>${city.name}</h3>
                            <p>${city.description}</p>
                            <button class="btn purple center">Visit</button>
                        </div>
                    `;
                });
        });        
    }else{
        placeHTML = `<div class="place">
                        <p>We do not yet support that keyword!</p>
                    </div>`;
    }
    placesBar.innerHTML = placeHTML;
}

function clearPlaces(){
    placesBar.innerHTML = '';
    keywordInput.value = '';
}

function getPlaceTime(str){
    //Usage: <!--em>${getPlaceTime(city.name)}</em-->
    const [city, country] = str.split(',');
    const options = { timeZone: `${country.trim()}/${city.trim()}`, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const cityTime = new Date().toLocaleTimeString('en-US', options);
    return `Current time in ${city}: ${cityTime}`;
}