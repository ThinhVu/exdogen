const {getActiveMethod, obj2KeyValuePair, defaultBodyValueFromSchema} = require('../utils')
const {v4} = require('uuid')

function generateAPI(route) {
  const isSubRoute = route.subRoute && route.subRoute.length > 0
  if (isSubRoute) {
    return {
      name: route.path,
      item: route.subRoute.map(generateAPI)
    }
  }

  const {path, methods, metadata} = route;
  const {title, schema, tests /*postman tests*/, testCases} = metadata || {}
  const method = (getActiveMethod(methods) || 'get').toLowerCase()
  const hasTestCases = testCases && testCases.length
  const firstTestCase = hasTestCases && testCases[0]
  const authHeader = firstTestCase && firstTestCase.headers && firstTestCase.headers.Authorization
  const anotherHeaders = firstTestCase && firstTestCase.headers && Object.entries(firstTestCase.headers).filter(([k]) => k !== 'Authorization').map(([k, v]) => ({key: k, value: v})) || []
  const body = ['post', 'put'].includes(method) && (firstTestCase && firstTestCase.body || schema && defaultBodyValueFromSchema(schema.body))

  return {
    name: title,
    ...tests && {
      event: [
        {
          listen: 'test',
          script: {
            type: 'text/javascript',
            exec: tests.split('\n')
          }
        }
      ]
    },
    request: {
      method,
      // only support Bear token at the moment
      ...authHeader && {
        auth: {
          type: 'bearer',
          bearer: [{
            "key": "token",
            "value": authHeader,
            "type": "string"
          }]
        }
      },
      header: anotherHeaders,
      ...body && {
        body: {
          mode: 'raw',
          raw: JSON.stringify(body || {}, null, 2),
          options: {
            raw: {
              language: 'json'
            }
          }
        }
      },
      url: {
        raw: `{{HOST}}${path}`,
        host: ['{{HOST}}'],
        path: path.split('/').filter(Boolean).map(p => p.startsWith(':') ? `:${p.slice(1)}` : p),
        ...firstTestCase && {
          query: obj2KeyValuePair((firstTestCase.query) || {}, true),
          variable: obj2KeyValuePair((firstTestCase.params) || {}, true)
        }
      }
    },
    response: []
  }
}

module.exports = (metadatas, cb) => {
  const items = metadatas.map(generateAPI)

  const postman = {
    info: {
      _postman_id: v4(),
      name: "API Documentation",
      schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    },
    items
  }
  cb(postman)
}
