const express = require('express');
const Router = require('routerex');
const Exdogen = require('../src/index');
const app = express();

const apiRouter = Router();

// Say hi to mom
apiRouter.get('/hi-mom', {
  title: 'hi mom',
  desc: 'Say hi to mom',
  response: {
    200: {
      type: 'string',
      desc: 'Hi, mom!'
    }
  }
}, (req, res) => res.send('Hi, mom!'))

// Update all products in a category with a given ID and a given price 2 status (true/false) to for sale (true/false)
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
      desc: 'Echoed message'
    },
    400: {
      type: 'string',
      desc: 'Too many times'
    }
  },
  testCases: [
    {
      headers: {
        Authorization: `{{TOKEN}}`
      },
      query: {
        times: 3
      },
      // body: {
      //   product: {forSale: true}
      // },
      params: {
        categoryId: '123'
      }
    }
  ]
}, (req, res) => {
  const times = req.query.times || 1;
  if (times > 10) {
    res.status(400).send('Too many times');
    return;
  }
  let echoMsg = '';
  for (let i = 0; i < times; i++) {
    echoMsg += req.params.msg + ";";
  }
  res.send(echoMsg);
});

const userRouter = Router();
userRouter.get('/hi', {
  title: 'Hi user',
  desc: 'Say hi to user',
  response: {
    200: {
      type: 'string',
      desc: 'Hi, user!'
    }
  }
}, (req, res) => res.send('Hi, user!'));
userRouter.get('/hi/:name', {
  title: 'Hi specified user',
  desc: 'Say hi to specified user with name',
  schema: {
    params: {
      name: {
        type: 'string',
        desc: 'User name',
        required: true
      }
    }
  },
  response: {
    200: {
      type: 'string',
      desc: 'Hi, user!'
    }
  }
}, (req, res) => res.send(`Hi, ${req.params.name}!`));

const userSubRouter = Router();
userSubRouter.get('/hi', {
  title: 'Hi user sub route',
  desc: 'Say hi to user sub route',
}, (req, res) => res.send('Hi, user sub route!'));
userRouter.use('/sub', userSubRouter);

apiRouter.use('/user', userRouter);

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

app.listen(3000, () => {
  console.log('Example app listening on http://localhost:3000');
});
