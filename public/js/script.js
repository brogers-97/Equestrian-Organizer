function displayTime(){
    const timeElement = document.getElementById('time')
    const currentTime = new Date().toLocaleTimeString('en-US', {hour:'2-digit',minute:'2-digit',hour12:true})
    timeElement.textContent = currentTime
}

setInterval(displayTime, 1000);