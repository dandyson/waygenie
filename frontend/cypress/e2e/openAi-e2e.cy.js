describe('OpenAI API Call', () => {
    beforeEach(() => {
      cy.visit('/');
  
      // Step 1: Fill in the Location
      cy.get('input').type('London');
      cy.contains('Next').click();
  
      // Step 2: Fill in the Date and Time
      cy.get('#start-date').type('2024-01-01');
      cy.get('#start-time').type('09:00');
      cy.get('#end-date').type('2024-01-01');
      cy.get('#end-time').type('17:00');
      cy.contains('Next').click();
  
      // Step 3: Fill in Interests
      cy.get('input[type="text"]').type('Coffee');
      cy.contains('Next').click();
  
      // Step 4: Select Travel Style
      cy.get('#travel-style').select('laid-back');
    });
  
    it('displays a spinner while the API is being called', () => {
      // Mock the API response
      cy.intercept('POST', '/chat', {
        delay: 1000, // Simulate a delay for the API response
        statusCode: 200,
        body: {
          introduction: "Welcome to your laid-back, coffee-inspired day trip...",
          events: [
            { title: "Event 1 Title", time: "10:20 AM - 11:20 AM", description: "Explore the Enlightenment Gallery." },
            { title: "Event 2 Title", time: "11:40 AM - 12:10 PM", description: "Enjoy a cup of coffee." },
            { title: "Event 3 Title", time: "12:30 PM - 1:30 PM", description: "Have a laid-back lunch." },
          ],
          travelMethods: "This itinerary involves walking and public transportation.",
        },
      }).as('getItinerary');
  
      // Trigger the API call
      cy.contains("Let's Go!").click();
  
      // Assert that the spinner is visible
      cy.get('div[role="status"]').should('be.visible');
  
      // Wait for the API call to complete
      cy.wait('@getItinerary');
  
      // Assert that the spinner is no longer visible
      cy.get('div[role="status"]').should('not.exist');
    });
  
    it('displays itinerary events after API response', () => {
      // Mock the API response
      cy.intercept('POST', '/chat', {
        statusCode: 200,
        body: {
          introduction: "Welcome to your laid-back, coffee-inspired day trip...",
          events: [
            { title: "Event 1 Title", time: "10:20 AM - 11:20 AM", description: "Explore the Enlightenment Gallery." },
            { title: "Event 2 Title", time: "11:40 AM - 12:10 PM", description: "Enjoy a cup of coffee." },
            { title: "Event 3 Title", time: "12:30 PM - 1:30 PM", description: "Have a laid-back lunch." },
          ],
          travelMethods: "This itinerary involves walking and public transportation.",
        },
      }).as('getItinerary');
  
      // Trigger the API call
      cy.contains("Let's Go!").click(); // Adjust to your actual button
  
      // Wait for the API call to complete
      cy.wait('@getItinerary');
  
      // Assert that the itinerary content is displayed
      cy.contains('YOUR ITINERARY:').should('be.visible');
      cy.contains('Event 1 Title').should('be.visible');
      cy.contains('10:20 AM - 11:20 AM').should('be.visible');
      cy.contains('Explore the Enlightenment Gallery.').should('be.visible');
      cy.contains('Event 2 Title').should('be.visible');
      cy.contains('Event 3 Title').should('be.visible');
    });
  
    it('displays an error message if the OpenAI request fails', () => {
      // Mock the failing request
      cy.intercept('POST', '/chat', {
        statusCode: 500,
        body: { error: 'Internal Server Error' },
      }).as('openAIRequestFail');
  
      // Click the "Let's Go!" button after setting up the intercept
      cy.contains("Let's Go!").click();
  
      // Wait for the request to complete
      cy.wait('@openAIRequestFail');
  
      // Wait for a moment to allow the UI to update
      cy.get('div[role="status"]', { timeout: 10000 }).should('not.exist'); // Ensure spinner is gone
      cy.contains('ERROR:').should('be.visible'); // Check for error display
      cy.contains('There was an error generating your itinerary - please try again.').should('be.visible'); // Check for error display
    });    
  });
  