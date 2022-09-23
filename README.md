# Take-home Exercise: Sortable Table

👋 Hello! Thanks so much for taking part in our interview process! We know that it takes time and effort away from other things, and we appreciate it.

We set this exercise up for a couple of reasons that we hope resonate with you:
1. We think that a 1-hour window into coding a single problem is only going to provide us with a narrow view of your skills; and we get it – the extra pressure of trying to solve some gotcha-type of question doesn't do anyone justice, either
2. We want to mimic an experience as close as possible to what you'd be doing on a day-to-day basis as a Frontend Engineer here at Gusto – reading through requirements, debating different approaches and putting up a PR for review 🙌

This question is scoped down to what we think can be tackled in 4 hours or less, but otherwise, the requirements listed below, the designs provided alongside those and the process is very similar to what you could expect from working at Gusto.

This exercise is very important in assessing your technical fit, so make sure you're happy with the result and that it reflects your skills. Your submission should be something you would be proud to submit on the job. Please commit your changes to a new branch in this repo, and once you're happy with the result, create a pull request with a description of your changes.

**When you're done, please email your recruiter a link to your PR.**

Your changes will be graded based on adherence to product and design requirements, performance, browser support, code readability and organization, error handling, lack of defects, and documentation. We'll get back to you within a week of your submission with the outcome. Please note that we will not provide you with detailed feedback on the exercise.

**We've provided some code to get you started, though there are a few bugs in there that you'll have to deal with first.** Let us know if you have any questions. Good luck! 🍀

For reference, we use the following tech stack for this exercise:
* [TypeScript](https://www.typescriptlang.org)
* [React](https://reactjs.org)
* [Jest](https://jestjs.io)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

# Product requirements :books:

**Note:** These product requirements are created in loosely the same style you would see internally at Gusto, but the problem statement and goals were made up for this exercise.

## The Problem
Often enough, Gusto users need to deal with large sets of data – in this exercise, that would be a list of the cities of the world.
We are looking to offer a delightful user-experience when it comes to searching, sorting and navigating through such datasets.

<img src="https://user-images.githubusercontent.com/9911645/171285680-74d420e9-faff-439d-929d-923f8b699c51.png" width="800px" />

In this exercise, we'll be focusing on these elements of your implementation:
* The reusability/flexibility of the `<SortableTable>` component (or set of components) you'll be coding up
* The user interface and user experience of your app:
  * Visual design
  * Navigation and Accessibility
  * Performance

## User-focused Requirements

### Search
* [x] :star: **P0**: As a user, I want to search for cities by city name
* [x] :star: **P0**: As a user, I want to search for cities by country name
* [ ] :star: **P0**: As a user, I should know when a search is pending
* [ ] :star: **P0**: As a user, I should know when a search does not match any city
* [ ] :star: **P0**: As a user, I should know when a search fails (**Note: if you search for 'error', we mimic an error for you :raised_hands:**)
* [ ] P1: [Performance] As a user, I want search to only kick-in after 150ms since my last change to the search term

### Sorting
* [ ] :star: **P0**: As a user, I want to to be able to toggle sorting (ascending) the search results by a single column
* [ ] **P1**: As a user, I want to to be able to toggle between ascending, descending or no sorting of the search results by a single column
* [ ] **P2**: As a user, I want to to be able to toggle between ascending, descending or no sorting of the search results by multiple columns

### Pagination
* [ ] :star: **P0**: As a user, I want to to be able to paginate through search results using a fixed page size (10)
* [ ] :star: **P0**: As a user, I want to to be able to navigate between result pages
* [ ] **P2**: As a user, I want to to be able to paginate through search results using a dynamic page size
* [ ] **P3**: As a user, I want to to be able to go all the way to the first and last pages of the search results

### Accessibility
* [ ] **P1**: As a user, I want to to be able to navigate through the search results using my keyboard
* [ ] **P3**: As a user, I want to to be able to use a screen reader to review search results

### Design

*For reference, you can use the screenshot in the problem statement above. We've also uploaded some icons you might want to use for your implementation – you can find these under src/assets/..* :pray:

* [ ] :star: **P0**: As a Gusto engineer, when I use `<SortableTable>`, its design matches Gusto's default design
* [ ] **P2**: As a Gusto engineer, I can theme the `<SortableTable>` component with my own visual design
* [ ] **P3**: As a user, I can view the search results on a narrow screen

## Open questions

* How many columns do we want to support?
* How complicated would it be to allow users to change the columns' order? :thinking_face:
* Can we make it easy to hide/show columns?
* Support for checkbox columns, single/multi selection in the table?
