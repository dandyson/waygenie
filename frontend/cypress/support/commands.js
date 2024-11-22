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
      // More robust login handling
      cy.get('input[type="email"],input[name="email"],input[name="username"]', {
        timeout: 20000,
      })
        .should("be.visible")
        .type(username, { force: true });

      cy.get('input[type="password"]', { timeout: 10000 })
        .should("be.visible")
        .type(password, { force: true });

      cy.get('button[type="submit"]').click();

      // More comprehensive consent screen handling
      cy.get("body").then(($body) => {
        // Check for various possible consent button selectors
        const consentButtons = [
          'button[value="accept"]',
          "button.consent-accept",
          'button[type="submit"]',
          'button:contains("Accept")',
          'button:contains("Continue")',
        ];

        const buttonSelector = consentButtons.join(",");

        if ($body.find(buttonSelector).length > 0) {
          cy.log("Consent screen detected");
          cy.get(buttonSelector, { timeout: 10000 })
            .should("be.visible")
            .click({ force: true });
        } else {
          cy.log("No consent screen detected");
        }
      });
    },
  );

  // More robust success verification
  cy.url({ timeout: 10000 }).should("include", Cypress.config("baseUrl"));
  cy.contains("Where are you going?", { timeout: 10000 }).should("be.visible");
});
