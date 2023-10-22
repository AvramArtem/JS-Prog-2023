window.addEventListener("DOMContentLoaded", () => {
    const preloader = document.querySelector(".preloader");
    setTimeout(() => { preloader.classList.add("hide") }, 3000)
})

const locationPlanet = "https://rickandmortyapi.com/api/location";
const randomIDLocation = Math.floor(Math.random() * 126) + 1;
const body = document.querySelector(".characters .body")
/*
const pro = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("+")
    }, 13000)
    setTimeout(() => {
        reject("+")
    }, 5000)
})

pro.then((info)=>{
    console.log(info);
}).catch(()=>{})
*/

//const req = fetch("https://rickandmortyapi.com/api/location");
/*
req.then((data)=>{
   return data.json()
}).then(data => {
    console.log(data);
})
*/

const req = async function (url) {
    const data = await fetch(url);
    if (data.status === 200) {
        return data.json()
    } else {
        throw new Error("Error Fetch :" + data.status)
    }
}

function showRandomLoaction({ name, type, dimension, created }) {
    document.querySelector("#name .data").innerHTML = name;
    document.querySelector("#type .data").innerHTML = type;
    document.querySelector("#dimension .data").innerHTML = dimension;
    document.querySelector("#created .data").innerHTML = created;
}

req("https://rickandmortyapi.com/api/character/")
    .then(cars => {
        if (!Array.isArray(cars.results)) throw new Error("Ми отримали не масив :(")
        nextAndPrev(cars.info)
        cars.results.map(car => {
            createElementCharacters(car)
        })
    })

function createElementCharacters({ image, name, status, id , species, type, gender, origin}) {
    const card = document.createElement("div");
    const imageEL = document.createElement("img");
    const nameEL = document.createElement("div");
    const statusEL = document.createElement("div");
    const go = document.createElement("button");
    const addFavirite = document.createElement("button");
    const info = document.createElement("div");

    card.classList.add("card");
    go.classList.add("go");
    go.classList.add("bold");
    go.innerText ="Go";
    addFavirite.classList.add("start");
    addFavirite.innerHTML =`<i class="fa-solid fa-star"></i>`
    info.classList.add("characters-iformation");

    card.append(imageEL, go, addFavirite, info);
    info.append(nameEL, statusEL);

    imageEL.src = image;
    imageEL.alt = name;
    nameEL.innerHTML = `<div><div class="bold">Name</div><div>${name}</div></div>`;
    statusEL.innerHTML = `<div><div class="bold">Status</div><div>${status}</div></div>`;

    body.append(card)

    go.addEventListener("click", () => {
        // Відобразити модалку з даними.
        const main = document.querySelector("main")

        const divMain = document.createElement("div");
        divMain.classList.add("div-main");

        const divWhite = document.createElement("div");
        divWhite.classList.add("div-white");

        const divImage = document.createElement("div");
        const img = document.createElement("img");

        const divInfo_Icons = document.createElement("div");
        divInfo_Icons.classList.add("div-info-icons");

        const divInfo = document.createElement("div");
        divInfo.classList.add("div-info");

        const divIcons = document.createElement("div");
        divIcons.classList.add("div-icons");

        divInfo_Icons.append(divInfo,divIcons);
        divWhite.append(divImage, divInfo_Icons);
        divMain.append(divWhite);
        main.append(divMain);

        img.src = image;
        divImage.append(img);
        divInfo.innerHTML = `<h1>${name}</h1>
        <b>Status:</b> ${status}
        <b>Species:</b> ${species}
        <b>Type:</b> ${type}
        <b>Gender:</b> ${gender}
        <b>Origin:</b> ${origin.name}`;

        divIcons.innerHTML=`
        <i class="fa-solid fa-gun"></i>
        <i class="fa-solid fa-dna"></i>
        <i class="fa-solid fa-globe"></i>
        <i class="fa-solid fa-rocket"></i>
        `;

        const closeButton = document.createElement("button");
        closeButton.classList.add("close-button");
        closeButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`; 
        divWhite.append(closeButton);

        closeButton.addEventListener("click",() => {
            main.removeChild(divMain);
        })
    })

    // записати поточного пересонажа до себе в локальне сховище.
    addFavirite.addEventListener("click", () => {
        const favorites = JSON.parse(localStorage.getItem("favorite")) || [];

        const existingIndex = favorites.findIndex(favorite => favorite.id === id);

        if (existingIndex !== -1) {
            favorites.splice(existingIndex, 1);
            localStorage.setItem("favorite", JSON.stringify(favorites));
            addFavirite.classList.remove("start-add")
            console.log("Персонаж видалений зі списку улюблених.");
        } else {
            favorites.push({ id, image, name, status });
            localStorage.setItem("favorite", JSON.stringify(favorites));
            addFavirite.classList.add("start-add");
            console.log("Персонаж доданий до списку улюблених.");
        }
    });

    imageEL.addEventListener("click",()=>{
        const main = document.querySelector("main");
        const divImg = document.createElement("div");

        divImg.classList.add("div-card-image");
        imageEL.classList.add("card-image")

        divImg.append(imageEL);
        main.append(divImg);
       
        imageEL.addEventListener("mousedown",()=>{
            main.removeChild(divImg);
            card.insertBefore(imageEL, card.firstElementChild)
            imageEL.classList.remove("card-image");
        })
        
    })
}

//При настиску оновити дані карточок, показати нову порцію
function nextAndPrev({ prev, next }) {
    const _next = document.querySelector("#next");
    const _prev = document.querySelector("#prev");

    _next.addEventListener("click", () => {
        body.innerHTML = "";
    })
    _prev.addEventListener("click", () => {
        body.innerHTML = "";
    })
}

req(locationPlanet + "/" + randomIDLocation)
    .then((data) => {
        showRandomLoaction(data)
    })

