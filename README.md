# Equestrian Organizer

## Keep Track of your horses
Equestrian Organizer is a simple and user-friendly application designed for equestrians to track and manage their horses. The app allows users to add, delete, and update horses, as well as assign tasks to individual horses or themselves. It provides an organized and efficient way for equestrians to manage their daily activities and horse-related responsibilities.

## Installation Instructions
* Fork this respository
* Click on code buttona and copy the HTTPS link
* In your terminal type out "git clone" and then paste your link
* After it loads you will have access to the code

## Approach Taken

The first idea was to create the basic. In this case the models first, then the view templates and then finally the templates relating to CRUD.
Once the model was created I was able to stub out the code for the index.js and the first controller. In each controller I thought about what they needed to do. The needed a place where it can read info from the database (GET) Also needed to be able to send that info to the ejs files (POST). The user also needed to be able to edit (PUT) or delete (DESTROY) info from the database as well. Once the routes were made it became easier to make each ejs template and style it up with css. Taking this approach made the code easy to follow during development and in turn made it easier to find and fix bugs. 

## Technologies Used 
* Sequelize and pg - both of these were used for setting up the database and were my choice of ORM
* Axios - this was used to pull info from the weather API and send it to the backend. From there the information was divided and saved to be sent back to the user.
* Body-parser - this was used to parse info being sent from my frontend javascript (script.js) to my backend routes (tasks.js). This allowed my route to read the info that was coming in a req.body format.
* CORS - (Cross Origin Resource Sharing) This allowed me to communicate information from frontend javascript to back end. It gave me control over which origins are allowed to access the resources. Without this the code in my script.js file wouldn't have communicated well with the code in my backend.
* Twilio - This program was my favorite to use. I created an account which gave me access to a twilio number. Using the SID and AUTH_KEY they gave me it allowed the application to send texts to the users phone. 
* Method Override - This allowed the PUT and DESTROY to work in my CRUD functions. By installing this it gives the user access through the backend to change the data in the server.
* Bcrypt and Crypto-js - both of these were used to hash the users passwords and also encrypt user data. Without it any person including myself as the programmer would be able to see the password created. This keeps user login info confidential
* Cookie-parser - With this it makes it possible to leave a user installed during application use. It parses the info from the browser to the application so that it can be used in backend code.
* Express and EJS - These two are the most used in the application. Letting me send info (express) to the templates that the users see (ejs). The best is that the info sent to the ejs file can still be written in javascript when wrapped by specific code (<% %>)
* Dotenv - This is an essential part of the project, it allows me to keep the encryption key, auth keys and tokens private from git and others and still allows me to use those as variables in the rest of my code.

## API

Weather API - https://www.weatherapi.com
limits at 5,000,000 calls per month

![WeatherAPI](./images/weatherAPI.png)
---
## RESTful Routing Chart
![RESTful Routing Chart](./images/Restful.png)
---
## ERD
![ERD](./images/erd.png)
---
## Wireframe
![Wireframe](./images/wireframe.png)
---
## User Stories
* User needs to be able to create an account and log in so that they can have a personalized experience
* User needs to be able to add a horse with basic information (name, breed, age, and picture) so that they can keep track of their horses
* User needs to be able to delete a horse when it's no longer in their care or if they made a mistake when adding it
* User needs to be able to view a list of my horses with their basic information so that they can have an overview of their horses
* User needs to be able to assign tasks to their horses (e.g., grooming, feeding, exercise) with deadlines, so that they can manage their care efficiently
* User needs to be able to view a list of tasks assigned to each horse so that they can easily see what needs to be done for each horse
* User needs to be able to create tasks for themselves (e.g., buying horse feed, scheduling a vet appointment) so that they can stay organized
* User needs to be able to view a list of my personal tasks so that they can manage their responsibilities effectively
## MVP
* Simple display of sunrise and sunset on header for user convenience
* User authentication and authorization (register, login, logout)
* CRUD operations for horses (add, edit, delete, view)
* CRUD operations for tasks (add, edit, delete, view)
* Assign tasks to horses or users
* Responsive and user-friendly interface
* An easy to use form for inputting the data in for the horses with functional buttons
* An easy to use form for inputting the tasks for the user/horses with functional buttons
## Stretches
* Calendar view for tasks with reminders and notifications
* Horse health tracking (vaccinations, vet visits, etc.)
* Advanced search and filtering options for horses and tasks
* Upload personal photos of horse
* Set up a text reminding system(through twilio)
* Make the app Ipad accesible
## Potential Roadblocks
* I think that having a page that shows the users tasks and also the tasks for the horses could be difficult. I need them to be organized without mixing them up
* I feel like styling will be the most difficult part for me, putting things into the correct places is important to a good user experience
* If i use twilio, i want to have the user verify the phone number on their own, so that could be a big hurdle to overcome(if it's possible)
## Post Project Reflection
* I learned that i didnt have to instal body-parser and that Express has it's own version (express.json()), I would have been more thorough with resarching how to fix my issue with parsing data.
* I feel like there could have been a way to create my functions that handled the clock and also iterrating through the database in the backend instead of the frontend javascript (script.js). With hindsight this would have made the code cleaner, easier to read and also would have required less packaged to download (CORS, body-parser)
* I learned that its better to put down every single idea down and organzie it fully before the project. I still had things that i wants to include but i hadn't planned out and it cause some roadblocks and also took away time that could have been used for the project.
* I overall happy with the project, I learned a lot more CSS which was a goal of mine and the relationship between server and backend and frontend have become transparent for me now!
