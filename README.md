# exdogen
EXpress router api DOcument GENerator

### Usage


You just need to put a metadata object between route's path and middleware function.
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

More complex example
```js
// Update all products in a category with a given ID
// and a given price 2 status (true/false) to for sale (true/false)
apiRouter.put('/product/update/:categoryId', {
  title: 'Update product',
  desc: 'Update product',
  schema: {
    headers: {
      Authorization: {
        type: 'string',
        desc: 'Authorization token'
      }
    },
    params: {
      categoryId: {
        type: 'string',
        desc: 'Category ID',
        required: true
      }
    },
    query: {
      hasPrice2: {
        type: 'boolean',
        desc: 'Has price 2'
      }
    },
    body: {
      product: {
        type: 'object',
        desc: 'Product',
      }
    }
  },
  response: {
    200: {
      type: 'string',
      desc: 'Product updated'
    },
    400: {
      type: 'string',
      desc: 'Bad request'
    }
  },
  testCases: [
    {
      headers: {
        Authorization: `{{TOKEN}}`
      },
      params: {
        categoryId: '123'
      },
      body: {
        product: {forSale: true}
      }
    }
  ]
}, (req, res) => res.send('product updated'));
```

Attach Exdogen to express app
```js
const express = require('express')
const app = express()
const apiRouter = require('./apiRouter')

// do api stuff at here

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

// serve html and postman file
app.get('/docs/index.html', (req, res) => res.send(cache.html));
app.get('/docs/postman.json', (req, res) => res.send(cache.postman));
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
