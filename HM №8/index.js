const ul = document.querySelector("ul");
const firstInput = document.querySelector("input[value='Вибрати перший елемент']");
const lastInput = document.querySelector("input[value='Вибрати останній елемент']");
const nextInput = document.querySelector("input[value='Вибрати наступний елемент']");
const previousInput = document.querySelector("input[value='Вибрати попередній елемент']");
const addToTheEndInput = document.querySelector("input[value='Додати елемент у кінець']");
const deleteAtTheBeginningInput = document.querySelector("input[value='Видалити елемент з початку']");
const deleteAtTheEndInput = document.querySelector("input[value='Видалити елемент з кінця']");
const deleteAtTheCenterInput = document.querySelector("input[value='Видалити елемент з середини']");
const addToTheBeginningInput = document.querySelector("input[value='Додати елемент на початок']");

function allBlack() {
    const otherElements = document.querySelector("ul").children;
    for (let i = 0; i < otherElements.length; i++) {
        otherElements[i].classList.remove("select");
        otherElements[i].classList.add("black");
        otherElements[i].classList.remove("black");
    }
}

function disabled(){
    
    if(ul.childElementCount === 0){
        firstInput.setAttribute("disabled", "true");
        lastInput.setAttribute("disabled", "true");
        nextInput.setAttribute("disabled", "true");
        previousInput.setAttribute("disabled", "true");
    }else{
        firstInput.removeAttribute("disabled");
        lastInput.removeAttribute("disabled");
        nextInput.removeAttribute("disabled");
        previousInput.removeAttribute("disabled");
        
    }
}

firstInput.onclick = function(){
    allBlack();
    disabled();
    const firstElement = ul.firstElementChild.classList.add("select");
}

lastInput.onclick = function(){
    allBlack();
    disabled();
    const lastElemenet = ul.lastElementChild.classList.add("select");
}

nextInput.onclick = function(){
    let selected = document.querySelector(".select");
    allBlack();
    disabled();
    if(selected.nextElementSibling){
        selected.nextElementSibling.classList.add("select");
    }else{
        ul.firstElementChild.classList.add("select");
    }
}

previousInput.onclick = function(){
    let selected = document.querySelector(".select");
    allBlack();
    disabled();
    if(selected.previousElementSibling){
        selected.previousElementSibling.classList.add("select");
    }else{
        ul.lastElementChild.classList.add("select");
    }
}

addToTheEndInput.onclick = function(){
    disabled();
    let addToTheEndElement = document.createElement("li");
    addToTheEndElement.textContent = "New Item";
    ul.append(addToTheEndElement);
}
deleteAtTheBeginningInput.onclick = function(){
    disabled();
    let firstElementDelete = ul.firstElementChild;
    if(firstElementDelete){
        ul.removeChild(firstElementDelete);
    }
}
deleteAtTheEndInput.onclick = function(){
    disabled();
    let lastElementDelete = ul.lastElementChild;
    if(lastElementDelete){
        ul.removeChild(lastElementDelete);
    }
}

deleteAtTheCenterInput.onclick = function(){
    disabled();
    if(ul.childElementCount <= 2){
        alert("Тут немає центральних елементів для видалення!")
    }
    else if(ul.childElementCount % 2 === 0 ){
        const centerElementIndex = ul.childElementCount/2;
        const centerElement1 = ul.children[centerElementIndex];
        const centerElement2 = ul.children[centerElementIndex+1];
        ul.removeChild(centerElement1) && ul.removeChild(centerElement2);
    }else if (ul.childElementCount % 2 === 1 ){
        const centerElementIndex = Math.round(ul.childElementCount/2);
        const centerElement = ul.children[centerElementIndex];
        ul.removeChild(centerElement);
    }
}

addToTheBeginningInput.onclick = function(){
    disabled();
    let addToTheBeginningElement = document.createElement("li");
    addToTheBeginningElement.textContent = "New Item";
    ul.prepend(addToTheBeginningElement);
} 