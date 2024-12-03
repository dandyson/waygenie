describe("Navigation and Input", () => {
  beforeEach(() => {
    cy.loginToApp();
  });

  it('does not navigate on clicking "Next" without input', () => {
    cy.contains("Next").click();
    cy.contains("Where are you going?").should("be.visible");
  });

  describe("Desktop View", () => {
    beforeEach(() => {
      cy.viewport(1024, 768);
    });

    it("navigates through the wizard steps correctly", () => {
      // Click the London label instead of the radio directly
      cy.contains("label", "London").click();
      cy.get('input[type="radio"][value="London"]').should("be.checked");
      cy.contains("Next").click();
      cy.contains("When will you be visiting?").should("be.visible");

      // Step 2: User inputs visit details
      cy.get("#start-date").should("be.visible").type("2024-01-01");
      cy.get("#start-time").should("be.visible").type("09:00");
      cy.get("#end-date").should("be.visible").type("2024-01-01");
      cy.get("#end-time").should("be.visible").type("17:00");
      cy.contains("Next").click();
      cy.contains("What are your Interests?").should("be.visible");

      // Step 3: User inputs interests
      cy.get('input[type="text"]').should("be.visible").type("Coffee");
      cy.contains("Next").click();
      cy.contains("What's your travelling style?").should("be.visible");
      cy.get("#travel-style").should("have.value", "laid-back");
      // Change travel style
      cy.get("#travel-style").select("everything");
      cy.get("#travel-style").should("have.value", "everything");
      cy.contains("Let's Go!").should("be.visible");
    });

    it("allows selecting from Other Cities dropdown", () => {
      cy.contains("label", "Other Cities").click();

      cy.get('[data-testid="desktop-dropdown"]')
        .should("be.visible")
        .select("Bristol");
      cy.contains("Next").click();
      cy.contains("When will you be visiting?").should("be.visible");
    });

    it("navigates through steps correctly and uses back button", () => {
      cy.contains("label", "London").click();
      cy.get('input[type="radio"][value="London"]').should("be.checked");

      // Proceed to Step 2
      cy.contains("Next").click();
      cy.contains("When will you be visiting?").should("be.visible");

      // Go back to Step 1
      cy.contains("Back").click();
      cy.contains("Where are you going?").should("be.visible");
      cy.get('input[type="radio"][value="London"]').should("be.checked");

      // Back to Step 2
      cy.contains("Next").click();
      cy.contains("When will you be visiting?").should("be.visible");
      cy.get("#start-date").type("2024-01-01");
      cy.get("#start-time").type("09:00");
      cy.get("#end-date").type("2024-01-01");
      cy.get("#end-time").type("17:00");
    });

    it("changing start time does not affect end time if end time is set", () => {
      cy.contains("label", "London").click();
      cy.get('input[type="radio"][value="London"]').should("be.checked");
      cy.contains("Next").click();
      cy.get("#start-date").type("2024-01-01");
      cy.get("#start-time").type("09:00");
      cy.get("#end-date").type("2024-01-01");
      cy.get("#end-time").type("17:00");
      // Change start time to 10:00
      cy.get("#start-time").clear();
      cy.get("#start-time").type("10:00");

      // Check that end time remains unchanged
      cy.get("#end-time").should("have.value", "17:00");
    });

    it("changing end time to before start time updates start time", () => {
      cy.contains("label", "London").click();
      cy.get('input[type="radio"][value="London"]').should("be.checked");
      cy.contains("Next").click();
      cy.get("#start-date").type("2024-01-01");
      cy.get("#start-time").type("12:06");
      cy.get("#end-date").type("2024-01-01");
      cy.get("#end-time").type("13:06");

      // Change end time to 11:00 (before the current start time of 12:06)
      cy.get("#end-time").clear();
      cy.get("#end-time").type("11:00");

      // Check that start time is updated to 10:00 (one hour before the new end time)
      cy.get("#start-time").should("have.value", "10:00");
    });

    it("changing end date to before start date updates start date", () => {
      cy.contains("label", "London").click();
      cy.get('input[type="radio"][value="London"]').should("be.checked");
      cy.contains("Next").click();
      cy.get("#start-date").type("2024-01-01");
      cy.get("#start-time").type("09:00");
      cy.get("#end-date").type("2024-01-01");
      cy.get("#end-time").type("17:00");

      // Change end date to 2023-12-31 (before the current start date of 2024-01-01)
      cy.get("#end-date").clear();
      cy.get("#end-date").type("2023-12-31");

      // Check that start date is updated to the same as end date
      cy.get("#start-date").should("have.value", "2023-12-31");
    });

    it("should not change end date when start date is set before end date", () => {
      cy.contains("label", "London").click();
      cy.get('input[type="radio"][value="London"]').should("be.checked");
      cy.contains("Next").click();

      cy.get("#start-date").type("2024-01-04");
      cy.get("#end-date").type("2024-01-10");

      // Change start date to a date before the end date
      cy.get("#start-date").clear();
      cy.get("#start-date").type("2024-01-03");

      // Check that end date remains unchanged
      cy.get("#end-date").should("have.value", "2024-01-10");
    });

    it("should change end date when start date is set after end date", () => {
      cy.contains("label", "London").click();
      cy.get('input[type="radio"][value="London"]').should("be.checked");
      cy.contains("Next").click();

      cy.get("#start-date").type("2024-01-04");
      cy.get("#end-date").type("2024-01-10");

      // Change start date to a date after the end date
      cy.get("#start-date").clear();
      cy.get("#start-date").type("2024-01-11");

      // Check that end date is updated to the same as start date
      cy.get("#end-date").should("have.value", "2024-01-11");
    });
  });

  describe("Mobile View", () => {
    describe("Small Mobile (iPhone SE)", () => {
      beforeEach(() => {
        cy.viewport(320, 568); // iPhone SE dimensions
      });

      it("shows only dropdown for location selection", () => {
        // Verify radio buttons are hidden
        cy.get('input[type="radio"]').should("not.be.visible");

        // Verify dropdown is visible
        cy.get('[data-testid="mobile-dropdown"]').should("be.visible");
      });

      it("navigates through the wizard steps using mobile dropdown", () => {
        cy.get('[data-testid="mobile-dropdown"]')
          .should("be.visible")
          .select("London");
        cy.contains("Next").click();
        cy.contains("When will you be visiting?").should("be.visible");
      });
    });

    describe("Large Mobile", () => {
      beforeEach(() => {
        cy.viewport(375, 667); // Larger mobile viewport
      });

      it("still shows only dropdown for location selection", () => {
        cy.get('input[type="radio"]').should("not.be.visible");
        cy.get('[data-testid="mobile-dropdown"]').should("be.visible");
      });

      it("navigates through the wizard steps using mobile dropdown", () => {
        // Step 1: Select destination from mobile dropdown
        cy.get('[data-testid="mobile-dropdown"]')
          .should("be.visible")
          .select("London");
        cy.contains("Next").click();
        cy.contains("When will you be visiting?").should("be.visible");

        // Rest of form steps remain the same
        cy.get("#start-date").should("be.visible").type("2024-01-01");
        // [Rest of the test remains the same]
      });
    });
  });
});

// Step 3: Testing multiple interests input
describe("Interests multiple inputs testing", () => {
  beforeEach(() => {
    cy.loginToApp();
    cy.viewport(1024, 768);

    // Select London using the label
    cy.contains("label", "London").click();
    cy.get('input[type="radio"][value="London"]').should("be.checked");

    cy.contains("Next").click();
    cy.get("#start-date").should("be.visible").type("2024-01-01");
    cy.get("#start-time").should("be.visible").type("09:00");
    cy.get("#end-date").should("be.visible").type("2024-01-01");
    cy.get("#end-time").should("be.visible").type("17:00");
    cy.contains("Next").click();
    cy.contains("What are your Interests?").should("be.visible");
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
});
