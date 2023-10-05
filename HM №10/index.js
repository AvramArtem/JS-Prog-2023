const display = document.querySelector(".display input");
const buttons = document.querySelectorAll(".button");
const M = document.querySelector(".display p");
const Dot = document.querySelector("input[value='.']");

let clickCounter = 0; // змінна для кнопки MRC
let memory = "";
let result = "";
let operator = "";
let number1 = "";
let number2 = "";

// Для взаємодії з будь-якою кнопкою
buttons.forEach(button =>{
    button.addEventListener("click", function(){
        
        let valueButton = button.value;
        const numberDetection = /\d/;

        // Для визначення двох чисел
        if(numberDetection.test(valueButton) || valueButton === "."){
            if(operator === ""){
                number1 += valueButton;
                if(valueButton === "."){
                    Dot.setAttribute("disabled", "true");
                }
                display.value = number1;
            }
            else {
                number2 += valueButton;
                display.value = number2;
            }
        }
        
        // Для визначення оператора
        if(valueButton === "+" || valueButton === "-" || valueButton === "*" || valueButton === "/"){
            operator = valueButton; 
        }

        // Дія операторів, перезапис результату та задіяних чисел в операції
        if(number1 !== "" && number2 !== "" && operator){
            if(valueButton === "=" || valueButton === "+" || valueButton === "-" || valueButton === "*" || valueButton === "/"){
                number1 = parseFloat(number1);
                number2 = parseFloat(number2);
                switch(operator){
                    case "+":
                        result = number1 + number2
                        number1 = result
                        number2 = ""
                        result = ""
                        display.value = number1
                        break;
                    case "-":
                        result = number1 - number2
                        number1 = result
                        number2 = ""
                        result = ""
                        display.value = number1
                        break;
                    case "*":
                        result = number1 * number2
                        number1 = result
                        number2 = ""
                        result = ""
                        display.value = number1
                        break;
                    case "/":
                        result = number1 / number2
                        number1 = result
                        number2 = ""
                        result = ""
                        display.value = number1
                        break;
                    default:
                        alert("Щось пішло не так!");
                    }
                }
            }
        
        // Кнопка стирання
        if(valueButton === "C"){
            if(number2 === ""){
                number1 = "";
                operator = "";
                display.value = "";
            }
            else if(result === ""){
                number2 = "";
                display.value = "";
            }
            else if(result !== ""){
                number1 = "";
                operator = "";
                number2 = "";
                result = "";
                display.value = "";
            }
        }

        // Кнопки M+ та M- (Для додавання числа в памʼять та відповідно його видалення)
        if(valueButton === "M+"){
            memory = display.value;
            memory *=1;
            M.style.display = "inline";
            
        }
        else if(valueButton === "M-"){
            memory = "";
            M.style.display = "none";
        }

        // Для виведення числа з памʼяті за допомогою MRC
        if(valueButton === "MRC" && memory !== ""){
            clickCounter++;
            display.value = memory;
            if(clickCounter === 2){
                display.value = "";
                memory = "";
                M.style.display = "none";
                clickCounter = 0;
            }
        }
   
    })
});

/*
Дана верстка макета калькулятора. Необхідно зробити цей калькулятор робітником.
* При натисканні на клавіші з цифрами - набір введених цифр має бути показаний на табло калькулятора.
* При натисканні на знаки операторів (`*`, `/`, `+`, `-`) на табло нічого не відбувається - програма чекає введення другого числа для виконання операції.
* Якщо користувач ввів одне число, вибрав оператор і ввів друге число, то при натисканні як кнопки `=`, так і будь-якого з операторів, в табло повинен з'явитися результат виконання попереднього виразу.
* При натисканні клавіш `M+` або `M-` у лівій частині табло необхідно показати маленьку букву `m` - це означає, що в пам'яті зберігається число. Натискання на MRC покаже число з пам'яті на екрані. Повторне натискання `MRC` має очищати пам'ять. 
*/