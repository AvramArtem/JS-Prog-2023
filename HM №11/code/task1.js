/*

4.
- При завантаженні сторінки показати користувачеві поле введення (`input`) з написом `Price`. Це поле буде служити для введення числових значень
- Поведінка поля має бути такою:
- При фокусі на полі введення – у нього має з'явитися рамка зеленого кольору. При втраті фокусу вона пропадає.
- Коли забрали фокус з поля - його значення зчитується, над полем створюється `span`, в якому має бути виведений текст.

Поруч із ним має бути кнопка з хрестиком (`X`). Значення всередині поля введення фарбується зеленим.
- При натисканні на `Х` - `span` з текстом та кнопка `X` повинні бути видалені.
- Якщо користувач ввів число менше 0 - при втраті фокусу підсвічувати поле введення червоною рамкою, 
під полем виводити фразу - `Please enter correct price`. `span` зі значенням при цьому не створюється.

*/

const input = document.createElement("input");
input.placeholder = "Price";

const btn = document.createElement("button");
btn.innerText = "X";

const span = document.createElement("span");
const paragraph = document.createElement("p");
paragraph.innerText ="Enter a price greater than zero!"; 

const container = document.querySelector("#container");
container.append(input);


input.addEventListener("focus", () => {
    input.classList.remove("red-border");
    input.classList.add("green-border");
    container.removeChild(paragraph);
})

input.addEventListener("blur", () => {
    container.append(btn);
    input.classList.remove("green-border");
    const inputValue = parseFloat(input.value);

    if(isNaN(inputValue)){
        alert("Enter a price greater than zero!");
    }
    else if(inputValue < 0){
        container.append(paragraph);
        input.classList.add("red-border");
    }
    else{
        span.innerText = inputValue;
        container.prepend(span);
    }
});

btn.addEventListener("click", () => {
    if(span.innerText){
        container.removeChild(span);
        container.removeChild(btn);
    }
})

export default input;