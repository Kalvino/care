// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
/**
 * environment exports env settings
 */
export const environment = {
    environment: 'default',
  /**
   * production mode. Enables code optimizations in NG compiler
   */
  production: false,
  /**
   * degbug false
   */
  debug: true,
  /**
   * API host
   */
  host: 'http://localhost:3000',
  /**
   * build version
   */
  version: 'F.0.0.1',
  /**
   * care broker URL
   */
  socketHost: 'http://localhost:8089',
  // socketHost: 'https://dev-broker.my-aurora.com',
  /**
   * whitelisted domains: domains for which a JWT token
   * will be sent. At least set the API host name (see above)
   * w/o 'http(s)'
   */
  whitelistedDomains: [
    'dev-api.my-aurora.com',
    'localhost:8100',
    'fair-api.my-aurora.com'
  ]
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
