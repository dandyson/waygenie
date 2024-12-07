describe("Cookie Notice", () => {
  beforeEach(() => {
    cy.loginToApp();
  });

  it("displays the cookie notice with correct text", () => {
    cy.contains("This site uses essential cookies for authentication").should(
      "be.visible",
    );
    cy.contains("By using this app, you agree to our use of cookies").should(
      "be.visible",
    );
  });

  it("has a working privacy policy link", () => {
    cy.contains("Learn more").click();
    cy.url().should("include", "/privacy");

    // Verify privacy policy content is loaded
    cy.contains("Privacy Policy").should("be.visible");
    cy.contains("WayGenie is a demo portfolio application").should(
      "be.visible",
    );

    // Test navigation back
    cy.contains("Back to Home").click();
    cy.url().should("not.include", "/privacy");
  });

  it("cookie notice remains visible after page navigation", () => {
    // Check initial visibility
    cy.get(".text-sm.text-white").should("be.visible");

    // Navigate through the app
    cy.contains("Next").click();

    // Verify notice is still visible
    cy.get(".text-sm.text-white").should("be.visible");
  });
});
