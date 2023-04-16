const generateHtml = require('./generator/html')
const generatePostman = require('./generator/postman')
const routeMetadataCollectorFactory = require('./collector/routeMetadataCollectorFactory')

module.exports = function (config) {
  if (!config) {
    throw new Error('No config provided')
  }
  const {onHtmlGenerated, onPostmanGenerated, onError} = config
  return routeMetadataCollectorFactory({
    onMetadataGathered: async metadatas => {
      if (onHtmlGenerated) {
        setImmediate(() => {
          try {
            generateHtml(metadatas, onHtmlGenerated)
          } catch (e) {
            onError && onError(e)
          }
        })
      }
      if (onPostmanGenerated) {
        setImmediate(() => {
          try {
            generatePostman(metadatas, onPostmanGenerated)
          } catch (e) {
            onError && onError(e)
          }
        })
      }
    }
  })
}
