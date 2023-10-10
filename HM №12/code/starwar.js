function req(url, cb) {
    const loader = document.querySelector(".modal")
    loader.classList.add("show")
    const newReq = new XMLHttpRequest();
    newReq.open("GET", url);
    newReq.addEventListener("readystatechange", () => {
        // console.log(newReq.readyState);
        if (newReq.readyState === 4 && newReq.status >= 200 && newReq.status < 300) {
            cb(JSON.parse(newReq.response));
            loader.classList.remove("show")
        } else if (newReq.readyState === 4) {
            loader.classList.remove("show")
            throw new Error("Помилка у запиті");
        }
    })
    newReq.send()
} 

req("https://swapi.dev/api/", createNavigationMenu)

const allInfoContainer = document.querySelector(".all-info-container");

function createNavigationMenu (menu = {}) {
    const navItem = Object.entries(menu);
    const nav = document.querySelector("nav")
    const navElement = navItem.map(([keys, values])=>{
         const div = document.createElement("div");
         div.innerText = keys;
         div.classList.add("link-item");
         div.addEventListener("click", () => {
            allInfoContainer.innerHTML = "";
            const fn = (info) =>{
                info = info["results"];
                createInfoContainer(info);
            }
            req(values, fn);
         })
         return div
    })
    nav.append(...navElement)
}

function createInfoContainer (Container = []) {
    let result = Container.map(values =>{
        const infoContainer = document.createElement("div");
        infoContainer.classList.add("info-container");
        for(let key in values){
            if(values.hasOwnProperty(key)){
                const h1 = document.createElement("h1");
                h1.innerText = key;
                const p = document.createElement("p");
                p.innerText = values[key];
                infoContainer.appendChild(h1);
                infoContainer.appendChild(p);
            }
        }
        allInfoContainer.appendChild(infoContainer);
    })
}                 

const test = ""
export default test