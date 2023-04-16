const Router = require('routerex')

const apiRouter = Router()

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
})
apiRouter.use('/user', require('./user'))

module.exports = apiRouter
