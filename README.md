# exdogen
EXpress router api DOcument GENerator

### Usage

```js
// using routerex to define express router
const Router = require('routerex');
const apiRouter = Router();
// Say hi to mom
apiRouter.get('/hi-mom', {
  title: 'Hi mom',
  desc: 'Say hi to mom',
  response: {
    200: {
      type: 'string',
      desc: 'Hi, mom!'
    }
  }
}, (req, res) => res.send('Hi, mom!'))
```

```js
const fs = require('fs');
const express = require('express');
const app = express();
const apiRouter = require('./apiRouter');

const Exdogen = require('exdogen');
const cache = {};
const exdogen = Exdogen({
  onHtmlGenerated: html => cache.html = html,
  onPostmanGenerated: postman => cache.postman = postman,
  onError: console.error
})
const middelware1 = (req, res, next) => { next() }
const middelware2 = (req, res, next) => { next() }
app.use(...exdogen('/', middelware1, middelware2, apiRouter));
app.get('/docs', (req, res) => res.send(cache.html));
app.get('/docs/index.html', (req, res) => res.send(cache.html));
app.get('/docs/postman.json', (req, res) => res.send(cache.postman));
app.use('/', express.static('public'));

```

### Output

Html document
![html-doc.png](docs%2Fimages%2Fhtml-doc.png)

Postman file
![postman-file.png](docs%2Fimages%2Fpostman-file.png)


### ROADMAP
- html hydration
- html example
- postman tests
- swagger file
