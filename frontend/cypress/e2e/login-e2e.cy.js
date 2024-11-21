describe("login", () => {
  beforeEach(() => {
    // Clear any existing auth state
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it("should successfully log into our app", () => {
    // Start from the home page
    cy.visit("http://localhost:3000");

    // Click your login button or trigger auth flow
    // Replace with your actual login trigger selector
    cy.get('[data-cy="login-button"]').click();

    // Now handle Auth0 login on their domain
    cy.origin("https://dev-5gel523jsbsvscyz.uk.auth0.com", () => {
      cy.get('input[name="email"]').type(Cypress.env("auth_username"));
      cy.get('input[name="password"]').type(Cypress.env("auth_password"));
      cy.get('button[type="submit"]').click();
    });

    // Back on your app domain, verify login success
    cy.url().should("equal", "http://localhost:3000/");
    // Add more assertions for logged-in state
    cy.contains("Where are you going?");
  });
});
