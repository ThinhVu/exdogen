const Router = require('routerex')

const userSubRouter = Router()

userSubRouter.get('/hi', {
  title: 'Hi user sub route',
  desc: 'Say hi to user sub route',
}, (req, res) => res.send('Hi, user sub route!'))

module.exports = userSubRouter
