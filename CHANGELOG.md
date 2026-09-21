<div align="center">
    <img src="frontend/public/waygenie-logo.png" alt="HomeMovieHub Logo" width="100">
</div>

# WayGenie Changelog

## September 2026
- 🏗️ Migrated the frontend from Create React App to Vite (dev server still runs on port 3000)
- 🧪 Migrated unit tests from Jest to Vitest
- 🔧 Renamed frontend env vars from `REACT_APP_*` to `VITE_*` (read via `import.meta.env`)
- 📝 Added `.env.example` files for the frontend and backend
- 📝 Updated README setup and testing instructions (Node 20.19+ or 22.12+ now required)

## May 2026
- 🏗️ Removed CloudFront as app is moving to Railway/Cloudflare pages

## December 2024
- 📝 Added third-party service privacy documentation links
- 📝 Slight fix to links for better UX
- 🔒 Added Privacy Policy and Cookie Notice components
- 🎨 Fixed nav bg colour issue
- 🎨 Changed layout of navbar & implemented resetstep
- ✨ Added SVG icons for better visual feedback
- 🕐 Amended dates/time handling and validation
- 🔧 Enhanced JSON parsing for OpenAI responses
- 💄 Improved font sizes and spacing for better readability

## November 2024
- 🏗️ Added CloudFront integration for HTTPS support
- 🔄 Implemented job queue system with Redis for OpenAI API calls
- 🔐 Integrated Auth0 authentication with protected routes
- 🧪 Enhanced test suite with Auth0 and Cypress improvements
- ♿ Improved form accessibility and ARIA labels
- 📚 Improved development practices (atomic commits, error logging)
- 🚀 Optimized CI/CD pipeline and added test artifacts
- 🔧 Enhanced API response handling and error management

## September 2024
- 👷 Set up CI/CD pipeline
- 🧪 Added Cypress E2E testing
- ✅ Improved test coverage and reporting
- 🤖 Implemented OpenAI integration
- 🚨 Added ESLint and Prettier
- 📝 Added README with setup instructions
- 🚀 Set up Heroku and AWS S3 deployment
- 💄 Added styling and UI components
- 🎨 Implemented Tailwind CSS
- 🎉 Initial commit with tests
