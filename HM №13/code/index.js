const [...inputs] = document.querySelectorAll("input[type='radio']"),
    [...toppings] = document.querySelectorAll(".ingridients img"),
    pizza = {
        pizzaSize: { name: "big", price: 110 },
        pizzaSause: [],
        pizzaTopping: []
    },
    validatorREG = (value, pattern) => pattern.test(value),
    pizzaPrise = {
        pizzaSize: {
            small: 50,
            mid: 90,
            big: 110
        },
        pizzaSause: {
            sauceClassic: {
                price: 30,
                name: "Класік"
            },
            sauceBBQ: {
                price: 35,
                name: "BBQ"
            },
            sauceRikotta: {
                price: 30,
                name: "Білий"
            }

        },
        pizzaTopping: {
            moc1: {
                price: 40,
                name: "Чедер"
            },
            moc2: {
                price: 42,
                name: "Фета"
            },
            moc3: {
                price: 46,
                name: "Моцарелла"
            },
            telya: {
                price: 52,
                name: "Шинка"
            },
            vetch1: {
                price: 33,
                name: "Томати"
            },
            vetch2: {
                price: 37,
                name: "Гриби"
            }
        }
    };

function show(pizza) {
    const price = document.getElementById("price");
    const sauces = document.getElementById("sauces");
    const topping = document.getElementById("topping");

    const sauceQuantities = {};

    const sauceEl = pizza.pizzaSause.map((e) => {
        const div = document.createElement("div");
        sauceQuantities[e.name] = 1;
        div.innerText = `${e.name}: X ${sauceQuantities[e.name]}`;

        const plus = document.createElement("button");
        plus.classList.add("button-plus-minus");
        plus.innerText = "+";
        plus.addEventListener("click", ()=>{
            sauceQuantities[e.name] += 1;
            div.innerText = `${e.name}: X ${sauceQuantities[e.name]}`;
            updateTotalPricePlus();
        });
        
        const minus = document.createElement("button");
        minus.classList.add("button-plus-minus");
        minus.innerText = "-";
        minus.addEventListener("click", () => {
            if (sauceQuantities[e.name] && sauceQuantities[e.name] > 0) {
                sauceQuantities[e.name] -= 1;
                div.innerText = `${e.name}: X (${sauceQuantities[e.name]})`;
                updateTotalPriceMinus();
            }
        });

        div.prepend(plus);
        div.append(minus);
        return div; 
    })

    sauces.innerHTML = "";
    sauces.append(...sauceEl);   

    const toppingQuantities = {};

    const toppingEl = pizza.pizzaTopping.map((e) => {
        const div = document.createElement("div");
        toppingQuantities[e.name] = 1;
        div.innerText = `${e.name}: X ${toppingQuantities[e.name]}`;

        const plus = document.createElement("button");
        plus.classList.add("button-plus-minus");
        plus.innerText = "+";
        plus.addEventListener("click", ()=>{
            toppingQuantities[e.name] += 1;
            div.innerText = `${e.name}: X ${toppingQuantities[e.name]}`;
            updateTotalPricePlus();
        });
        
        const minus = document.createElement("button");
        minus.classList.add("button-plus-minus");
        minus.innerText = "-";
        minus.addEventListener("click", () => {
            if (toppingQuantities[e.name] && toppingQuantities[e.name] > 0) {
                toppingQuantities[e.name] -= 1;
                div.innerText = `${e.name}: X (${toppingQuantities[e.name]})`;
                updateTotalPriceMinus();
            }
        });

        div.prepend(plus);
        div.append(minus);
        return div; 
    })

    topping.innerHTML = "";
    topping.append(...toppingEl)

    let totalPrice = 0;
    totalPrice = pizza.pizzaSize.price;
    price.innerText = totalPrice;

    function updateTotalPricePlus() {
        let totalPrice = 0;
        pizza.pizzaSause.forEach((sauce) => {
            totalPrice += sauce.price * (sauceQuantities[sauce.name] || 1);
        });
        pizza.pizzaTopping.forEach((topping) => {
            totalPrice += topping.price * (toppingQuantities[topping.name] || 1);
        });
        totalPrice += pizza.pizzaSize.price;
        price.innerText = totalPrice;
    }
    function updateTotalPriceMinus() {
        let totalPrice = 0;
        pizza.pizzaSause.forEach((sauce) => {
            totalPrice -= sauce.price * (sauceQuantities[sauce.name] || 1);
        });
        pizza.pizzaTopping.forEach((topping) => {
            totalPrice -= topping.price * (toppingQuantities[topping.name] || 1);
        });
        totalPrice += pizza.pizzaSize.price;
        price.innerText = totalPrice;
    }
}

inputs.forEach(input => {
    input.addEventListener("change", () => {
        pizza.pizzaSize = { name: input.value, price: pizzaPrise.pizzaSize[input.value] }
        show(pizza)
    })
})

// Працюємо з начинкою
toppings.forEach(function (topping) {
    topping.addEventListener("click", () => {
        addImgTable(topping.src)
        if (topping.id.includes("sauce")) {
            pizza.pizzaSause.push(pizzaPrise.pizzaSause[topping.id])
        } else if (topping.dataset.topping.includes("topping")) {
            pizza.pizzaTopping.push(pizzaPrise.pizzaTopping[topping.id])
        }
        show(pizza)
    })
})

function addImgTable(src) {
    const img = document.createElement("img");
    const table = document.querySelector(".table");
    img.src = src;
    table.append(img)
}

// Контакти
const userName = document.getElementById("name"),
    userPhone = document.getElementById("phone"),
    userEmail = document.getElementById("email")

userName.addEventListener("input", () => {
    const patternName = /^[а-яґєїі-]{2,20}$/i;
    if (validatorREG(userName.value, patternName)) {
        userName.classList.add("success")
        userName.classList.remove("error");
        pizza.userName = userName.value;
    } else {
        userName.classList.add("error")
        userName.classList.remove("success");
        pizza.userName = "";
    }
})

userPhone.addEventListener("input", function () {
    const pattern = /^\+380\d{9}$/;
    if (validatorREG(this.value, pattern)) {
        console.log("+");
        this.classList.add("success")
        this.classList.remove("error");
        pizza.userPhone = this.value;
    } else {
        this.classList.add("error")
        this.classList.remove("success");
        pizza.userPhone = "";
    }
})

userEmail.addEventListener("input", function () {
    const pattern = /^[a-z.0-9-]+@[a-z.-0-9]+\.[a-z.]{2,8}$/;
    if (validatorREG(this.value, pattern)) {
        console.log("+");
        this.classList.add("success")
        this.classList.remove("error");
        pizza.userMail = this.value;
    } else {
        this.classList.add("error")
        this.classList.remove("success");
        pizza.userMail = "";
    }
})

// Знижка, яка віткає від нас.
const discount30 = document.querySelector("#banner");

discount30.addEventListener("mouseover", () => {
    let x = Math.floor(Math.random()/2 * (window.innerWidth - discount30.offsetWidth));
    let y = Math.floor(Math.random()/2 * (window.innerHeight - discount30.offsetHeight));

    discount30.style.bottom = x + "px";
    discount30.style.right = y + "px";
});

show(pizza)