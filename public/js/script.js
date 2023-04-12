

function displayTime(){
    const timeElement = document.getElementById('time')
    const currentTime = new Date().toLocaleTimeString('en-US', {hour:'2-digit',minute:'2-digit',hour12:true})
    timeElement.textContent = currentTime
}

function alertClient(){
    axios.get('/tasks/api')
    .then((response) =>{
        console.log(response.data)
    })
    .catch((err) => {
        console.log(err)
    })
}

// setInterval(displayTime, 1000)
// setInterval(alertClient, 1000)
