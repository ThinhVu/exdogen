const {routeMetadataCollectorFactory} = require('routerex')
const generateHtml = require('./generator/html')
const generatePostman = require('./generator/postman')

module.exports = function(config) {
  if (!config)
    throw new Error('No config provided')
  const {onHtmlGenerated, onPostmanGenerated, onError} = config
  return routeMetadataCollectorFactory({
    onMetadataGathered: async metadatas => {
      try {
        if (onHtmlGenerated)
          setImmediate(() => generateHtml(metadatas, onHtmlGenerated))
        if (onPostmanGenerated)
          setImmediate(() => generatePostman(metadatas, onPostmanGenerated))
      } catch (e) {
        onError && onError(e)
      }
    }
  })
}
