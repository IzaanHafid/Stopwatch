
let startButton = document.getElementById('start');
let stopButton = document.getElementById('stop');
let resetButton = document.getElementById('reset');
let clock = document.getElementById('stopwatch');
let errorText = document.getElementById('error_text');


function Stopwatch() {
    let startTime, endTime, running = false, duration = 0;

    function pad(number) {
        return number < 10 ? '0' + number : number;
    }

    function formatTime(seconds) {
        let hours = Math.floor(seconds / 3600);
        seconds %= 3600;
        let minutes = Math.floor(seconds / 60);
        let secs = seconds % 60;
        return `${pad(hours)}:${pad(minutes)}:${pad(secs.toFixed(2))}`;
    }

    function updateClock() {
        if (running) {
            let currentTime = new Date();
            let elapsedTime = (currentTime - startTime) / 1000 + duration;
            clock.textContent = formatTime(elapsedTime);
        }
    }

    this.start = function() {
        if (running) {throw new Error('Stopwatch has already been started');}
        running = true;
        startTime = new Date();
        intervalId = setInterval(updateClock, 10);
    }

    this.stop = function() {
        if (!running) {throw new Error('Stopwatch is already stopped');}
        running = false;
        endTime = new Date();
        duration += (endTime - startTime) / 1000;
        clearInterval(intervalId); 
        clock.textContent = formatTime(duration);
        return clock.textContent;
    }

    this.reset = function() {
        startTime = null;
        endTime = null;
        running = false;
        duration = 0;
        clearInterval(intervalId);
        clock.textContent = '00:00:00.00';
    }

    Object.defineProperty(this, 'duration', {
        get: function() { return duration; },
        set: function() { throw new Error('Cannot set duration'); }
    });
}

let sw = new Stopwatch();

startButton.onclick = function() {
    try {
        errorText.textContent = ``
            sw.start();
    } catch (error) {
        errorText.textContent = `Error: ${error.message}`
    }
}

stopButton.onclick = function() {
    try {
        errorText.textContent = ``
        clock.textContent = sw.stop()
    } catch (error) {
        errorText.textContent = `Error: ${error.message}`
    }
}

resetButton.onclick = function() {
    errorText.textContent = ``
    sw.reset();
    clock.textContent = '00:00:00.00';
}
