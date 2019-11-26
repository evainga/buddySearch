## This is your app to find a buddy for bouldering and climbing.

*BB* is my playground for the WTMB JS course 2019.

### Start the application
Start the application with 
`node index.js`  
then you can open 
[localhost:3000](http://localhost:3000)  

### Boulderer
To see all boulderers you can visit: 
[localhost:3000/boulderer/all](http://localhost:3000/boulderer/all)  
To see a specific boulderer you can visit: 
[localhost:3000/boulderer/{id}](http://localhost:3000/boulderer/{id})  
To create a boulderer you can use: 
`axios.post('/boulderer', {name:'example name', level:'BEGINNER'|'MEDIUM'|'ADVANCED'|'PROFESSIONAL'})`  
To delete a boulderer you can use: 
`axios.delete('/boulderer/{id}')`  

### Location
To see all locations you can visit: 
[localhost:3000/location/all](http://localhost:3000/location/all)  
To see a specific location you can visit: 
[localhost:3000/location/{id}](http://localhost:3000/location/{id})  
To create a location you can use: 
`axios.post('/location', {name:'example location-name'})`  
To delete a location you can use: 
`axios.delete('/location/{id}')`  


### Buddy-Search
To see all buddy-searches you can visit: 
[localhost:3000/buddy-search/all](http://localhost:3000/buddy-search/all)  
To see a specific buddy-search you can visit: 
[localhost:3000/buddy-search/{id}](http://localhost:3000/buddy-search/{id})  
To delete a buddy-search you can use: 
`axios.delete('/buddy-search/{id}')`  

To create a buddy-search you can use: 
`axios.post('/buddy-search/search', {bouldererId: {id}, locationId: {id}, date: '2019-11-3'})`  
To join a buddy-search you can use: 
`axios.post('/buddy-search/join', {bouldererId: {id}, searchId: {id}})`  