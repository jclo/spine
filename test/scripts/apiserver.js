/** ****************************************************************************
 *
 * Starts the API Server.
 *
 * This API Server sends the index.html page stored in the 'public' folder and
 * listens for requests sent by the client (see core/routes).
 *
 * Private Functions:
 *  . _print                      prints or not the message,
 *  . _processWrite               prints or not the message,
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
/* eslint no-console: 0 */


// -- Vendor Modules
import http from 'http';
import express from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';


// -- Local Modules


// -- Local Constants
const LISTENING_PORT = 1080;


// -- Local Variables
let SILENT = false;


// -- Private Functions --------------------------------------------------------

/**
 * Prints or not the message.
 *
 * @function (arg1)
 * @private
 * @param {String}          the mmessage to print on. the console,
 * @returns {}              returns -,
 * @since 0.0.0
 */
function _print(mess) {
  if (!SILENT) {
    console.log(mess);
  }
}

/**
 * Prints or not the message.
 *
 * @function (arg1)
 * @private
 * @param {String}          the mmessage to print on. the console,
 * @returns {}              returns -,
 * @since 0.0.0
 */
function _processWrite(mess) {
  if (!SILENT) {
    process.stdout.write(mess);
  }
}

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
    _print('Accepted GET api: "api/v1/account/".');
    _print('Got id:');
    _print(req.params);
  });


  // POST MODEL
  app.post('/examples/api/v1/account', (req, res) => {
    res.status(200).send(req.body);
    _print('Got:');
    _print(req.body);
    _print('Accepted POST api: "api/v1/account".');
  });


  // DELETE MODEL
  app.delete('/examples/api/v1/account/:id', (req, res) => {
    res.status(200).send('done');
    _print('Got:');
    _print(req.params);
    _print('Accepted GET api: "api/v1/account".');
  });


  // GET COLLECTION
  app.get('/examples/api/v1/accounts', (req, res) => {
    res.status(200).send([{ a: 1, b: 2, c: 3 }, { id: 44, d: 'a', e: 'b', c: 'c' }]);
    _print('Accepted GET api: "api/v1/accounts/".');
    _print('Got:');
    _print(req.query);
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
    _print('Accepted GET api: "api/v1/account/".');
    _print('  Got params:');
    _processWrite('    ');
    _print(req.params);
    _print('  Returned:');
    _processWrite('    ');
    _print({ a: 1, b: 2 });
  });

  app.get('/api/v1/account', (req, res) => {
    res.status(200).send({ a: 1, b: 2 });
    _print('Accepted GET api: "api/v1/account/".');
    _print('  Got query:');
    _processWrite('    ');
    _print(req.query);
    _print('  Returned:');
    _processWrite('    ');
    _print({ a: 1, b: 2 });
  });


  // POST MODEL
  app.post('/api/v1/account', (req, res) => {
    res.status(200).send('done');
    _print('Accepted POST api: "api/v1/account/".');
    _print('  Got:');
    _processWrite('    ');
    _print(req.body);
    _print('  Returned:');
    _print('    done');
  });


  // DELETE MODEL
  app.delete('/api/v1/account/:id', (req, res) => {
    res.status(200).send('done');
    _print('Accepted DELETE api: "api/v1/account".');
    _print('  Got path:');
    _processWrite('    ');
    _print(req.route.path);
    _print('  Got params:');
    _processWrite('    ');
    _print(req.params);
    _print('  Returned:');
    _print('    done');
  });


  // GET COLLECTION
  app.get('/api/v1/accounts', (req, res) => {
    const collection = [{ id: 1, a: 1, b: 2 }, { id: 2, c: 3, d: 4 }];

    res.status(200).send(collection);
    _print('Accepted GET api: "api/v1/accounts/".');
    _print('  Got path:');
    _processWrite('    ');
    _print(req.route.path);
    _print('  Got query:');
    _processWrite('    ');
    _print(req.query);
    _print('  Returned:');
    _processWrite('    ');
    _print(collection);
  });


  // POST COLLECTION
  app.post('/api/v1/accounts', (req, res) => {
    res.status(200).send([{ id: 1, a: 11, b: 22 }, { id: 2, a: 1111, b: 2222 }]);
    _print('Accepted POST api: "api/v1/accounts/".');
    _print('  Got:');
    _processWrite('    ');
    _print(req.body);
    _print('  Returned:');
    _print('    done');
  });

  // DELETE COLLECTION
  app.delete('/api/v1/accounts', (req, res) => {
    // const deleted = { deleted: [{ id: 1 }, { id: 2 }, { id: 3 }] };
    const deleted = _deleted(req.query.ids);

    res.status(200).send(deleted);
    _print('Accepted DELETE api: "api/v1/accounts".');
    _print('  Got path:');
    _processWrite('    ');
    _print(req.route.path);
    _print('  Got query:');
    _processWrite('    ');
    _print(req.query);
    _print('  Returned:');
    _processWrite('    ');
    _print(deleted);
    _print('    done');
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

// Capture the arguments.
if (process.env.API_SERVER_STATUS === 'silent') {
  SILENT = true;
}

// Here we configure 'app' to accept both JSON and url encoded payloads
// and to serve the static page 'public/index.html'.
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// This block implements a session connection from a client web app. if
// your App doesn't implement a login session, you can safely remove
// this block and the modules 'cookieParser' and 'session'.
app.use(cookieParser());
app.use(session({
  name: 'app',
  secret: 'p!550ff',
  resave: false,
  saveUninitialized: false,
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

// Respond to start-server-and-test
app.get('/health', (req, res) => {
  res.status(200).send('ok');
});

// Unknown routes:
app.use('/api', (req, res) => {
  res.statusMessage = `${req.method} api "${req.url}" does not exist!`;
  console.log(res.statusMessage);
  res.status(403).end();
});

// Forbidden routes:
app.use((req, res) => {
  res.statusMessage = 'This route is forbidden!';
  console.log(res.statusMessage);
  res.status(403).end();
});

// Start the HTTP server:
http.createServer(app)
  .on('error', (e) => {
    if (e.code === 'EACCES') {
      console.log(`You don't have the privileges to listen the port: ${LISTENING_PORT}.`);
    } else {
      console.log(e);
    }
  })
  // '127.0.0.1' means allowing access to the local machine only. If you
  // want to authorize the server to listen any machines on the
  // network, replace '127.0.0.1' by '0.0.0.0'.
  .listen(LISTENING_PORT, '127.0.0.1', () => {
    console.log(`http listening on port ${LISTENING_PORT}.`);
  });


// -- Export
// none

// -- oOo ---
