# textile-raverlyesque

A databaes/interface like raverly for textiles


## TODOS:

### Server
* Local Authorization
    ~~ * persistent sessions ~~
    ~~* mongo user models~~
       ~~ * basic crytopgraphy (bcrypt) ~~
    ~~ * passport-local ~~
    * throttle bad logins
* RESTful API
    * CRUD for submissions
    * CRUD for users
    * Rate Limiting
* Database
    * mongo submission model
    * mongo account model

### Client
* Home Page
* Navbar
* Footer
* Create Submission Page
* View Submission Page
* Login Page
* Database Interface
    * Filters

#### Buisness 
* find a reasonable cloud service for hosting
* find a reasonable cloud service for serving static files
    * ( like user PDFS and IMAGES)
    * AWS3 (5GB free for 12 months)
* secure a reasonable domain name 
* build and fail quickly
* don't worry about scaling until proven viability