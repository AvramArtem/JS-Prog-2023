/*

5. Дано інпути. Зробіть так, щоб усі інпути втрати фокусу перевіряли свій вміст на правильну кількість символів. 
Скільки символів має бути в інпуті, зазначається в атрибуті data-length. 
Якщо вбито правильну кількість, то межа інпуту стає зеленою, якщо неправильна – червоною.

*/

const inputs = document.querySelectorAll("#container-1 input");

inputs.forEach( input =>{
    const length = parseInt(input.getAttribute("data-length"));

    input.addEventListener("focus", ()=>{
        input.classList.remove("green");  
        input.classList.remove("red");  
    })

    input.addEventListener("blur",()=>{
        if(input.value.length === length){
            input.classList.add("green");  
        }else if(input.value.length === 0){
            alert("Введіть щось!");
        }
        else{
            input.classList.add("red");
        }
    });

});

export default inputs;