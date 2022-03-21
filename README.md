# myfirstsite

Hi! 
This project contains the front-end app using Vue.js components, bootstrap and CSS.

This project belongs with the Backend project on: https://github.com/GPossel/myfirstsite-php

This project can be run with the following command:
vue serve

Following endpoint:

### http:localhost:8080/



Backend calls:

/ GET http://localhost:8081/src/repository/contacts.php
returns all contacts

/ GET http://localhost:8081/src/repository/contacts.php uri ?id=1
returns contact on id

/ POST http://localhost:8081/src/repository/login.php form-data { "username": "gen", "psw": "gen" }
returns JWT in header


This project was made by Gentle (639567) and is only for educational purposes. 2022
