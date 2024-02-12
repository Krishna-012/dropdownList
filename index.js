const api = {
    url: "https://api.countrystatecity.in/v1/countries",
    key: "U3k1OVhydWJaZjExUWpNVnlxZnBkemtlMUNpR1RiQWtPWkFzdjQ1UQ=="
}

const selectCountry = document.querySelector(".country"),
selectState = document.querySelector(".state"),
selectCity = document.querySelector(".city");

async function handleCountry() {
    try{
        let API_URL = api.url
        const response = await fetch(API_URL, {headers: {"X-CSCAPI-KEY": api.key}});
        const data = await response.json();
        //console.log(data);
        
        data.forEach(country => {
            const option = document.createElement("option");
            option.value = country.iso2;
            option.textContent = country.name;
            selectCountry.appendChild(option);
        });
    } catch (error) {
        console.error("Error fetching country data:", error);
    }
}

async function handleStates() {
    const countryCode = selectCountry.value;
    //console.log(countrySelect);
    selectState.innerHTML = '<option value = " " >Select State</option>'; //for clearing the existing states
    selectCity.innerHTML = '<option value = " " >Select City</option>'; //clear the existing city
    try{
        
        const response = await fetch(`${api.url}/${countryCode}/states`, {headers: {"X-CSCAPI-KEY": api.key}})
        const data = await response.json();
        console.log(data);
        data.forEach(state => {

            const option = document.createElement("option");
            option.value = state.iso2;
            option.textContent = state.name;
            selectState.appendChild(option);
        
        });
    }catch (error) {
        console.error("Error fetching country data:", error);
    }
}

async function handleCity() {
    const countryCode = selectCountry.value;
    const stateCode = selectState.value;
   // console.log(stateCode);
   selectCity.innerHTML = '<option value = " " >Select City</option>'; //clear the existing city
   try {

    const response = await fetch(`${api.url}/${countryCode}/states/${stateCode}/cities`, {headers: {"X-CSCAPI-KEY": api.key}});
    const data = await response.json();
    // console.log(data);
    data.forEach(city => {

        const option = document.createElement("option");
        option.value = city.iso2;
        option.textContent = city.name;
        selectCity.appendChild(option);

    })

   } catch (error) {

    console.error("Error fetching country data:", error);

   }
}

handleCountry();