const {createSSRApp} = require('vue');
const {renderToString} = require('vue/server-renderer');
const ApiDoc = require('./ApiDoc');

function buildHtml(docContent) {
  return `
<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>API Documentation</title>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; font-family: sans-serif; }
      /*size*/
      .w-100vw { width: 100vw; }
      .h-100vh { height: 100vh; }
      .h-100 { height: 100%; }
      /*margin*/
      .my-1 { margin-top: 0.5em; margin-bottom: 0.5em; }
      .ml-1 { margin-left: 0.5em; }
      .ml-2 { margin-left: 1em; }
      .ml-3 { margin-left: 1.5em; }
      .mb-2 { margin-bottom: 1em; }
      .mr-2 { margin-right: 1em; }
      .mb-3 { margin-bottom: 1.5em; }
      .mx-2 { margin-left: 1em; margin-right: 1em; }
      /*padding*/
      .px-2 { padding-left: 1em; padding-right: 1em; }
      .pt-2 { padding-top: 1em; }
      .px-3 { padding-left: 1.5em; padding-right: 1.5em; }
      .py-1 { padding-top: 0.5em; padding-bottom: 0.5em; }
      .py-3 { padding-top: 1.5em; padding-bottom: 1.5em; }
      /*border*/
      /*overflow*/
      .ovf-h { overflow: hidden; }
      .ovf-y-s { overflow-y: scroll; }
      .hide-scroll-bar::-webkit-scrollbar {display: none;}
      /*grid*/
      .grid { display: grid; }
      .gtc-1fr-1fr { grid-template-columns: 1fr 1fr; }
      /*flex*/
      .fr { flex-direction: row; display: flex; }
      .fc { flex-direction: column; display: flex; }
      .fg-1 { gap: 0.5em; }
      .ai-c { align-items: center; }
      /*font*/
      .fs-xs { font-size: 0.75em; }
      .fs-s { font-size: 0.85em; }
      .fs-l { font-size: 1.15em; }
      .fw-7 { font-weight: 700; }
      /*text*/
      .ta-c { text-align: center; }
      .t-t--u { text-transform: uppercase; }
      /*color*/
      .c:#fff { color: #fff; }
      .bc:#1e204c { background-color: #1e204c; }
      .clickable { cursor: pointer; }
      .collapsible--title { position: relative }
      .collapsible--title::before { content: '▶'; rotate: 90deg; transition: rotate 0.5s; position: absolute; left: 0; color: #767676; }
      .hide .collapsible--title::before { content: '▶'; rotate: 0deg; transition: rotate 0.5s; position: absolute; left: 0; color: #767676; }
      .hide .collapsible--content { display: none; }
    </style>
    <script>
      window.addEventListener('load', () => {
        const collapsibleSections = document.querySelectorAll('[data-component="collapsible-section"]')
        collapsibleSections.forEach(section => {
          section.addEventListener('click', () => section.classList.toggle('hide'))
        })
      })
    </script>
</script>
  </head>
  <body>
    <div id="app">
      ${docContent}
    </div>
  </body>
  </html>`
}

module.exports = (routeMetadatas, cb) => {
  const app = createSSRApp(ApiDoc, {routeMetadatas})
  renderToString(app).then(html => cb(buildHtml(html)))
}
