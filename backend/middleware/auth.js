const { auth } = require('express-oauth2-jwt-bearer');

const checkJwt = auth({
  audience: 'https://waygenie-api',
  issuerBaseURL: 'https://dev-5gel523jsbsvscyz.uk.auth0.com/',
  tokenSigningAlg: 'RS256'
});

module.exports = checkJwt; 