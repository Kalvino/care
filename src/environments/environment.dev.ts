/**
 * environment exports env settings
 */
export const environment = {
    environment: 'dev',
    production: false,
    debug: true,
    host: 'https://dev-api.my-aurora.com',
    version: 'F.0.0.1',
    socketHost: 'https://dev-broker.my-aurora.com',
    // socketHost: 'http://dev-broker.my-aurora.com:8012',
    whitelistedDomains: [
        'dev-api.my-aurora.com'
    ]
};
