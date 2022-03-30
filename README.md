# myfirstsite

Hi! 
This project contains the front-end app using Vue.js components, bootstrap and CSS.

This project belongs with the Backend project on: https://github.com/GPossel/myfirstsite-php

This project can be run with the following command:

#### vue serve

Following endpoint:

#### http:localhost:8080/



Backend calls:

Login
  - / POST http://localhost:8081/src/repository/login.php
                                                          formData:
  
      - returns JWT in header
 
Articles
  - / GET http://localhost:8081/src/repository/articles.php
    - returns all articles on page
  - / POST [AUTHORIZED] http://localhost:8081/src/repository/articles.php


      formData:
                title:A new Article
                writer:G. Possel
                innerText:A new Article about fun facts.
                fullText:This article contains a lot of funny facts about PHP.
                
                
      - creates a new article, if you are logged in


  - / POST [AUTHORIZED] http://localhost:8081/src/repository/articles.php?id=4&action=insert


      formData:
              title:A new Article
              writer:G. Possel
              innerText:A new Article about fun facts.
              fullText:This article contains a lot of funny facts about PHP.

      - updates a article, if you are logged in
  
  - / DELETE [AUTHORIZED] http://localhost:8081/src/repository/articles.php?id=2
      - deletes a article, if you are logged in
                                                                                

This project was made by Gentle (639567) and is only for educational purposes. 2022
