# News Flash
*A full-stack web app by Joe Avila*
#### [News Flash Deployed](https://news-flash-50a6e.web.app/)
##### Please allow some time for backend to load up.
#### [Backend Repo](https://github.com/javila35/News-Flash-Backend)

# Current bugs: 
I lost a good amount of fuctionality after deploying. My original API is not supported, and I am currently fixing to accomodate the API I am able to use.

## Tools Utilized
* Redux:
    * Saving logged user in store.
    * Saving navigation display across page re-renders.
* CSS: 
    * All CSS written by me (with lots of help from Stack Overflow and W3schools.)
* NewsAPI.org
    * Big thanks to [NewsAPI.org](https://newsapi.org/) for an easy to use API with great documentation.
* GNews API
    * Switched to [GNews API](https://gnews.io/) after deploying to Firebase due to HTTPS protocol.
        * some functionality was lost in this change as the JSON returned is different.
        

## Features to Add
* User will be able to save searches as a link in the navigation.
* Users can decide what topics they want as a ticker on their homepage.



## Set Up
**You will need to set up the backend, before the front end for usability.**
* Fork and clone this repository.
* Run ```npm install``` in your terminal to download needed dependencies.
* Run ```npm start``` in your terminal **after starting backend server**.
* Create an account and begin bookmarking articles and discussing.






## Resources
* Loading Component provided by [ReactLoading](https://github.com/fakiolinho/react-loading)
* ICO by [Paomedia](https://github.com/paomedia/small-n-flat)
* Articles from [NewsAPI](https://newsapi.org/)
* Seed data created using [Faker](https://github.com/faker-ruby/faker)



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).