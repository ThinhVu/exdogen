const express = require('express');
const Router = require('routerex');
const Exdogen = require('../src/index');
const fs = require('fs');
const app = express();

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

app.listen(3000, () => {
  console.log('Example app listening on http://localhost:3000');
});
