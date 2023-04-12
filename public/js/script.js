

function displayTime(){
    const timeElement = document.getElementById('time')
    const rawTime = new Date().toLocaleTimeString('en-US', {hour12: false})
    const currentTime = new Date().toLocaleTimeString('en-US', {hour:'2-digit',minute:'2-digit',hour12:true})
    timeElement.textContent = currentTime
    return rawTime
}



function alertClient(){
    axios.get('/tasks/api')
    .then((response) =>{
        const currentTime = displayTime()
        const currentUser = response.data.currentUserId.id
        const tasks = response.data.tasks
        const currentDate = new Date().toISOString().slice(0,10)
        tasks.forEach(task => {
            if(task.userId === currentUser && currentTime === task.time && currentDate === task.day.slice(0,10)){
                console.log('a reminder for: ',task.task)
            }
        })
    })
    .catch((err) => {
        console.log(err)
    })
}

setInterval(displayTime, 1000)
setInterval(alertClient, 1000)
