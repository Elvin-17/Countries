const toggle = document.querySelector(".toggle");
const text = document.querySelector(".text");
toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    document.body.classList.toggle("dark")
    if (toggle.classList.contains("active")) {
        text.innerHTML = "Light Mode"

    } else {
        text.innerHTML = "Dark Mode"
    }
});

//! Countries
const countries = document.querySelector(".countries");
const dropDown = document.querySelector(".dropDown");
const drop = document.querySelector(".drop");
const regions = document.querySelectorAll(".region");
const search = document.querySelector(".form_input");


async function getCountry() {
    const url = await fetch("https://restcountries.com/v3.1/all");
    const res = await url.json();
    res.forEach(element => {
        showCountry(element);
    })
}
getCountry();
function showCountry(data) {
    const country = document.createElement("div");
    country.classList.add("country");
    country.innerHTML = `
    <div class="country_img">
    <img src="${data.flags.png}" alt="Country">
</div>
<div class="country_info">
    <h5 class="countryName">${data.name.common}</h5>
    <p><strong>Popluation:</strong>${data.population}</p>
    <p class="regionName"><strong>Region:</strong>${data.region}</p>
    <p><strong>Capital:</strong>${data.capital ? data.capital : "No Capital"}</p>
</div>
    `
    countries.appendChild(country);
    country.addEventListener("click", () => {
        showCountryDetail(data);
    });
}
dropDown.addEventListener("click", () => {
    drop.classList.toggle("showDropDown");
});
const regionName = document.getElementsByClassName("regionName");
const countryName = document.getElementsByClassName("countryName");

regions.forEach(element => {
    element.addEventListener("click", () => {
        Array.from(regionName).forEach(elem => {
            if (elem.innerText.includes(element.innerText) || element.innerText == "All") {
                elem.parentElement.parentElement.style.display = "grid"
            } else {
                elem.parentElement.parentElement.style.display = "none"
            }
        })
    })
});

search.addEventListener("input", () => {
    Array.from(countryName).forEach(elem => {
        if (elem.innerText.toLowerCase().includes(search.value.toLowerCase())) {
            elem.parentElement.parentElement.style.display = "grid";
        } else {
            elem.parentElement.parentElement.style.display = "none";
        }
    })
});

//! Modal


const countryModal = document.querySelector(".country_modal");

back.addEventListener("click", () => {
    countryModal.classList.toggle("show");
});

function showCountryDetail(data) {
    let currencies = [];
    let languages = [];
    let nativeName = [];
    for(stateLanguage of Object.values(data.languages)) {
        languages.push(stateLanguage);
    }
    for (currency of Object.values(data.currencies)) {
        currencies.push(`${currency.symbol} ${currency.name}`)
    }
    for(native of Object.values(data.name.nativeName)) {
        nativeName.push(native);
    }
    countryModal.classList.toggle("show");
    countryModal.innerHTML = `
    <button class="back">Back</button>
    <div class="modal">
        <div class="left_modal">
            <img src="${data.flags.png}" alt="">
        </div>
        <div class="right_modal">
            <h1>${data.name.common}</h1>
            <div class="modal_info">
                <div class="inner_left inner">
                    <p><strong>Native Name:</strong>${nativeName.length ? nativeName.map(native => {return native.official}) : "No Native Name"}</p>
                    <p><strong>Population:</strong>${data.population}</p>
                    <p><strong>Region:</strong>${data.region}</p>
                    <p><strong>Subregion:</strong>${data.subregion}</p>
                </div>
                <div class="inner_right">
                    <p><strong>Capital:</strong>${data.capital ? data.capital : "No Capital"}</p>
                    <p><strong>Currencies:</strong>${currencies.length ? currencies.map(currency => {return currency}) : "No Currency"}</p>
                    <p><strong>Languages:</strong>${languages.length ? (
                        languages.map(language =>{ return language}
                    )) : "No Language"}</p>
                </div>
            </div>
        </div>
    </div>
    `;
    const back = countryModal.querySelector(".back");
    back.addEventListener("click", () => {
        countryModal.classList.toggle("show");
    });
}