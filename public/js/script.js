

// this function creates two different formats of the current time. One is used on the profile.ejs and displays time in a 12 hour format (currentTime line 7) The other return time in 24 hour format so that it can be checked against the database.
function displayTime(){
    const timeElement = document.getElementById('time')
    const rawTime = new Date().toLocaleTimeString('en-US', {hour12: false})
    const currentTime = new Date().toLocaleTimeString('en-US', {hour:'2-digit',minute:'2-digit',hour12:true})
    if(timeElement){
        timeElement.textContent = currentTime // the time element is called in profile.ejs and its text content is set to the current time wheneever this function is called
    }
    return rawTime
}




// this function receives the data from my tasks.js route and pulls it with axios.
function alertClient(){
    axios.get('/tasks/api')
    .then((response) =>{
        const currentTime = displayTime()
        const currentUser = response.data.currentUserId.id
        const tasks = response.data.tasks
        const currentDate = new Date().toISOString().slice(0,10)

        // everytime the function is called, this will iterate through all of the tasks in the database belonging to every user. If there is a taks which time and date matches the current time and date set by my above function (displayTime) it creates a message that is then sent into another function (line 32).
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


// this function create an api request with axios.post (line 46). It sends the message passed into if from my above function (alertClient())
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

// both of these functions are being called every 30 seconds.
setInterval(displayTime, 30000)
setInterval(alertClient, 30000)
