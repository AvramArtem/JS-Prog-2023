//

const ajax = new XMLHttpRequest();
const btn = document.querySelector("button"),
    windowEl = document.querySelector(".window"),
    loader = document.querySelector(".modal"),
    url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json";

btn.addEventListener("click", () => {
    loader.classList.add("show")
    setTimeout(()=>{
        send(url, show);
    }, 5000)
})

function send(url, callback) {
    ajax.open("GET", url);

    ajax.send();

    ajax.addEventListener("readystatechange", () => {
        if (ajax.readyState === 4 && ajax.status === 200) {
            callback(JSON.parse(ajax.response), windowEl);
        }else if (ajax.readyState === 4 && ajax.status !== 200){
            console.error("Помилка");
        }
    })
}



function show(data, vE) {
    data.map((cur, i) => {
        const tr = document.createElement("tr");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        console.log(cur);
        td1.innerText = (i + 1);
        td2.innerText = cur.txt;
        td3.innerText = cur.rate.toFixed(2);
        tr.append(td1, td2, td3)
        vE.append(tr)
    })
    loader.classList.remove("show")
}

export default ajax