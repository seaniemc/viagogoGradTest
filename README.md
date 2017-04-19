# viagogoGradTest
This program takes a pair of x and y coordinates from the user and returns a list of the five closet events, with the data of id and cheapest ticket price.  
The program was written in the Javascript frame work of Angular js. 

## How to run the program. 
You can download the zip of the project or use git clone 
```
git clone https://github.com/seaniemc/viagogoGradTest.git
```
To run the program you need to run a web server, and open a web borwser on port 8080 (localhost:8080).
Open command prompt and navigate to the project directory. I used a Nodejs server but you can use one of your choosing.
To run the Node server type command.
```
 http-server
 ```
 open up a web broswer and type 
 ```
 localhost:8080
 ```
 
 ## Assumptions Made
 + The world is 20 by 20, 20 X and 20 Y
 + Data for the event x,y and ticksPrice were to be randomly generated. 
 + Ticket prices in US dollars
 + Return only the cheapest price.
 + Only one event per X and y coordinate.
 
 ## What would I change?
 
 + If I was working with larger world I would have more events. I would also represent the data in a Graphical form on a
 HTML canvas object. 
 + If I had multiple events at the same location I would return the cheapest event ticket for the location. 
 
