/** ****************************************************************************
 *
 * Starts the API Server.
 *
 * This API Server sends the index.html page stored in the 'public' folder and
 * listens for requests sent by the client (see core/routes).
 *
 * Private Functions:
 *  . _deleted                    builds the server response to delete request,
 *  . _listen4examples            listens routes from 'examples',
 *  . _listen4test                listens routes from test program,
 *
 *
 * Public:
 *  . App                         starts the App server,
 *
 *
 *
 * @namespace    -
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ************************************************************************** */
/* eslint one-var: 0, semi-style: 0, no-underscore-dangle: 0, no-console: 0
  import/no-extraneous-dependencies: 0 */


// -- Vendor Modules
const http         = require('http')
    , express      = require('express')
    , bodyParser   = require('body-parser')
    , cookieParser = require('cookie-parser')
    , session      = require('express-session')
    ;


// -- Local Modules


// -- Local Constants


// -- Local Variables


// -- Private Functions --------------------------------------------------------

/**
 * Builds the server response to delete request.
 *
 * @function (arg1)
 * @private
 * @param {Object}          the request,
 * @returns {Object}        returns the server response,
 * @since 0.0.0
 */
function _deleted(query) {
  let ids;
  if (query.includes(',')) {
    ids = query.split(',');
  } else if (query.includes(';')) {
    ids = query.split(';');
  } else if (query.length > 0) {
    ids = Number.isNaN(parseInt(query, 10)) ? [query] : [parseInt(query, 10)];
  } else {
    ids = 0;
  }
  const del = { deleted: [] };
  ids.forEach((id) => {
    del.deleted.push({ id: parseInt(id, 10) });
  });
  return del;
}

/**
 * Listens routes from 'examples'.
 *
 * @function (arg1)
 * @private
 * @param {Object}          express.js app,
 * @returns {}              -,
 * @since 0.0.0
 */
function _listen4examples(app) {
  // GET MODEL
  app.get('/examples/api/v1/account/:id', (req, res) => {
    res.status(200).send({ a: 1, b: 2, c: 3 });
    console.log('Accepted GET api: "api/v1/account/".');
    console.log('Got id:');
    console.log(req.params);
  });


  // POST MODEL
  app.post('/examples/api/v1/account', (req, res) => {
    res.status(200).send(req.body);
    console.log('Got:');
    console.log(req.body);
    console.log('Accepted POST api: "api/v1/account".');
  });


  // DELETE MODEL
  app.delete('/examples/api/v1/account/:id', (req, res) => {
    res.status(200).send('done');
    console.log('Got:');
    console.log(req.params);
    console.log('Accepted GET api: "api/v1/account".');
  });


  // GET COLLECTION
  app.get('/examples/api/v1/accounts', (req, res) => {
    res.status(200).send([{ a: 1, b: 2, c: 3 }, { id: 44, d: 'a', e: 'b', c: 'c' }]);
    console.log('Accepted GET api: "api/v1/accounts/".');
    console.log('Got:');
    console.log(req.query);
  });
}

/**
 * Listens routes from test program.
 *
 * @function (arg1)
 * @private
 * @param {Object}          express.js app,
 * @returns {}              -,
 * @since 0.0.0
 */
function _listen4test(app) {
  // GET MODEL
  app.get('/api/v1/account/:id', (req, res) => {
    res.status(200).send({ a: 1, b: 2 });
    console.log('Accepted GET api: "api/v1/account/".');
    console.log('  Got params:');
    process.stdout.write('    ');
    console.log(req.params);
    console.log('  Returned:');
    process.stdout.write('    ');
    console.log({ a: 1, b: 2 });
  });

  app.get('/api/v1/account', (req, res) => {
    res.status(200).send({ a: 1, b: 2 });
    console.log('Accepted GET api: "api/v1/account/".');
    console.log('  Got query:');
    process.stdout.write('    ');
    console.log(req.query);
    console.log('  Returned:');
    process.stdout.write('    ');
    console.log({ a: 1, b: 2 });
  });


  // POST MODEL
  app.post('/api/v1/account', (req, res) => {
    res.status(200).send('done');
    console.log('Accepted POST api: "api/v1/account/".');
    console.log('  Got:');
    process.stdout.write('    ');
    console.log(req.body);
    console.log('  Returned:');
    console.log('    done');
  });


  // DELETE MODEL
  app.delete('/api/v1/account/:id', (req, res) => {
    res.status(200).send('done');
    console.log('Accepted DELETE api: "api/v1/account".');
    console.log('  Got path:');
    process.stdout.write('    ');
    console.log(req.route.path);
    console.log('  Got params:');
    process.stdout.write('    ');
    console.log(req.params);
    console.log('  Returned:');
    console.log('    done');
  });


  // GET COLLECTION
  app.get('/api/v1/accounts', (req, res) => {
    const collection = [{ id: 1, a: 1, b: 2 }, { id: 2, c: 3, d: 4 }];

    res.status(200).send(collection);
    console.log('Accepted GET api: "api/v1/accounts/".');
    console.log('  Got path:');
    process.stdout.write('    ');
    console.log(req.route.path);
    console.log('  Got query:');
    process.stdout.write('    ');
    console.log(req.query);
    console.log('  Returned:');
    process.stdout.write('    ');
    console.log(collection);
  });


  // POST COLLECTION
  app.post('/api/v1/accounts', (req, res) => {
    res.status(200).send([{ id: 1, a: 11, b: 22 }, { id: 2, a: 1111, b: 2222 }]);
    console.log('Accepted POST api: "api/v1/accounts/".');
    console.log('  Got:');
    process.stdout.write('    ');
    console.log(req.body);
    console.log('  Returned:');
    console.log('    done');
  });

  // DELETE COLLECTION
  app.delete('/api/v1/accounts', (req, res) => {
    // const deleted = { deleted: [{ id: 1 }, { id: 2 }, { id: 3 }] };
    const deleted = _deleted(req.query.ids);

    res.status(200).send(deleted);
    console.log('Accepted DELETE api: "api/v1/accounts".');
    console.log('  Got path:');
    process.stdout.write('    ');
    console.log(req.route.path);
    console.log('  Got query:');
    process.stdout.write('    ');
    console.log(req.query);
    console.log('  Returned:');
    process.stdout.write('    ');
    console.log(deleted);
    console.log('    done');
  });
}

/**
 * Sets the CORS policy.
 *
 * @function (arg1)
 * @private
 * @param {Object}          the configuration settings object,
 * @returns {Object}        returns the function to execute the CORS policy,
 * @since 0.0.0
 */
const _cors = function() {
  return function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
    next();
  };
};


// -- Public -------------------------------------------------------------------

/**
 * Starts the App server.
 *
 */

// Here we configure 'app' to accept both JSON and url encoded payloads
// and to serve the static page 'public/index.html'.
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// This block implements a session connection from a client web app. if
// your App doesn't implement a login session, you can safely remove
// this block and the modules 'cookieParser' and 'session'.
app.use(cookieParser());
app.use(session({
  name: 'app',
  secret: 'p!550ff',
  resave: true,
  saveUninitialized: true,
  cookie: {
    path: '/',
    httponly: true,
    maxAge: null,
    secure: false,
  },
}));
app.use(_cors());

// Serve the static pages:
app.use(express.static('./'));


// Listen Routes
_listen4examples(app);
_listen4test(app);


// Unknown routes:
app.all('/api/*', (req, res) => {
  res.statusMessage = `${req.method} api "${req.url}" does not exist!`;
  console.log(res.statusMessage);
  res.status(403).end();
});

// Forbidden routes:
app.all('/*', (req, res) => {
  res.statusMessage = 'This route is forbidden!';
  console.log(res.statusMessage);
  res.status(403).end();
});

// Start the HTTP server:
http.createServer(app)
  .on('error', (e) => {
    if (e.code === 'EACCES') {
      console.log('You don\'t have the privileges to listen the port: 1080.');
    } else {
      console.log(e);
    }
  })
  // '127.0.0.1' means allowing access to the local machine only. If you
  // want to authorize the server to listen any machines on the
  // network, replace '127.0.0.1' by '0.0.0.0'.
  .listen(1080, '127.0.0.1', () => {
    console.log('http listening on port 1080.');
  });


// -- Export
// none

// -- oOo ---
