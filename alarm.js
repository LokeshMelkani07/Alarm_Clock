const display = document.getElementById('clock');
const audio = new Audio('old-alarm-clock.mp3');
audio.loop = true;

// To set alarm
let alarmTime = null;
// To clear alarm
let alarmTimeout = null;

// Update the clock
function updateTime() {
    const date = new Date();
    const hours = formatTime(date.getHours());
    const minutes = formatTime(date.getMinutes());
    const seconds = formatTime(date.getSeconds());

    display.innerHTML = `${hours} : ${minutes} : ${seconds}`;
}

// To give a prefix of 0 to digits when time is single digit time like 1 -> 01 or 9 -> 09
function formatTime(time) {
    if (time < 10) {
        return '0' + time;
    }
    return time;
}

// Setting the alarm time to the input we gave
function setAlarmTime(value) {
    alarmTime = value;
    console.log(alarmTime);
}

// Set the alarm when user presses set alarm button
function setAlarm() {
    // if alarmtime has been assigned a value then only go inside
    if (alarmTime) {
        const current = new Date();  // get current time
        const timeToAlarm = new Date(alarmTime);
        // if time set for alarm is > current time then set it
        if (timeToAlarm > current) {
            // In how much time we want to fire the alarm
            const timeout = timeToAlarm.getTime() - current.getTime();
            // set timeout according to timeout
            alarmTimeout = setTimeout(() => {
                audio.play();
            }, timeout);
            alert('Alarm Set');
        }
    }
}

// Clear the alarm
function clearAlarm() {
    audio.pause();
    if (alarmTimeout) {
        // clearTimeout clears the setTimeout function
        clearTimeout(alarmTimeout);
        alert('Alarm Cleared');
    }
}

// update the time after every 1 second
setInterval(updateTime, 1000);