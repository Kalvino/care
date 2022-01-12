/**
 * environment exports env settings
 */
export const environment = {
  production: false,
  debug: true,
  host: 'http://care.cloud.local:8000',
  version: 'F.0.0.1',
  socketHost: 'http://localhost:8089',
    // socketHost: 'http://dev-broker.my-aurora.com:8012',
  whitelistedDomains: [
    'localhost:3000',
    'care.cloud.local:8000',
    'dev-broker.my-aurora.com:8012'
  ]
};
