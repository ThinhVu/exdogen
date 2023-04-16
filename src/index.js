const generateHtml = require('./generator/html')
const generatePostman = require('./generator/postman')
const collectRouteMetadata = require('./collector/collectRouteMetadata')

module.exports = async function generateDocument(apiPath, router) {
  const routeMetadata = collectRouteMetadata(apiPath, router)
  return {
    html: await generateHtml(routeMetadata),
    postman: await generatePostman(routeMetadata)
  }
}
