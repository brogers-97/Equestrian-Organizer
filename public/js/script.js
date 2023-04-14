

function displayTime(){
    const timeElement = document.getElementById('time')
    const rawTime = new Date().toLocaleTimeString('en-US', {hour12: false})
    const currentTime = new Date().toLocaleTimeString('en-US', {hour:'2-digit',minute:'2-digit',hour12:true})
    if(timeElement){
        timeElement.textContent = currentTime
    }
    return rawTime
}





function alertClient(){
    axios.get('/tasks/api')
    .then((response) =>{
        const currentTime = displayTime()
        //console.log(currentTime)
        const currentUser = response.data.currentUserId.id
        //console.log(currentUser)
        const tasks = response.data.tasks
        //console.log(tasks)
        const currentDate = new Date().toISOString().slice(0,10)
        if(currentUser){
            tasks.forEach(task => {
                if(currentTime.slice(0,5) === task.time.slice(0,5) && currentDate === task.day.slice(0,10)){
                    let message = `A reminder for: ${task.task}`
                    console.log(message)
                    sendMessageToServer(message)
                }
            })
        }
    })
    .catch((err) => {
        console.log(err)
    })
}

function sendMessageToServer(message){
    if(message){
        axios.post('/tasks/send-message', {message})
        .then((response)=> {
            console.log('message sent successfully')
        })
        .catch((err) => {
            console.log('error sending message', err)
        })
    } else{
        console.log('message in empty')
    }
}


setInterval(displayTime, 30000)
setInterval(alertClient, 30000)
