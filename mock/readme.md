If you want to work with the mock server install json-server globally

`$ npm i -g json-server`

Export the NODE_PATH variable pointing to your global node_modules dir, e.g.

`export NODE_PATH=/usr/bin/node/lib/node_modules`

If you don't know about your node installation path check the web for more information.

After you installed the module and set the NODE_PATH cd into this
directory

start json server like this:

`$ json-server db.json --routes roust.json --middlewares ./middleware.js`

This will start a simple server on port 3000 (http://localhost:3000).

You can request data in the way the db.json is defined.
E.g. requesting the url localhost:3000/users will return all users defined in the db.json file.

Posting stuff will change the db.json file so it behaves as if you are in a real environemnt.

Refer to the json-server github page for more information:
https://github.com/typicode/json-server
