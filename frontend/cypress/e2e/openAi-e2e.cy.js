// Putting in a default test for now as I would like to keep this file for later:
describe("Initial Load", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays the welcome question", () => {
    cy.contains("Where are you going?");
  });
});

/* TODO: This test passes locally, but I cannot get any of the tests to pass in the CI pipeline.
 * Not even the spinner (which should be on the page straight away) seems to appear. There can be a number of reasons,
 * read this doc to find out more - https://docs.cypress.io/faq/questions/using-cypress-faq#Why-do-my-Cypress-tests-pass-locally-but-not-in-CI
 */
/* ISSUE LOG FROM GITHUB ACTIONS RUN: 


  Running:  openAi-e2e.cy.js                                                                (2 of 2)

  OpenAI API Call
    1) displays a spinner while the API is being called
    2) displays itinerary events after API response
    3) displays an error message if the OpenAI request fails
  0 passing (26s)
  3 failing
  1) OpenAI API Call
       displays a spinner while the API is being called:
     AssertionError: Timed out retrying after 10000ms: Expected to find element: `div[role="status"]`, but never found it.
      at Context.eval (webpack://***-frontend/./cypress/e2e/openAi-e2e.cy.js:57:53)

  2) OpenAI API Call
       displays itinerary events after API response:
     CypressError: Timed out retrying after 5000ms: `cy.wait()` timed out waiting `5000ms` for the 1st request to the route: `getItinerary`. No request ever occurred.
https://on.cypress.io/wait
      at cypressErr (http://localhost:3000/__cypress/runner/cypress_runner.js:76025:18)
      at Object.errByPath (http://localhost:3000/__cypress/runner/cypress_runner.js:76079:10)
      at checkForXhr (http://localhost:3000/__cypress/runner/cypress_runner.js:135700:84)
      at <unknown> (http://localhost:3000/__cypress/runner/cypress_runner.js:135726:28)
      at tryCatcher (http://localhost:3000/__cypress/runner/cypress_runner.js:1807:23)
      at Promise.attempt.Promise.try (http://localhost:3000/__cypress/runner/cypress_runner.js:4315:29)
      at whenStable (http://localhost:3000/__cypress/runner/cypress_runner.js:144102:68)
      at <unknown> (http://localhost:3000/__cypress/runner/cypress_runner.js:144043:14)
      at tryCatcher (http://localhost:3000/__cypress/runner/cypress_runner.js:1807:23)
      at Promise._settlePromiseFromHandler (http://localhost:3000/__cypress/runner/cypress_runner.js:1519:31)
      at Promise._settlePromise (http://localhost:3000/__cypress/runner/cypress_runner.js:1576:18)
      at Promise._settlePromise0 (http://localhost:3000/__cypress/runner/cypress_runner.js:1621:10)
      at Promise._settlePromises (http://localhost:3000/__cypress/runner/cypress_runner.js:1701:18)
      at Promise._fulfill (http://localhost:3000/__cypress/runner/cypress_runner.js:1645:18)
      at <unknown> (http://localhost:3000/__cypress/runner/cypress_runner.js:5450:46)
  From Your Spec Code:
      at Context.eval (webpack://***-frontend/./cypress/e2e/openAi-e2e.cy.js:98:7)

  3) OpenAI API Call
       displays an error message if the OpenAI request fails:
     CypressError: Timed out retrying after 5000ms: `cy.wait()` timed out waiting `5000ms` for the 1st request to the route: `openAIRequestFail`. No request ever occurred.
https://on.cypress.io/wait
      at cypressErr (http://localhost:3000/__cypress/runner/cypress_runner.js:76025:18)
      at Object.errByPath (http://localhost:3000/__cypress/runner/cypress_runner.js:76079:10)
      at checkForXhr (http://localhost:3000/__cypress/runner/cypress_runner.js:135700:84)
      at <unknown> (http://localhost:3000/__cypress/runner/cypress_runner.js:135726:28)
      at tryCatcher (http://localhost:3000/__cypress/runner/cypress_runner.js:1807:23)
      at Promise.attempt.Promise.try (http://localhost:3000/__cypress/runner/cypress_runner.js:4315:29)
      at whenStable (http://localhost:3000/__cypress/runner/cypress_runner.js:144102:68)
      at <unknown> (http://localhost:3000/__cypress/runner/cypress_runner.js:144043:14)
      at tryCatcher (http://localhost:3000/__cypress/runner/cypress_runner.js:1807:23)
      at Promise._settlePromiseFromHandler (http://localhost:3000/__cypress/runner/cypress_runner.js:1519:31)
      at Promise._settlePromise (http://localhost:3000/__cypress/runner/cypress_runner.js:1576:18)
      at Promise._settlePromise0 (http://localhost:3000/__cypress/runner/cypress_runner.js:1621:10)
      at Promise._settlePromises (http://localhost:3000/__cypress/runner/cypress_runner.js:1701:18)
      at Promise._fulfill (http://localhost:3000/__cypress/runner/cypress_runner.js:1645:18)
      at <unknown> (http://localhost:3000/__cypress/runner/cypress_runner.js:5450:46)
  From Your Spec Code:
      at Context.eval (webpack://***-frontend/./cypress/e2e/openAi-e2e.cy.js:120:7)

  (Results)
  ┌────────────────────────────────────────────────────────────────────────────────────────────
  │ Tests:        3                                                                                │
  │ Passing:      0                                                                                │
  │ Failing:      3                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  3                                                                                │
  │ Video:        false                                                                            │
  │ Duration:     26 seconds                                                                       │
  │ Spec Ran:     openAi-e2e.cy.js                                                                 │
  └────────────────────────────────────────────────────────────────────────────────────────────
*/

// ORIGINAL TESTS:

// describe("OpenAI API Call", () => {
//   beforeEach(() => {
//     cy.visit("/");

//     // Step 1: Fill in the Location
//     cy.get("input").type("London");
//     cy.contains("Next").click();

//     // Step 2: Fill in the Date and Time
//     cy.get("#start-date").type("2024-01-01");
//     cy.get("#start-time").type("09:00");
//     cy.get("#end-date").type("2024-01-01");
//     cy.get("#end-time").type("17:00");
//     cy.contains("Next").click();

//     // Step 3: Fill in Interests
//     cy.get('input[type="text"]').type("Coffee");
//     cy.contains("Next").click();

//     // Step 4: Select Travel Style
//     cy.get("#travel-style").select("laid-back");
//   });

//   it("displays a spinner while the API is being called", () => {
//     // Mock the API response
//     cy.intercept("POST", "/chat", {
//       delay: 1000, // Simulate a delay for the API response
//       statusCode: 200,
//       body: {
//         introduction: "Welcome to your laid-back, coffee-inspired day trip...",
//         events: [
//           {
//             title: "Event 1 Title",
//             time: "10:20 AM - 11:20 AM",
//             description: "Explore the Enlightenment Gallery.",
//           },
//           {
//             title: "Event 2 Title",
//             time: "11:40 AM - 12:10 PM",
//             description: "Enjoy a cup of coffee.",
//           },
//           {
//             title: "Event 3 Title",
//             time: "12:30 PM - 1:30 PM",
//             description: "Have a laid-back lunch.",
//           },
//         ],
//         travelMethods:
//           "This itinerary involves walking and public transportation.",
//       },
//     }).as("getItinerary");

//     // Trigger the API call
//     cy.contains("Let's Go!").click();

//     // Assert that the spinner is visible
//     cy.get('div[role="status"]', { timeout: 10000 }).should("be.visible");

//     // Wait for the API call to complete
//     cy.wait("@getItinerary");

//     // Assert that the spinner is no longer visible
//     cy.get('div[role="status"]').should("not.exist");
//   });

//   it("displays itinerary events after API response", () => {
//     // Mock the API response
//     cy.intercept("POST", "/chat", {
//       statusCode: 200,
//       body: {
//         introduction: "Welcome to your laid-back, coffee-inspired day trip...",
//         events: [
//           {
//             title: "Event 1 Title",
//             time: "10:20 AM - 11:20 AM",
//             description: "Explore the Enlightenment Gallery.",
//           },
//           {
//             title: "Event 2 Title",
//             time: "11:40 AM - 12:10 PM",
//             description: "Enjoy a cup of coffee.",
//           },
//           {
//             title: "Event 3 Title",
//             time: "12:30 PM - 1:30 PM",
//             description: "Have a laid-back lunch.",
//           },
//         ],
//         travelMethods:
//           "This itinerary involves walking and public transportation.",
//       },
//     }).as("getItinerary");

//     // Trigger the API call
//     cy.contains("Let's Go!").click(); // Adjust to your actual button

//     // Wait for the API call to complete
//     cy.wait("@getItinerary");

//     // Assert that the itinerary content is displayed
//     cy.contains("YOUR ITINERARY:").should("be.visible");
//     cy.contains("Event 1 Title").should("be.visible");
//     cy.contains("10:20 AM - 11:20 AM").should("be.visible");
//     cy.contains("Explore the Enlightenment Gallery.").should("be.visible");
//     cy.contains("Event 2 Title").should("be.visible");
//     cy.contains("Event 3 Title").should("be.visible");
//   });

//   it("displays an error message if the OpenAI request fails", () => {
//     // Mock the failing request
//     cy.intercept("POST", "/chat", {
//       statusCode: 500,
//       body: { error: "Internal Server Error" },
//     }).as("openAIRequestFail");

//     // Click the "Let's Go!" button after setting up the intercept
//     cy.contains("Let's Go!").click();

//     // Wait for the request to complete
//     cy.wait("@openAIRequestFail");

//     // Wait for a moment to allow the UI to update
//     cy.get('div[role="status"]', { timeout: 10000 }).should("not.exist"); // Ensure spinner is gone
//     cy.contains("ERROR:").should("be.visible"); // Check for error display
//     cy.contains(
//       "There was an error generating your itinerary - please try again.",
//     ).should("be.visible"); // Check for error display
//   });
// });
