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
      // Step 1: User selects destination via radio
      cy.get('input[type="radio"][value="London"]')
        .should("be.visible")
        .click();
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
      cy.get('input[type="radio"]').parent().contains("Other Cities").click();

      cy.get('[data-testid="desktop-dropdown"]')
        .should("be.visible")
        .select("Bristol");
      cy.contains("Next").click();
      cy.contains("When will you be visiting?").should("be.visible");
    });

    it("navigates through steps correctly and uses back button", () => {
      // Step 1: Select destination
      cy.get('input[type="radio"][value="London"]').click();

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
    // Navigate to interests page using desktop view
    cy.viewport(1024, 768);
    cy.get('input[type="radio"][value="London"]').click();
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
