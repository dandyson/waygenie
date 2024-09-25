describe('Initial Load', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('displays the welcome question', () => {
    cy.contains('Where are you going?'); // Asserts that the initial question is displayed
  });
});

describe('Navigation and Input', () => {
  beforeEach(() => {
      cy.visit('/');
  });
  it('does not navigate on clicking "Next" without input', () => {
    cy.contains('Next').click();
    cy.contains('Where are you going?'); // Verifies that it stays on the same step
  });

  it('navigates through the wizard steps correctly', () => {
    // Step 1
    cy.get('input').type('London'); 
    cy.contains('Next').click(); 
    cy.contains('When will you be visiting?'); 

    // Step 2
    cy.get('#start-date').type('2024-01-01');
    cy.get('#start-time').type('09:00'); 
    cy.get('#end-date').type('2024-01-01');
    cy.get('#end-time').type('17:00'); 
    cy.contains('Next').click(); 
    cy.contains('Your Interests'); 

    // Step 3
    cy.get('input[type="text"]').type('Coffee'); 
    cy.contains('Next').click(); 
    cy.contains("What's your travelling style?");
    cy.get('#travel-style').should('have.value', 'laid-back');
    // Change value
    cy.get('#travel-style').select('everything');
    cy.get('#travel-style').should('have.value', 'everything');
    cy.contains("Let's Go!").click();
  });
});

describe('Interests multiple inputs testing', () => {
  beforeEach(() => {
    cy.visit('/');
    // Step 1
    cy.get('input').type('London'); 
    cy.contains('Next').click(); 
    cy.contains('When will you be visiting?'); 

    // Step 2
    cy.get('#start-date').type('2024-01-01');
    cy.get('#start-time').type('09:00'); 
    cy.get('#end-date').type('2024-01-01');
    cy.get('#end-time').type('17:00'); 
    cy.contains('Next').click(); 
    cy.contains('Your Interests'); 
  });

  it('should initially display one input field', () => {
    cy.get('input[type="text"]').should('have.length', 1); // Check for one input field
  });

  it('should add a new input field when clicking "Add Interest"', () => {
    cy.get('input[type="text"]').should('have.length', 1); // Verify initial input

    cy.contains('Add Interest').click(); // Click to add a new interest

    cy.get('input[type="text"]').should('have.length', 2); // Verify two inputs now
  });

  it('should allow typing in newly added input fields', () => {
    cy.contains('Add Interest').click(); // Add first interest
    cy.contains('Add Interest').click(); // Add second interest

    cy.get('input[type="text"]').eq(1).type('Traveling'); // Type into the second input
    cy.get('input[type="text"]').eq(2).type('Photography'); // Type into the third input

    cy.get('input[type="text"]').eq(1).should('have.value', 'Traveling'); // Verify the input value
    cy.get('input[type="text"]').eq(2).should('have.value', 'Photography'); // Verify the input value
  });

  it('should remove an interest when clicking the "Remove" button', () => {
    cy.get('input[type="text"]').should('have.length', 1); // Check for one input field
    cy.contains('Add Interest').click(); // Add second interest
    cy.contains('Add Interest').click(); // Add third interest

    cy.get('input[type="text"]').eq(1).type('Traveling'); // Type into the second input
    cy.get('input[type="text"]').eq(2).type('Photography'); // Type into the third input

    cy.get('input[type="text"]').eq(1).should('have.value', 'Traveling'); // Verify the input value
    cy.get('input[type="text"]').eq(2).should('have.value', 'Photography'); // Verify the input value

    cy.get('input[type="text"]').should('have.length', 3); // Ensure there are 3 inputs

    cy.get('button:contains("Remove")').should('have.length', 2); // Verify there are two remove buttons
    cy.get('button:contains("Remove")').eq(0).click(); // Click the second "Remove" button

    // After clicking the remove button, verify that the Traveling input has been removed
    cy.get('input[type="text"]').should('have.length', 2); // Ensure there are now only 2 inputs
    cy.get('input[type="text"]').eq(1).should('have.value', 'Photography'); // Verify the remaining inputs are correct
    cy.get('input[type="text"]').should('not.have.value', 'Traveling'); // Ensure 'Traveling' no longer exists
  });

  it('should not allow removal of the last input field', () => {
    cy.get('button').contains('Remove').should('not.exist'); // Ensure the remove button does not exist for the only input
  });
});