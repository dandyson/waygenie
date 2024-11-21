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
  // Check if we already have cached auth state
  const cachedAuth = Cypress.env("auth_cache");

  if (cachedAuth) {
    // Restore all auth-related items from cache
    cy.window().then((win) => {
      Object.keys(cachedAuth).forEach((key) => {
        win.localStorage.setItem(key, cachedAuth[key]);
      });
    });
    cy.visit("/");
    return;
  }

  // Otherwise do full login
  cy.visit("/");
  cy.get('[data-cy="login-button"]').click();

  cy.origin("https://dev-5gel523jsbsvscyz.uk.auth0.com", () => {
    cy.get('input[name="email"]').type(Cypress.env("auth_username"));
    cy.get('input[name="password"]').type(Cypress.env("auth_password"));
    cy.get('button[type="submit"]').click();
  });

  cy.url().should("equal", "http://localhost:3000/");

  // Cache all auth-related localStorage items
  cy.window().then((win) => {
    const authItems = {};
    for (let i = 0; i < win.localStorage.length; i++) {
      const key = win.localStorage.key(i);
      if (key.includes("auth0") || key.includes("@@auth0spajs@@")) {
        authItems[key] = win.localStorage.getItem(key);
      }
    }
    Cypress.env("auth_cache", authItems);
  });
});
