// Step 1: Initial question displayed
describe('Initial Load', () => {
  beforeEach(() => {
    cy.visit('/'); 
  });

  it('displays the welcome question', () => {
    cy.contains('Where are you going?');
  });
});

// Step 2: Navigation and user input handling
describe('Navigation and Input', () => {
  beforeEach(() => {
    cy.visit('/'); 
  });

  it('does not navigate on clicking "Next" without input', () => {
    cy.contains('Next').click(); 
    cy.contains('Where are you going?'); 
  });

  it('navigates through the wizard steps correctly', () => {
    // Step 1: User provides destination
    cy.get('input').type('London'); 
    cy.contains('Next').click(); 
    cy.contains('When will you be visiting?'); d

    // Step 2: User inputs visit details
    cy.get('#start-date').type('2024-01-01'); 
    cy.get('#start-time').type('09:00'); 
    cy.get('#end-date').type('2024-01-01'); e
    cy.get('#end-time').type('17:00'); 
    cy.contains('Next').click(); 
    cy.contains('Your Interests'); 

    // Step 3: User inputs interests
    cy.get('input[type="text"]').type('Coffee');
    cy.contains('Next').click(); 
    cy.contains("What's your travelling style?"); 
    cy.get('#travel-style').should('have.value', 'laid-back'); 
    // Change travel style
    cy.get('#travel-style').select('everything'); 
    cy.get('#travel-style').should('have.value', 'everything'); 
    cy.contains("Let's Go!").click(); 
  });

  it('navigates through the wizard steps correctly and uses the back button', () => {
    // Step 1: User provides destination
    cy.get('input').type('London'); 

    // Proceed to Step 2
    cy.contains('Next').click(); // Click Next
    cy.contains('When will you be visiting?'); 

    // Go back to Step 1
    cy.get('.back-button').click(); 
    cy.contains('Where are you going?'); 
    cy.get('input').should('have.value', 'London'); 

    // Back to Step 2
    cy.contains('Next').click(); 
    cy.contains('When will you be visiting?'); 
    cy.get('#start-date').type('2024-01-01'); 
    cy.get('#start-time').type('09:00'); 
    cy.get('#end-date').type('2024-01-01'); 
    cy.get('#end-time').type('17:00'); 

    // Proceed to Step 3
    cy.contains('Next').click(); 
    cy.contains('Your Interests'); 

    // Go back to Step 2
    cy.get('.back-button').click(); 
    cy.contains('Your Interests').should('not.exist');
    cy.contains('When will you be visiting?');
    // Verify input values are maintained
    cy.get('#start-date').should('have.value', '2024-01-01');
    cy.get('#start-time').should('have.value', '09:00');
    cy.get('#end-date').should('have.value', '2024-01-01');
    cy.get('#end-time').should('have.value', '17:00');

    // Return to Step 3
    cy.contains('Next').click(); 
    cy.contains('Your Interests'); 

    // Step 3: User provides interests
    cy.get('input[type="text"]').type('Coffee');

    // Proceed to Step 4
    cy.contains('Next').click();
    cy.contains("What's your travelling style?");

    // Go back to Step 3
    cy.get('.back-button').click(); 
    cy.contains("What's your travelling style?").should('not.exist');
    cy.contains('Your Interests');
    cy.get('input[type="text"]').should('have.value', 'Coffee');

    // Return to Step 4
    cy.contains('Next').click(); 
    cy.contains("What's your travelling style?"); n

    // Validate travel style selection
    cy.get('#travel-style').should('have.value', 'laid-back'); 
    cy.get('#travel-style').select('everything'); 
    cy.get('#travel-style').should('have.value', 'everything'); 

    // Click "Let's Go!" to submit the form
    cy.contains("Let's Go!").click(); 
  });
});

// Step 3: Testing multiple interests input
describe('Interests multiple inputs testing', () => {
  beforeEach(() => {
    cy.visit('/'); 
    // Step 1: User provides destination
    cy.get('input').type('London'); 
    cy.contains('Next').click();
    cy.contains('When will you be visiting?');

    // Step 2: User inputs visit details
    cy.get('#start-date').type('2024-01-01');
    cy.get('#start-time').type('09:00');
    cy.get('#end-date').type('2024-01-01');
    cy.get('#end-time').type('17:00');
    cy.contains('Next').click();
    cy.contains('Your Interests');
  });

  it('should initially display one input field', () => {
    cy.get('input[type="text"]').should('have.length', 1); 
  });

  it('should add a new input field when clicking "Add Interest"', () => {
    cy.get('input[type="text"]').should('have.length', 1);

    cy.contains('Add Interest').click();
    cy.get('input[type="text"]').should('have.length', 2);
  });

  it('should allow typing in newly added input fields', () => {
    cy.contains('Add Interest').click();
    cy.contains('Add Interest').click();

    cy.get('input[type="text"]').eq(1).type('Traveling');
    cy.get('input[type="text"]').eq(2).type('Photography');

    cy.get('input[type="text"]').eq(1).should('have.value', 'Traveling');
    cy.get('input[type="text"]').eq(2).should('have.value', 'Photography'); 
  });

  it('should remove an interest when clicking the "Remove" button', () => {
    cy.get('input[type="text"]').should('have.length', 1); 
    cy.contains('Add Interest').click();
    cy.contains('Add Interest').click();

    cy.get('input[type="text"]').eq(1).type('Traveling');
    cy.get('input[type="text"]').eq(2).type('Photography'); 

    cy.get('input[type="text"]').eq(1).should('have.value', 'Traveling');
    cy.get('input[type="text"]').eq(2).should('have.value', 'Photography');

    // Click remove button on second input
    cy.get('.remove-button').eq(1).click();
    cy.get('input[type="text"]').should('have.length', 2);
    cy.get('input[type="text"]').eq(1).should('have.value', 'Photography');
  });
});
