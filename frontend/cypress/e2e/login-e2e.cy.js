describe("login", () => {
  beforeEach(() => {
    // Add debugging logs
    cy.log("Starting test with URL:", Cypress.config("baseUrl"));

    // Clear state
    cy.clearLocalStorage();
    cy.clearCookies();

    // Visit with error logging
    cy.visit("/", {
      onBeforeLoad(win) {
        cy.spy(win.console, "error").as("consoleError");
        cy.spy(win.console, "warn").as("consoleWarn");
      },
      failOnStatusCode: false,
    });
  });

  it("should successfully log into our app", () => {
    // Log any console errors
    cy.get("@consoleError").then((errorLogs) => {
      if (errorLogs.callCount > 0) {
        cy.log("Console errors:", errorLogs.args);
      }
    });

    // Start from the home page
    cy.visit("http://localhost:3000");

    // Click your login button or trigger auth flow
    // Replace with your actual login trigger selector
    cy.get('[data-cy="login-button"]').click();

    // Now handle Auth0 login on their domain
    cy.origin(
      "https://dev-5gel523jsbsvscyz.uk.auth0.com",
      {
        args: {
          username: Cypress.env("auth_username"),
          password: Cypress.env("auth_password"),
        },
      },
      ({ username, password }) => {
        // Handle login
        cy.get('input[name="email"]').type(username, { force: true });
        cy.get('input[name="password"]').type(password, { force: true });
        cy.get('button[type="submit"]').click();

        // Handle consent screen
        cy.get("body").then(($body) => {
          if (
            $body.find('button.consent-accept, button[value="accept"]').length >
            0
          ) {
            cy.log("Consent screen detected, accepting...");
            cy.get('button.consent-accept, button[value="accept"]').click();
          } else {
            cy.log("No consent screen detected, continuing...");
          }
        });
      },
    );

    // Back on your app domain, verify login success
    cy.url().should("equal", "http://localhost:3000/");
    // Add more assertions for logged-in state
    cy.contains("Where are you going?");
  });
});
