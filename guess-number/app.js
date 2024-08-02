const input = document.querySelector("#input");
const startBtn = document.querySelector(".start");
const restartBtn = document.querySelector(".restart");
const checkBtn = document.querySelector(".check");
const select = document.querySelector(".form-select");
const canvas = document.getElementById('hangmanCanvas');
const ctx = canvas.getContext('2d');
let result = document.querySelector(".result");
let message = document.querySelector(".message");
let scoreSpan = document.querySelector("#score");
let max, wrongGuesses = 0, score, topScore = 0;
let random;
let level = "";

document.querySelector("body").onload = () => {
    checkBtn.disabled = true;
    input.disabled = true;
    select.focus();
}

// select level
select.addEventListener("change", function() {
    level = this.value;
    this.blur();
})

// start button
startBtn.onclick = () => {
    if(!level){
        Swal.fire({
            title: "You must to select a difficulty level!",
            showClass: {
              popup: `
                animate__animated
                animate__fadeInUp
                animate__faster
              `
            },
            hideClass: {
              popup: `
                animate__animated
                animate__fadeOutDown
                animate__faster
              `
            }
          });
    }else{
        restartBtn.classList.remove("d-none");
        startBtn.style.display = "none";

        switch (level){
            case "easy":
                max = 10;
                score = 3;
                break;
            case "medium":
                max = 50;
                score = 5;
                break;
            case "hard":
                max = 100;
                score= 9;
                break;               
        }
        scoreSpan.textContent = score;
        checkBtn.disabled = false;
        input.disabled = false;
        input.focus();
        random = Math.ceil(Math.random() * max);
        console.log(random);
        select.disabled = true;
        input.setAttribute("max", max);
    }
}

// input keyup -> enter
document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
})

input.addEventListener("keyup", (e) => {
    if(e.key == "Enter"){
        e.preventDefault();
        game();
    }
})


function game(){
    const guess = input.value;

    if (!guess){
        Swal.fire("Enter the number!");
    }else if(guess < 1 || guess > max){
    } else if (guess == random){
        message.textContent = "Congratulations, You saved the man 🎉";
        result.textContent = random;
        checkBtn.disabled = true;
        
        if (score - wrongGuesses > topScore) {
                topScore = score - wrongGuesses;
                document.querySelector("#top-score").textContent = topScore;
        }
        result.classList.add("scale-animation");
    }else {
        wrongGuesses++;
        if (score - wrongGuesses > 0){
            scoreSpan.textContent = score - wrongGuesses;
            message.textContent = guess > random ? "Azalt" : "Arttır";

            // adam asmaca
        }

        if(score == 9){
            drawHangmanHard();
        } else if (score == 5){
            drawHangmanMedium();
        } else {
            drawHangmanEasy();
        }

        if (score - wrongGuesses == 0){
            // Tüm adam çizildi, oyun bitti
            message.textContent = "Game over. The man is dead ☠️";
            scoreSpan.textContent = 0;
            checkBtn.disabled = true;
            result.textContent = random;
            result.classList.add("scale-animation");
        }
    }
    input.focus();
}

// hard
function drawHangmanHard() {
    ctx.beginPath();
    ctx.lineWidth = 5;
    switch (wrongGuesses) {
        case 1:
            // Dikey direk
            ctx.moveTo(150, 180);
            ctx.lineTo(150, 20);
            ctx.stroke();
            break;
        case 2:
            // Üst yatay direk
            ctx.moveTo(150, 20);
            ctx.lineTo(100, 20);
            ctx.stroke();
            break;
        case 3:
            // İp
            ctx.moveTo(100, 20);
            ctx.lineTo(100, 40);
            ctx.stroke();
            break;
        case 4:
            // Baş
            ctx.beginPath();
            ctx.arc(100, 50, 10, 0, Math.PI * 2, true);
            ctx.stroke();
            canvas.style.backgroundColor = "rgba(207, 79, 79, 0.7)";
            break;
        case 5:
            // Gövde
            ctx.moveTo(100, 60);
            ctx.lineTo(100, 100);
            ctx.stroke();
            break;
        case 6:
            // Sol kol
            ctx.moveTo(100, 70);
            ctx.lineTo(80, 90);
            ctx.stroke();
            break;
        case 7:
            // Sağ kol
            ctx.moveTo(100, 70);
            ctx.lineTo(120, 90);
            ctx.stroke();
            break;
        case 8:
            // Sol bacak
            ctx.moveTo(100, 100);
            ctx.lineTo(80, 120);
            ctx.stroke();
            canvas.style.backgroundColor = "rgba(133, 6, 6, 1)";
            break;
        default:
            // Sağ bacak
            ctx.moveTo(100, 100);
            ctx.lineTo(120, 120);
            ctx.stroke();
    }
}

// medium
function drawHangmanMedium() {
    ctx.beginPath();
    ctx.lineWidth = 5;
    switch (wrongGuesses) {
        case 1:
            // Dikey direk
            ctx.moveTo(150, 180);
            ctx.lineTo(150, 20);
            ctx.stroke();
            // Üst yatay direk
            ctx.moveTo(150, 20);
            ctx.lineTo(100, 20);
            ctx.stroke();
            break;
        case 2:
            // İp
            ctx.moveTo(100, 20);
            ctx.lineTo(100, 40);
            ctx.stroke();
            // Baş
            ctx.beginPath();
            ctx.arc(100, 50, 10, 0, Math.PI * 2, true);
            ctx.stroke();
            canvas.style.backgroundColor = "rgba(207, 79, 79, 0.7)";
            break;
        case 3:
            // Gövde
            ctx.moveTo(100, 60);
            ctx.lineTo(100, 100);
            ctx.stroke();
            break;
        case 4:
            // Sol kol
            ctx.moveTo(100, 70);
            ctx.lineTo(80, 90);
            ctx.stroke();
            // Sağ kol
            ctx.moveTo(100, 70);
            ctx.lineTo(120, 90);
            ctx.stroke();
            canvas.style.backgroundColor = "rgba(133, 6, 6, 1)";
            break;
        default:
            // Sol bacak
            ctx.moveTo(100, 100);
            ctx.lineTo(80, 120);
            ctx.stroke();
            // Sağ bacak
            ctx.moveTo(100, 100);
            ctx.lineTo(120, 120);
            ctx.stroke();
    }
}

// easy
function drawHangmanEasy() {
    ctx.beginPath();
    ctx.lineWidth = 5;
    switch (wrongGuesses) {
        case 1:
            // Dikey direk
            ctx.moveTo(150, 180);
            ctx.lineTo(150, 20);
            ctx.stroke();
            // Üst yatay direk
            ctx.moveTo(150, 20);
            ctx.lineTo(100, 20);
            ctx.stroke();
            // İp
            ctx.moveTo(100, 20);
            ctx.lineTo(100, 40);
            ctx.stroke();
            // Baş
            ctx.beginPath();
            ctx.arc(100, 50, 10, 0, Math.PI * 2, true);
            ctx.stroke();
            canvas.style.backgroundColor = "rgba(207, 79, 79, 0.7)";
            break;
        case 2:
            // Gövde
            ctx.moveTo(100, 60);
            ctx.lineTo(100, 100);
            ctx.stroke();
            // Sol kol
            ctx.moveTo(100, 70);
            ctx.lineTo(80, 90);
            ctx.stroke();
            // Sağ kol
            ctx.moveTo(100, 70);
            ctx.lineTo(120, 90);
            ctx.stroke();
            canvas.style.backgroundColor = "rgba(133, 6, 6, 1)";
            break;
        default:
            // Sol bacak
            ctx.moveTo(100, 100);
            ctx.lineTo(80, 120);
            ctx.stroke();
            // Sağ bacak
            ctx.moveTo(100, 100);
            ctx.lineTo(120, 120);
            ctx.stroke();
    }
}

// restart button
restartBtn.onclick = () => {
    random = Math.ceil(Math.random() * 20);

    wrongGuesses = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    select.selectedIndex = 0;
    message.textContent = "Game is starting again..";
    canvas.style.backgroundColor = "rgba(238, 216, 207, 0.4)";
    result.textContent = "?";
    input.value = "";
    scoreSpan.textContent= 0;
    select.disabled = false;
    checkBtn.disabled = true;
    level = "";
    restartBtn.classList.add("d-none");
    startBtn.style.display = "inline";
    result.classList.remove("scale-animation");
    select.focus();
}