# News Flash

_A full-stack web app by Joe Avila_
**Update on 03/01/2021: I am currently rewriting the app to use Typescript and some new tricks I've learned since original release.**

**Update on 04/01/2021: Having refactored the site to typescript, I'm now working on adding functionality and styling with Material UI**

#### [News Flash Deployed](https://news-flash-site.netlify.app/)

_Please allow some time for backend to load up._

#### [Backend Repo](https://github.com/javila35/News-Flash-Backend)

## Tools Utilized

- [React Query](https://github.com/tannerlinsley/react-query)
  - Used to simplify handling state dependent on async queries
- [ReactLoading](https://github.com/fakiolinho/react-loading)
  - Loading graphics
- Redux: **Removed in favor of React state management**
  - Saving logged user in store.
  - Saving navigation display across page re-renders.
- CSS:
  - All CSS written by me (with lots of help from Stack Overflow and W3schools.)
  - I am migrating to use Material UI.
- GNews API
  - Thank you to GNews for providing solid documentation about an API that feeds my website.

## Features to Add

- User will be able to save searches as a link in the navigation.
- Users can decide what topics they want as a ticker on their homepage.

### Set Up

**You will need to set up the backend, before the front end for usability.**

- Fork and clone this repository.
- Run `npm install` in your terminal to download needed dependencies.
- Run `npm start` in your terminal **after starting backend server**.
- Create an account and begin bookmarking articles and discussing.

### Resources

- ICO by [Paomedia](https://github.com/paomedia/small-n-flat)
- Seed data created using [Faker](https://github.com/faker-ruby/faker)
