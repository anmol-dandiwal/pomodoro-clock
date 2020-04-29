let sessionRunning = false;
let breakRunning = false;
let timerRunning = false;
let timerPaused = false;

const sessionTime = document.getElementById("sessionTime");
const breakTime = document.getElementById("breakTime");
const timer = document.getElementById("currentTime");
let minutes = parseInt(sessionTime.innerHTML, 10);
let seconds = 0;
let decrementMin;
let decrementSec;

//Overloading modular arithmeti to return correct values of negative numbers 
Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
}

//Used to increment session and break times (only when said timer is inactive)
const timeSetButtons = document.querySelectorAll(".timeSet > button");
timeSetButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        switch (e.target.id){
            case "sessionInc":
                if (sessionTime.innerHTML < 99 && !sessionRunning){
                    sessionTime.innerHTML = parseInt(sessionTime.innerHTML, 10) + 1;
                    timer.innerHTML = parseInt(sessionTime.innerHTML, 10) + ":00";
                }
                break;
            case "sessionDec":
                if (sessionTime.innerHTML > 1 && !sessionRunning){
                    sessionTime.innerHTML = parseInt(sessionTime.innerHTML, 10) - 1;
                    timer.innerHTML = parseInt(sessionTime.innerHTML, 10) + ":00";
                }
                break;
            case "breakInc":
                if (breakTime.innerHTML < 99 && !breakRunning){
                    breakTime.innerHTML = parseInt(breakTime.innerHTML, 10) + 1;
                }
                break;
            case "breakDec":
                if (breakTime.innerHTML > 1 && !breakRunning){
                    breakTime.innerHTML = parseInt(breakTime.innerHTML, 10) - 1;
                }
        }
    })
})

//Used to control timer
const controlButtons = document.querySelectorAll(".controls > button");
controlButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        switch(e.target.id){
            case "startButton":
                controlButtons[0].textContent = "Start";
                controlButtons[0].setAttribute("style",
                                               "width: 125px");                
                timerRunning = true;
                startSessionTimer();
                break;
            case "pauseButton":
                controlButtons[0].setAttribute("style",
                                               "width: 150px");
               controlButtons[0].textContent = "Resume";
                timerPaused = true;
                pauseTimer();
                break;
            case "stopButton":
                controlButtons[0].textContent = "Start";
                controlButtons[0].setAttribute("style",
                                                "width: 125px");
                timerPaused = false;
                timerRunning = false;
                sessionRunning = breakRunning = false;
                pauseTimer();
                document.querySelector(".clock > h2").textContent = "Session";
                timer.innerHTML = sessionTime.innerHTML + ":00";
                document.querySelector("title").innerHTML = document.querySelector(".clock > h2").textContent + ": " + timer.innerHTML;
                break;
            case "resetButton":
                controlButtons[0].textContent = "Start";
                controlButtons[0].setAttribute("style",
                                                "width: 125px");
                timerPaused = false;
                timerRunning = false;
                sessionRunning = breakRunning = false;
                pauseTimer();
                sessionTime.innerHTML = 25;
                breakTime.innerHTML = 5;
                timer.innerHTML = sessionTime.innerHTML + ":00";
                document.querySelector("title").innerHTML = document.querySelector(".clock > h2").textContent + ": " + timer.innerHTML;
                break;
        }
    })
})

function pauseTimer(){
    clearInterval(decrementSec);
}

function startSessionTimer(){   
    document.querySelector(".clock > h2").textContent = "Session";
    sessionRunning = true; 
    if (!timerPaused){
        minutes = parseInt(sessionTime.innerHTML, 10);
        seconds = 0; 
        decrementSec = setInterval(decSeconds, 1000);
    } else {
        decrementSec = setInterval(decSeconds, 1000);
    }
}

function startBreakTimer(){
    decrementMin = true;
    document.querySelector(".clock > h2").textContent = "Break";
    if (!timerPaused){
        minutes = parseInt(breakTime.innerHTML, 10);
        seconds = 0; 
        decrementSec = setInterval(decSeconds, 1000);
    } else {
        decrementSec = setInterval(decSeconds, 1000);
    }
}

function decSeconds(){
    seconds = (seconds - 1).mod(60);
    if (decrementMin === false && seconds == 0){
        timer.innerHTML = "0:00";
        clearInterval(decrementSec);
        if (sessionRunning){
            startBreakTimer();
            sessionRunning = false;
            breakRunning = true;
        } else {
            startSessionTimer();
            decrementMin = true;
            sessionRunning = true;
            breakRunning = false;
        }
    } else if (seconds < 10){
        timer.innerHTML = minutes + ":0" + seconds;
    } else if (seconds == 59) {
        decMinutes();
        timer.innerHTML = minutes + ":" + seconds;
    } else {
        timer.innerHTML = minutes + ":" + seconds;
    }
    document.querySelector("title").innerHTML = document.querySelector(".clock > h2").textContent + ": " + timer.innerHTML;
}

function decMinutes(){
    minutes = minutes - 1;
    if (minutes == 0){
        clearInterval(decrementMin);
        decrementMin = false;
    }
}
