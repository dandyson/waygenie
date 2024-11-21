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
  cy.log("Starting login process");

  cy.session("auth0", () => {
    cy.log("Initiating auth0 session");
    cy.visit("/");
    const auth0Domain = Cypress.env("AUTH0_DOMAIN");
    if (!auth0Domain) {
      throw new Error("AUTH0_DOMAIN environment variable is not set");
    }

    cy.origin(auth0Domain, { args: {} }, () => {
      cy.log("Inside auth0 domain");
      cy.get('input[type="email"]').type(Cypress.env("AUTH_USERNAME"));
      cy.get('input[type="password"]').type(Cypress.env("AUTH_PASSWORD"));
      cy.get('button[type="submit"]').click();
    });
    cy.url().should("include", "/");
  });
});
