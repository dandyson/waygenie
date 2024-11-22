// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// AUTH0
Cypress.Commands.add("login", (overrides = {}) => {
  Cypress.log({
    name: "loginViaAuth0",
  });

  const options = {
    method: "POST",
    url: Cypress.env("auth_url"),
    body: {
      grant_type: "password",
      username: Cypress.env("auth_username"),
      password: Cypress.env("auth_password"),
      audience: Cypress.env("auth_audience"),
      scope: "openid profile email",
      client_id: Cypress.env("auth_client_id"),
      client_secret: Cypress.env("auth_client_secret"),
    },
  };
  cy.request(options);
});

// This command logs into the app so the tests can run what they need to
Cypress.Commands.add("loginToApp", () => {
  cy.clearLocalStorage();
  cy.clearCookies();

  cy.visit("/");
  cy.get('[data-cy="login-button"]').click();

  cy.origin(
    Cypress.env("auth_url"),
    {
      args: {
        username: Cypress.env("auth_username"),
        password: Cypress.env("auth_password"),
      },
    },
    ({ username, password }) => {
      // Handle login
      cy.get('input[type="email"],input[name="email"]', { timeout: 20000 })
        .should("be.visible")
        .type(username, { force: true });

      cy.get('input[type="password"]', { timeout: 10000 })
        .should("be.visible")
        .type(password, { force: true });

      cy.get('button[type="submit"]').click();

      // Handle consent screen and wait for redirect
      cy.url().should("include", "/consent");
      cy.get('button:contains("Accept")', { timeout: 10000 })
        .should("be.visible")
        .click();

      // Wait for redirect to start
      cy.url().should("not.include", "/consent");
    },
  );

  // Wait longer for the redirect back to our app
  cy.url({ timeout: 30000 }).should("eq", `${Cypress.config("baseUrl")}/`);

  // Add retry logic if needed
  cy.get("body").then(($body) => {
    if ($body.find('[data-cy="login-button"]').length > 0) {
      cy.log("Still on login page, retrying login...");
      cy.get('[data-cy="login-button"]').click();
    }
  });

  // Final verification
  cy.contains("Where are you going?", { timeout: 10000 }).should("be.visible");
});
