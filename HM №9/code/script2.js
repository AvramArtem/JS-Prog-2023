const display = document.querySelector(".container-stopwatch ");

const start = document.querySelector(".stopwatch-control").firstElementChild;
const stop = start.nextElementSibling;
const reset = document.querySelector(".stopwatch-control").lastElementChild;

const ss = document.querySelector(".stopwatch-display").lastElementChild;
const mm = ss.previousElementSibling;
const hh = document.querySelector(".stopwatch-display").firstElementChild;

let sec = 0;
let min = 0;
let hour = 0;

let isCounting = false;
let interval = 0;

letsGo = () =>{
    sec++;
    if(sec === 60){
        sec = 0;
        min++;
    }
    if(min === 60){
        min = 0;
        hour++;
    }
    ss.innerText = `${sec < 10 ? "0" + sec : sec}`;
    mm.innerText = `${min < 10 ? "0" + min : min}`;
    hh.innerText = `${hour < 10 ? "0" + hour : hour}`;
}

resetColor = () =>{
    if(document.querySelector(".green")){
        const green = document.querySelector(".green");
        green.classList.remove("green");
    }
    if(document.querySelector(".red")){
        const red = document.querySelector(".red");
        red.classList.remove("red");
    }
    if(document.querySelector(".silver")){
        const silver = document.querySelector(".silver");
        silver.classList.remove("silver");
    }
}

start.onclick = () => {
    resetColor();
    if(!isCounting){
        interval = setInterval(letsGo, 1);
        isCounting = true;
    }else{
        alert("Відлік вже пішов!");
    }
    display.classList.add("green");
}

stop.onclick = () => {
    if(isCounting){
        resetColor();
        isCounting = false;
        clearInterval(interval);
        display.classList.add("red");
    }
}

reset.onclick = () => {
    resetColor();
    sec = 0;
    min = 0;
    hour = 0;
    ss.innerText = "0" + sec;
    mm.innerText = "0" + min;
    hh.innerText = "0" + hour;
    if(interval === 0){
        display.classList.add("black");
    }else{
        display.classList.add("silver");
    }
}