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
    cy.intercept("POST", "/chat").as("queueSubmission");
    cy.intercept("GET", "/chat/status/*").as("statusCheck");

    cy.visit("/");

    // Fill out the form with more robust selectors and waiting
    cy.get('input[name="location"]').should("be.visible").type("London");
    cy.contains("button", "Next").click();

    cy.get("#start-date").should("be.visible").type("2024-01-01");
    cy.get("#start-time").should("be.visible").type("09:00");
    cy.get("#end-date").should("be.visible").type("2024-01-01");
    cy.get("#end-time").should("be.visible").type("17:00");
    cy.contains("button", "Next").click();

    cy.get('input[type="text"]').should("be.visible").type("Coffee");
    cy.contains("button", "Next").click();

    cy.get("#travel-style").should("be.visible").select("laid-back");
  });

  it("displays a spinner while job is processing", () => {
    // Mock successful queue submission
    cy.intercept("POST", "/chat", {
      statusCode: 200,
      body: { jobId: "test-job-123" },
    }).as("queueSubmission");

    // Mock status check response - job still processing
    cy.intercept("GET", "/chat/status/test-job-123", {
      statusCode: 200,
      body: { status: "processing" },
    }).as("statusCheck");

    // Click generate button
    cy.contains("button", "Let's Go!").should("be.visible").click();

    // Wait for queue submission
    cy.wait("@queueSubmission");

    // Check spinner appears
    cy.get('[role="status"]', { timeout: 15000 }).should("be.visible");
    cy.contains("Generating Itinerary...").should("be.visible");
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
        },
      ],
      travelMethods: "Walking and public transport recommended.",
    };

    // Mock successful queue submission
    cy.intercept("POST", "/chat", {
      statusCode: 200,
      body: { jobId: "test-job-123" },
    }).as("queueSubmission");

    // Mock status check response - job completed
    cy.intercept("GET", "/chat/status/test-job-123", {
      statusCode: 200,
      body: {
        status: "completed",
        result: mockResponse,
      },
    }).as("statusCheck");

    // Generate itinerary
    cy.contains("button", "Let's Go!").click();
    cy.wait("@queueSubmission");
    cy.wait("@statusCheck");

    // Verify itinerary content
    cy.contains("YOUR ITINERARY:", { timeout: 15000 }).should("be.visible");
    cy.contains("Morning Coffee at Artisan Cafe").should("be.visible");
    cy.contains("Lunch at Cozy Corner").should("be.visible");
    cy.contains("Walking and public transport recommended").should(
      "be.visible",
    );
  });

  it("handles job processing errors gracefully", () => {
    // Mock successful queue submission but failed processing
    cy.intercept("POST", "/chat", {
      statusCode: 200,
      body: { jobId: "test-job-123" },
    }).as("queueSubmission");

    // Mock status check response - job failed
    cy.intercept("GET", "/chat/status/test-job-123", {
      statusCode: 500,
      body: {
        status: "failed",
        error: "Job processing failed",
      },
    }).as("statusCheck");

    // Generate itinerary
    cy.contains("button", "Let's Go!").click();
    cy.wait("@queueSubmission");
    cy.wait("@statusCheck");

    // Verify error display
    cy.contains("ERROR:", { timeout: 10000 }).should("be.visible");
    cy.contains(
      "There was an error generating your itinerary - please try again.",
    ).should("be.visible");

    // Verify spinner is removed
    cy.get('[role="status"]').should("not.exist");
  });

  it("allows starting over after completion", () => {
    // Mock successful queue submission
    cy.intercept("POST", "/chat", {
      statusCode: 200,
      body: { jobId: "test-job-123" },
    }).as("queueSubmission");

    // Mock status check response - job completed
    cy.intercept("GET", "/chat/status/test-job-123", {
      statusCode: 200,
      body: {
        status: "completed",
        result: {
          introduction: "Test itinerary",
          events: [],
          travelMethods: "Walking",
        },
      },
    }).as("statusCheck");

    // Generate and wait for completion
    cy.contains("button", "Let's Go!").click();
    cy.wait("@queueSubmission");
    cy.wait("@statusCheck");

    // Click start over
    cy.contains("button", "Start Over").click();

    // Verify return to first step
    cy.contains("Where are you going?").should("be.visible");
  });
});
