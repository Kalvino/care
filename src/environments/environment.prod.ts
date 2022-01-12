/**
 * environment exports env settings
 */
export const environment = {
    environment: 'prod',
  /**
   * production mode. Enables code optimizations in NG compiler
   */
  production: true,
  /**
   * degbug false
   */
  debug: false,
  /**
   * API host
   */
  host: 'https://fair-api.my-aurora.com',
  /**
   * build version
   */
  version: 'F.0.0.1',
  /**
   * care broker URL
   */
  socketHost: 'https://dev-broker.my-aurora.com',
  /**
   * whitelisted domains: domains for which a JWT token
   * will be sent. At least set the API host name (see above)
   * w/o 'http(s)'
   */
  whitelistedDomains: [
    'fair-api.my-aurora.com'
  ]
};
