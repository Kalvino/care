/**
 * environment exports env settings
 */
export const environment = {
  production: false,
  debug: true,
  host: 'http://care.cloud.local',
  version: 'F.0.0.1',
  socketHost: 'http://localhost:8089',
  whitelistedDomains: [
    'localhost:3000',
    'care.cloud.local'
  ]
};
