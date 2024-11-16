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

describe("Initial Load", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays the welcome question", () => {
    cy.contains("Where are you going?").should("be.visible");
  });
});

describe("OpenAI API Call with Queue", () => {
  beforeEach(() => {
    // Set up route interceptions before visiting
    cy.intercept('POST', '/chat').as('queueSubmission');
    cy.intercept('GET', '/chat/status/*').as('statusCheck');
    
    cy.visit("/");

    // Fill out the form with more robust selectors and waiting
    cy.get('input[name="location"]').should('be.visible').type("London");
    cy.contains("button", "Next").click();

    cy.get("#start-date").should('be.visible').type("2024-01-01");
    cy.get("#start-time").should('be.visible').type("09:00");
    cy.get("#end-date").should('be.visible').type("2024-01-01");
    cy.get("#end-time").should('be.visible').type("17:00");
    cy.contains("button", "Next").click();

    cy.get('input[type="text"]').should('be.visible').type("Coffee");
    cy.contains("button", "Next").click();

    cy.get("#travel-style").should('be.visible').select("laid-back");
  });

  it("displays a spinner while job is processing", () => {
    // Mock successful queue submission
    cy.intercept('POST', '/chat', {
      statusCode: 200,
      body: { jobId: 'test-job-123' }
    }).as('queueSubmission');

    // Mock status check response - job still processing
    cy.intercept('GET', '/chat/status/test-job-123', {
      statusCode: 200,
      body: { status: 'processing' }
    }).as('statusCheck');

    // Click generate button
    cy.contains("button", "Let's Go!").should('be.visible').click();

    // Wait for queue submission
    cy.wait('@queueSubmission');

    // Check spinner appears
    cy.get('[role="status"]', { timeout: 15000 }).should('be.visible');
    cy.contains('Generating Itinerary...').should('be.visible');
  });

  it("displays itinerary after job completion", () => {
    const mockResponse = {
      introduction: "Welcome to your laid-back, coffee-inspired day trip...",
      events: [
        {
          title: "Morning Coffee at Artisan Cafe",
          time: "10:00 AM - 11:00 AM",
          description: "Start your day with specialty coffee.",
        },
        {
          title: "Lunch at Cozy Corner",
          time: "12:00 PM - 1:30 PM",
          description: "Relaxed lunch spot.",
        }
      ],
      travelMethods: "Walking and public transport recommended."
    };

    // Mock successful queue submission
    cy.intercept('POST', '/chat', {
      statusCode: 200,
      body: { jobId: 'test-job-123' }
    }).as('queueSubmission');

    // Mock status check response - job completed
    cy.intercept('GET', '/chat/status/test-job-123', {
      statusCode: 200,
      body: { 
        status: 'completed',
        result: mockResponse
      }
    }).as('statusCheck');

    // Generate itinerary
    cy.contains("button", "Let's Go!").click();
    cy.wait('@queueSubmission');
    cy.wait('@statusCheck');

    // Verify itinerary content
    cy.contains('YOUR ITINERARY:', { timeout: 15000 }).should('be.visible');
    cy.contains('Morning Coffee at Artisan Cafe').should('be.visible');
    cy.contains('Lunch at Cozy Corner').should('be.visible');
    cy.contains('Walking and public transport recommended').should('be.visible');
  });

  it("handles job processing errors gracefully", () => {
    // Mock successful queue submission but failed processing
    cy.intercept('POST', '/chat', {
      statusCode: 200,
      body: { jobId: 'test-job-123' }
    }).as('queueSubmission');

    // Mock status check response - job failed
    cy.intercept('GET', '/chat/status/test-job-123', {
      statusCode: 500,
      body: { 
        status: 'failed',
        error: "Job processing failed"
      }
    }).as('statusCheck');

    // Generate itinerary
    cy.contains("button", "Let's Go!").click();
    cy.wait('@queueSubmission');
    cy.wait('@statusCheck');

    // Verify error display
    cy.contains('ERROR:', { timeout: 10000 }).should('be.visible');
    cy.contains('There was an error generating your itinerary - please try again.')
      .should('be.visible');

    // Verify spinner is removed
    cy.get('[role="status"]').should('not.exist');
  });

  it("allows starting over after completion", () => {
    // Mock successful queue submission
    cy.intercept('POST', '/chat', {
      statusCode: 200,
      body: { jobId: 'test-job-123' }
    }).as('queueSubmission');

    // Mock status check response - job completed
    cy.intercept('GET', '/chat/status/test-job-123', {
      statusCode: 200,
      body: { 
        status: 'completed',
        result: {
          introduction: "Test itinerary",
          events: [],
          travelMethods: "Walking"
        }
      }
    }).as('statusCheck');

    // Generate and wait for completion
    cy.contains("button", "Let's Go!").click();
    cy.wait('@queueSubmission');
    cy.wait('@statusCheck');

    // Click start over
    cy.contains('button', 'Start Over').click();

    // Verify return to first step
    cy.contains("Where are you going?").should('be.visible');
  });
});