const body = document.querySelector("body");
const container = document.querySelector(".container");
const eventArr = ["click", "mouseover", "mouseout", "keydown", "keyup", "keydown"];
const letterArr = ["a", "e", "d", "c", "b"];

// create button and div element
eventArr.forEach(item => {
    const newDiv = document.createElement("div");
    const newBtn = document.createElement("button");
    const colorDiv = document.createElement("div");
    colorDiv.innerHTML = 
    `<h2>Color <i class="fa-solid fa-palette"></i></h2>
    <input  type="color" style="width: 60%;">
    <p id="color"></p>`
    newBtn.textContent = item;
    newDiv.appendChild(colorDiv);
    newDiv.appendChild(newBtn);
    container.appendChild(newDiv);
    newDiv.className = "div";
    newBtn.classList.add("btn", `${item}`);
    colorDiv.className = "colorDiv"
})

//  button array
const buttons = document.querySelectorAll("button");
buttons[5].classList.add("enter");
buttons[5].textContent = "enter";

// random color
function random(count){
    if(count == 0){
        return "";
    }
    
    return Math.trunc(Math.random()*2) ? Math.trunc(Math.random()*10) + random(count - 1) : letterArr[Math.trunc(Math.random()*5)] + random(count - 1)
}

// when the event happened
const button = function(element){
    const color = `#${random(6)}`;
    element.parentElement.querySelector("input").value = color;
    element.parentElement.style.background = color;
    element.parentElement.querySelector("p").textContent = color;
}

// copying the color name from the icon
const copy = function(element){
    navigator.clipboard.writeText(element.parentElement.querySelector("input").value);
}

// changing the color with input type="color"
const input = function(element){
    const value = element.parentElement.querySelector("input").value;
    element.parentElement.style.background = value;
    element.parentElement.querySelector("p").textContent = value;
}

buttons.forEach(btn => {
    button(btn);
    btn.addEventListener(btn.classList[1], (e) => {
        if (btn.classList[2] !== undefined){
            if(e.key == "Enter"){
                button(btn);
                return;
            }
        }else{
            button(btn);
        }
    });

    btn.parentElement.querySelector("i").addEventListener("click", () => {
        copy(btn);
    });
    
    btn.parentElement.querySelector("input").addEventListener("input", () => {
        input(btn);
    } )    
})