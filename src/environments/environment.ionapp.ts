/**
 * environment exports env settings
 */
export const environment = {
  production: false,
  debug: true,
  host: 'http://192.168.178.56',
  version: 'F.0.0.1',
  socketHost: 'http://localhost:8080',
  whitelistedDomains: [
    'localhost:3000',
    'api.carecloud.local',
    'localhost:8100',
    '192.168.178.56',
    'localhost'
  ]
};
