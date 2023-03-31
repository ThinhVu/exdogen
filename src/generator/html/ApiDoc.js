const ApiDocItem = require('./components/ApiDocItem')
const ApiDocLink = require('./components/ApiDocLink')

module.exports = {
  components: {ApiDocItem, ApiDocLink},
  props: {routeMetadatas: Array},
  setup() {
  },
  template:
`<div class="w-100vw h-100vh">
    <div style="height: 40px; line-height: 40px; border-bottom: 1px solid #ddd">
      <h3 class="mx-2">API Documentation</h3>
    </div>
    <div class="grid ovf-h" style="height: calc(100% - 40px); grid-template-columns: 240px 1fr;">
      <div class="h-100 ovf-y-s" style="border-right: 1px solid #ddd; padding-left: 15px">
        <ul class="mx-2">
          <api-doc-link v-for="item in routeMetadatas" v-bind="item"/>
        </ul>
      </div>
      <div class="h-100 ovf-y-s">
        <api-doc-item v-for="item in routeMetadatas" v-bind="item" class="mb-3"/>
      </div>
    </div>
</div>`
}
