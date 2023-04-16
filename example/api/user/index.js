const Router = require('routerex')

const userRouter = Router()

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
}, (req, res) => res.send(`Hi, ${req.params.name}!`))
userRouter.use('/sub', require('./sub'))

module.exports = userRouter
