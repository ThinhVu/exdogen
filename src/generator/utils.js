module.exports = {
  getActiveMethod: (methods) => Object.keys(methods).find(k => methods[k]),
  get: (obj, path, defaultVal) => {
    path = path.split('.')
    let current = obj
    for (let i = 0; i < path.length; i++) {
      if (current[path[i]] === undefined) {
        return undefined
      }
      current = current[path[i]]
    }
    return current || defaultVal
  },
  obj2KeyValuePair: (obj, value2Str) => Object.entries(obj).map(([k, v]) => ({key: k, value: value2Str ? v.toString(): v})),
  defaultBodyValueFromSchema: (body) => {
    let result = {}
    for (const [k, v] of Object.entries(body)) {
      switch (v.type) {
        case 'string':
          result[k] = ''
          break;
        case 'number':
          result[k] = 0;
          break;
        case 'boolean':
          result[k] = false;
          break;
        case 'array':
          result[k] = [];
          break;
        case 'object':
          result[k] = {};
          break;
        default:
          result[k] = v.type;
      }
    }
    return result
  }
}
