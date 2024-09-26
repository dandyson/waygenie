// Step 1: Initial question displayed
describe("Initial Load", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("displays the welcome question", () => {
    cy.contains("Where are you going?");
  });
});

// Step 2: Navigation and user input handling
describe("Navigation and Input", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it('does not navigate on clicking "Next" without input', () => {
    cy.contains("Next").click();
    cy.contains("Where are you going?");
  });

  it("navigates through the wizard steps correctly", () => {
    // Step 1: User provides destination
    cy.get("input").type("London");
    cy.contains("Next").click();
    cy.contains("When will you be visiting?");

    // Step 2: User inputs visit details
    cy.get("#start-date").type("2024-01-01");
    cy.get("#start-time").type("09:00");
    cy.get("#end-date").type("2024-01-01");
    cy.get("#end-time").type("17:00");
    cy.contains("Next").click();
    cy.contains("Your Interests");

    // Step 3: User inputs interests
    cy.get('input[type="text"]').type("Coffee");
    cy.contains("Next").click();
    cy.contains("What's your travelling style?");
    cy.get("#travel-style").should("have.value", "laid-back");
    // Change travel style
    cy.get("#travel-style").select("everything");
    cy.get("#travel-style").should("have.value", "everything");
    cy.contains("Let's Go!").click();
  });

  it("navigates through the wizard steps correctly and uses the back button", () => {
    // Step 1: User provides destination
    cy.get("input").type("London");

    // Proceed to Step 2
    cy.contains("Next").click(); // Click Next
    cy.contains("When will you be visiting?");

    // Go back to Step 1
    cy.get(".back-button").click();
    cy.contains("Where are you going?");
    cy.get("input").should("have.value", "London");

    // Back to Step 2
    cy.contains("Next").click();
    cy.contains("When will you be visiting?");
    cy.get("#start-date").type("2024-01-01");
    cy.get("#start-time").type("09:00");
    cy.get("#end-date").type("2024-01-01");
    cy.get("#end-time").type("17:00");

    // Proceed to Step 3
    cy.contains("Next").click();
    cy.contains("Your Interests");

    // Go back to Step 2
    cy.get(".back-button").click();
    cy.contains("Your Interests").should("not.exist");
    cy.contains("When will you be visiting?");
    // Verify input values are maintained
    cy.get("#start-date").should("have.value", "2024-01-01");
    cy.get("#start-time").should("have.value", "09:00");
    cy.get("#end-date").should("have.value", "2024-01-01");
    cy.get("#end-time").should("have.value", "17:00");

    // Return to Step 3
    cy.contains("Next").click();
    cy.contains("Your Interests");

    // Step 3: User provides interests
    cy.get('input[type="text"]').type("Coffee");

    // Proceed to Step 4
    cy.contains("Next").click();
    cy.contains("What's your travelling style?");

    // Go back to Step 3
    cy.get(".back-button").click();
    cy.contains("What's your travelling style?").should("not.exist");
    cy.contains("Your Interests");
    cy.get('input[type="text"]').should("have.value", "Coffee");

    // Return to Step 4
    cy.contains("Next").click();
    cy.contains("What's your travelling style?");

    // Validate travel style selection
    cy.get("#travel-style").should("have.value", "laid-back");
    cy.get("#travel-style").select("everything");
    cy.get("#travel-style").should("have.value", "everything");

    // Click "Let's Go!" to submit the form
    cy.contains("Let's Go!").click();
  });
});

// Step 3: Testing multiple interests input
describe("Interests multiple inputs testing", () => {
  beforeEach(() => {
    cy.visit("/");
    // Step 1: User provides destination
    cy.get("input").type("London");
    cy.contains("Next").click();
    cy.contains("When will you be visiting?");

    // Step 2: User inputs visit details
    cy.get("#start-date").type("2024-01-01");
    cy.get("#start-time").type("09:00");
    cy.get("#end-date").type("2024-01-01");
    cy.get("#end-time").type("17:00");
    cy.contains("Next").click();
    cy.contains("Your Interests");
  });

  it("should initially display one input field", () => {
    cy.get('input[type="text"]').should("have.length", 1);
  });

  it('should add a new input field when clicking "Add Interest"', () => {
    cy.get('input[type="text"]').should("have.length", 1);

    cy.contains("Add Interest").click();
    cy.get('input[type="text"]').should("have.length", 2);
  });

  it("should allow typing in newly added input fields", () => {
    cy.contains("Add Interest").click();
    cy.contains("Add Interest").click();

    cy.get('input[type="text"]').eq(1).type("Traveling");
    cy.get('input[type="text"]').eq(2).type("Photography");

    cy.get('input[type="text"]').eq(1).should("have.value", "Traveling");
    cy.get('input[type="text"]').eq(2).should("have.value", "Photography");
  });

  it('should remove an interest when clicking the "Remove" button', () => {
    cy.get('input[type="text"]').should("have.length", 1);
    cy.contains("Add Interest").click();
    cy.contains("Add Interest").click();

    cy.get('input[type="text"]').eq(1).type("Traveling");
    cy.get('input[type="text"]').eq(2).type("Photography");

    cy.get('input[type="text"]').eq(1).should("have.value", "Traveling");
    cy.get('input[type="text"]').eq(2).should("have.value", "Photography");

    // Click remove button on second input
    cy.get('button:contains("Remove")').eq(0).click();
    cy.get('input[type="text"]').should("have.length", 2);
    cy.get('input[type="text"]').eq(1).should("have.value", "Photography");
  });

  // TESTING OPENAI HERE

  it("should see the spinner", () => {
    // Step 3: Fill in Interests
    cy.get('input[type="text"]').type("Coffee");
    cy.contains("Next").click();

    // Step 4: Select Travel Style
    cy.get("#travel-style").select("laid-back");

    // Trigger the API call
    cy.contains("Let's Go!").click();

    // Assert that the spinner is visible
    cy.get('div[role="status"]').should("be.visible");
  });
});

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
//   });

//   it("displays a spinner while the API is being called", () => {
//     // Assert that the spinner is visible
//     cy.get('div[role="status"]', { timeout: 10000 }).should("be.visible");

//     // Wait for the API call to complete
//     cy.wait("@getItinerary");

//     // Assert that the spinner is no longer visible
//     cy.get('div[role="status"]').should("not.exist");
//   });

//   it("displays itinerary events after API response", () => {
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
// });

// describe("OpenAI API Errors", () => {
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

//     // Mock the failing request
//     cy.intercept("POST", "/chat", {
//       statusCode: 500,
//       body: { error: "Internal Server Error" },
//     }).as("openAIRequestFail");

//     // Click the "Let's Go!" button after setting up the intercept
//     cy.contains("Let's Go!").click();
//   });

//   it("displays an error message if the OpenAI request fails", () => {
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
