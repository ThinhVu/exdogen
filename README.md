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
const exdogen = Exdogen({
  onHtmlGenerated: (html) => {
    const docs = __dirname + '/public/docs';
    if (!fs.existsSync(docs))
      fs.mkdirSync(docs)
    fs.writeFileSync(docs + '/index.html', html);
  },
  onPostmanGenerated: (postman) => {
    const docs = __dirname + '/public/docs';
    if (!fs.existsSync(docs))
      fs.mkdirSync(docs)
    fs.writeFileSync(docs + '/postman.json', JSON.stringify(postman))
  },
  onError: (e) => {
    console.error(e);
  }
})
app.use(...exdogen('/', [/*middlewares*/], apiRouter));
app.use(express.static('public'));
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
