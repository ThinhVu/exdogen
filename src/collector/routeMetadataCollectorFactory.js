const path = require('path');

module.exports = function({onMetadataGathered}) {
  function gatherMetadata(parentPath, router) {
    const routes = []
    for (const stack of router.stack) {
      if (stack.route) {
        routes.push({
          path: path.join(parentPath, stack.route.path),
          methods: stack.route.methods,
          metadata: stack.route.metadata,
        })
      } else {
        let currentPath = stack.regexp.toString()
        currentPath = currentPath.substr(4, currentPath.length - 17)
        routes.push({
          path: currentPath,
          subRoute: gatherMetadata(path.join(parentPath, currentPath), stack.handle)
        });
      }
    }
    return routes;
  }

  return function (path, ...rest) {
    const router = rest.pop()
    const routes = gatherMetadata(path, router)
    onMetadataGathered(routes)
    return [path, ...rest, router]
  }
}
