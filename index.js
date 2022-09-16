// creating variables to get the elements
let alertContainer = document.querySelector('div.alertContainer');
const alarmSubmit = document.getElementById('alarmSubmit');
let alarmContainer = document.querySelector('div.alarmContainer');
let alarmClose = document.querySelector('div.alarmClose');
let clock = document.getElementById('clock');
let validAlarm= false;
let audio = new Audio('audio/alarm-tone.mp3');

//clock function
function updateClock(){
    let currentTime = new Date();
    let currentHour = currentTime.getHours();
    let currentMinutes = currentTime.getMinutes();
    let currentSeconds = currentTime.getSeconds();

    
    // Add 0 to minutes and seconds if they are <0 through ternary if-else statements
    currentMinutes = (currentMinutes < 10 ? "0" : "" ) + currentMinutes;
    currentSeconds = (currentSeconds < 10 ? "0" : "" ) + currentSeconds;
    
    //choosing AM/PM as per the time through ternary if-else statement
    let timeOfDay = (currentHour < 12) ? "AM" : "PM";
    //converting railway clock to AM/PM clock through ternary if-else statements
    currentHour = (currentHour > 12 ) ? currentHour - 12 : currentHour;
    currentHour = (currentHour == 0 ) ? 12 : currentHour;

    // Showing real time clock on the PAge
    let currentTimeStr = currentHour + ":" + currentMinutes + ":" + currentSeconds + " " + timeOfDay;
    clock.innerHTML =`<h1><b><b>⏰ ${currentTimeStr}</b></b></h1>` ;
}

//adding event to the text area and calling the function
alarm.addEventListener('blur',()=>{
    console.log('name is blurred');
    //Validate time here through Regular Expression Literals
    let regex = /^([a-zA-z]){0,10}\s([0-9]){2}\s([0-9]){4}\s([0-9]){2}\:([0-9]){2}\:([0-9]){2}$/;
    let str = alarm.value;
    console.log(regex,str);
    if(regex.test(str)){
        console.log('Your time is valid');
        alarm.classList.remove('is-invalid');
        validAlarm = true;

    }
    else{
        console.log('Your time is not valid');
        alarm.classList.add('is-invalid');
        validAlarm = false;
    }
})

//adding event to the submit button and calling the function
alarmSubmit.addEventListener('click',(e) =>{
    e.preventDefault();
    // calculating the time left for the alarm to get ringed by (set time - current time)
    if(validAlarm && alarm.value){
        let alarm = document.getElementById('alarm');
        let alarmDate = (new Date(alarm.value)).getTime();
        console.log("alarm time is" ,alarmDate);
        alarmDate = Number(alarmDate);
        console.log(`Setting Alarm for ${alarmDate}`);
        let now = new Date().getTime();
        now = Number(now);
        console.log("now time is ",now);
        let timeToAlarm = alarmDate - now;
        console.log(timeToAlarm);  
        // function to gat the timespan for the alarm to get ring  
        if(timeToAlarm>=0){
            setTimeout(() => {
                ringBell();
            }, timeToAlarm);
        }
        //Showing text for alarm set
        alarmContainer.innerHTML= `<div><h4 class="m-6 p-6">Your Alarm has been set for: ${alarm.value}</h4>
        <div><button type="button" class="btn btn-primary m-6 p-6" id="alarmClose" onclick="closeAlarm(this.id)" ><h6 class="m-0 p-0" >Close</h6></button></div></div>`

        //Showing success alert for setting the alarm and clearing the text area of the form
        alertContainer.innerHTML=`<div class="alert alert-success alert-dismissible fade show" role="alert" style="--bg-opacity: 0;">
        <strong>Success!</strong> Your alarm has been set.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`
        alarm.value="";
    }
    else{
        //showing alert for not setting the alarm and clearing the text area of the form
        alertContainer.innerHTML=`<div class="alert alert-danger alert-dismissible fade show" role="alert" style="--bg-opacity: 0;">
        <strong>Alert!</strong> Your alarm has not been set.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`

        alarm.value="";
    }


})

// ring function
function ringBell() {
    audio.play();
}

function closeAlarm(){
    alarmContainer.innerHTML=""
    audio.pause();
    audio.currentTime = 0;
}


