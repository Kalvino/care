#care App
This doc describes how to setup your dev-environment and how to build the app.

##Gitlab Link
[https://gitlab.my-aurora.com/care_group/care_app.git](https://gitlab.my-aurora.com/care_group/care_app.git)

## GIT branches

- master: represenst live
- develop: represents stage

## DevOps Checklist

This app depends on two more services to be up and running:

- care Cloud
- care Broker

### Dependencies

- Node X (LTS version will do)
- npm allways use latest
- Build tools and SDKs for iOS and Android (out of the scope of this doc)
- depending on the build process you might need the cordova package installed via npm

- Application connects to care-Clod (PHP API)
- Application connects to care-Broker (Node.js Server with Socket.io/Websocket)
- Unit tests started on the console with `$ npm run test`
- e2e tests started on console with `$ npm run e2e`
  See testing section for more information

- No Database required
- No mail sending required
- No files to persist
- No cron jobs
- No HTTPS (runs in a WebView element on a mobile)
- No logfiles necessary
- No API tests
- No Jenkins scripts needed

### Configurations / Files

During the build of the app an envronment-file from `src/environments/` will be injected.
It depends on the build target which file will be used.
For building in production mode (--prod is appended on the command line) the file `src/environmenst/environment.prod.ts`
is used. Make sure to fill in all necessary parameter like hostnames, URLs, etc... to ensure the app will
run in the desired environment.

NOTE:
_There will be no (!) shared config file for all apps (Broker, API, Management, etc...) to sharing common configurations_

##Dev-Environment

###Pre-Requisites

- git
- nodejs & npm
- ionic-cli
- cordova installed globally
- [optional] angular-cli installed globally

Fist update your npm-package: `$ npm i -g npm`

- install ionic: `$ npm i -g ionic`
- install cordova: `$ npm i -g cordova`

Checkout the code from AM-Gitlab. You will get the URL and the credentials, from the PO or
the CTO.

`$ git clone [GITLAB URL]`

This will create a new folder `care_app`

cd into the folder and checkout the develop-branch

`$ cd care_app`

`$ git checkout develop` (or use your IDE to checkout develop)

Next install NPM-packages:

`$ npm install`

Now we need the Cordova dependencies (platforms and plugins). Run:

`$ ionic cordova prepare --no-build`

That's it. You are now ready to start coding and run the dev-app

### Run the app locally

to run the app locally you can simple start a server with

`$ ionic serve`

This will build the app and start a server on localhost:8100
Be carefull as this will include the default `environment.ts` file which
might contain a API-url which is not usable on your local machine.

### Creating your own environment

To work with a local env-file copy the `environment.ts` and give the copied file
a unique name, e.g. `environment.calvin.ts`. Make sure, the content is the same as
in the environment.ts.

Next open the angular.json in the root-dir of the project.
Look for the section 'configurations'.
Create a new configuration and name it uniquely. Take note of the name
as we need it later.
At least your new configuration should look like the following:

```
"calvin": {
  "fileReplacements": [
      {
          "replace": "src/environments/environment.ts",
          "with": "src/environments/environment.mock.ts"
      }
  ]
}
```

Note the name of the configuration.

Finally open `package.json` and add a new run configuration in the scripts-section:

```
"start:calvin": "ng run app:serve --host=0.0.0.0 --port=8100 --configuration=calvin",
```

If you want to start the application with your environment enabled run this command:

`$ npm run start:calvin`

##Deploy / Building the App

### Building dependencies

Build dependencies are:

- nodejs / npm
- ionic-cli installed globally
- the cloned repo
- all packages from the package.json installed in the project folder
- all platfoms and plugins from cordova (plugins and platforms folder must be present)

Make sure to install all NPM-Packages:

`$ npm install`

Next install Cordova requirements:

`$ ionic cordova prepare --no-build`

_NOTE_: this can take quite a long time on the first run.

### Building

#### Browser

Currently we just build the app for the browser.
So if you want to build you need to setup a local dev-environment:

- install node, npm, ionic
- clone repo
- checkout branch develop (we have no release yet)
- run the above npm and ionic commands:

A deploy means we use the npm-SCP2 package to connect to the care-showcase-server
via SCP and upload the build-package to the destination.

_NOTE_: The SCP command will not remove files on the destination, it will just
overwrite existing files. It might be a good idea to clean up the remote directory
with a FTP-program from time to time.

Generated builds are in the folder `www` inside the project directory (!) NOT in the root dir
like common on Linux systems.

To build and upload the app run:

`$ npm run build:browser:stage`

to build a browser app and upload the content of `project-folder/www`
to `remote/care_showcase/dev-app`.

_NOTE_: the upload can take quite some time!

If something changes for the remote server or the API-url look into the files:

- tasks/deploy-stage.js
- src/environments/environment.stage.ts

and adjust the files to your needs.

#### Building for Apps

Do describe in detail how to build apps is out of the scope of this doc.
Read this doc [https://ionicframework.com/docs/intro/deploying/](https://ionicframework.com/docs/intro/deploying/)
to get into the details.
Building an app is as simple as `$ ionic cordova build <PLATFORM> --prod` on the command line.

Replace <PLATFORM> with either 'android' or 'ios' to build for the target platform.

### Testing

#### Unit Testing (Karma / Jasmine)

All tests are written in Jasmine. To start the test you need to setup the environment.
Follow the above guide to checkout and start the application.
Running tests is as simple as running `$ npm run test` on the console in the directory
that holds the repo

#### e2e Testing

End to End testing is a bit more complicated as you need to decide against which
API you want to test. Basic setting is to test against _https://dev-api.my-aurora.com_
If you think this is ok, just start e2e tests with `$ npm run e2e`

If you need to test against another environment, read the section above for setting
up local environments and check the current package.json and angluar.json as they contain
an example on how to do it.

### Additional Info

#### I18n, Language, etc...

For adding new translations to the app add the JSON file (e.g. 'fr.json') to directory /src/assets/i18n and
make sure to add the Angular Library file to the app in app.module.ts by adding
`registerLocaleData(<LANGUAGE>);` to the code. Do NOT forget to import the
locale (e.g. `import fr from '@angular/common/locales/fr';`)

You have to start a new build process and publish a new version of the app once you added a language.
