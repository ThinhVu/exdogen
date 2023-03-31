const ApiDocItem = require('./components/ApiDocItem')

module.exports = {
  components: {ApiDocItem},
  props: {routeMetadatas: Array},
  setup() {
    const methodName = (item) => Object.keys(item.methods).find(k => item.methods[k])
    const toLower = (v) => v && v.toLowerCase()
    const href = (item) => `#${methodName(item)}:${item.path}`
    return {methodName, toLower, href}
  },
  template:
`<div class="w-100vw h-100vh">
    <div style="height: 40px; line-height: 40px; border-bottom: 1px solid #ddd">
      <h3 class="mx-2">API Documentation</h3>
    </div>
    <div class="grid ovf-h" style="height: calc(100% - 40px); grid-template-columns: 240px 1fr;">
      <div class="h-100 ovf-y-s" style="border-right: 1px solid #ddd; padding-left: 15px">
        <ul class="mx-2">
          <li class="my-1 clickable" v-for="item in routeMetadatas">
            <a style="text-decoration: none; color: #0c0c0d" :href="href(item)">
              {{item.metadata.title || toLower(item.path)}}
            </a>
          </li>
        </ul>
      </div>
      <div class="h-100 ovf-y-s">
        <api-doc-item v-for="item in routeMetadatas" v-bind="item" class="mb-3"/>
      </div>
    </div>
</div>`
}
