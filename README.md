# KidZone (Kid to Kid - Sustainable Parenting Begins with Reuse)

## What is KidZone

- Kidzone is a website designed to help parents buy and sell used toys, so as to promote reusability, environmental conscience and reduce waste.
- The website requires all users to be registered to be able to view listings and to sell a toy they have.   
   
   <br>

## Running Instructions   

<br>

### Initializing environment variables and installing dependencies
---

After downloading the repository there are some things that need to be configured before you are able to run the app in your local environment.

You have to create a .env file and inside add two environment variables:

* PORT= (INSERT PORT NUMBER HERE)
    * This variable points to the sepecific port you want to use to be able to access your app when it is running.
* SESSION_SECRET=(WRITE STRING TO BE USED AS SECRET)
    * This string is used as a unique identifier of your machine for the express app session open.

After that you should run the following command:

        npm install
        
This will download and install all the dependencies necessary to run the app correctly.

<br><br>

 ### Running the local server
 ---

 To run the local server you must then use one of two commands:


        nodemon server.js
        
This command will initiate a live-updated session on the selected port in the environment variable so the server can be updated live with any changes made to the code.

--

        node server.js
        
This command will initiate a session on the selected port in the environment variable, using all the code that is present on the files at the moment the command is ran. If further changes are made, they will not be updated live and server must be shut down and restarted.

---

<br>

### Stopping the server

To stop the server from running you can press, while on the terminal, crtl + C if you're on windows or cmd + C if you're on mac.

## KidZone Demo

Follow the link to view the website demo:
https://kidzone-ivo-hathu.herokuapp.com/