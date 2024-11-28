# WayGenie Changelog 📝

## November 2024

### Infrastructure & DevOps 🏗️
- ✨ Added CloudFront integration for HTTPS support
- 🔨 Experimented with Docker containerization (later removed due to complexity over frontend and backend being hosted in different places, but knowledge retained)
- 🚀 Implemented CI/CD improvements - debugging variables & general knowledge of what order to put steps in for the workflow to run correctly
- 🧪 Added Cypress test artifacts for failed test debugging - the screenshots and videos are helpful for debugging
- Improved commit discipline with atomic commits
- Learned and implemented commit squashing

### Backend Improvements 🔧
- 🔄 Implemented job queue system for OpenAI API calls
  - Added Redis for job queue management
  - Improved response handling for long-running AI operations
  - Separated API request handling from AI processing
  - Added job status tracking and error handling

### Testing 🧪
- Enhanced test suite
  - Added Auth0 authentication testing
  - Implemented proper mocking for authenticated routes
  - Updated Cypress tests to handle authentication flows
  - Fixed radio button interaction tests for better accessibility

### Authentication 🔒
- Integrated Auth0
  - Added user authentication flow
  - Implemented protected routes
  - Added authentication state management
  - Updated tests to handle authenticated states

### UI/UX Improvements 🎨
- Enhanced form accessibility
  - Improved radio button handling
  - Added proper ARIA labels to improve accessibility (more work to be done here soon)

### Developer Experience 👩‍💻
- Improved development practices
  - Implemented atomic commits
  - Added better error logging
  - Enhanced test coverage
  - Improved code documentation

---
*Last updated: November 2024*