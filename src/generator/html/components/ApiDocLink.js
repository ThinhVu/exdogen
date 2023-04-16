const CollapsibleSection = require('./CollapsibleSection')

module.exports = {
  name: 'ApiDocItem',
  components: {CollapsibleSection},
  props: {
    path: String,
    subRoute: Array,
    methods: Object,
    metadata: Object
  },
  setup(props) {
    const hasSubRoutes = props.subRoute && props.subRoute.length > 0
    const methodName = hasSubRoutes ? '' : Object.keys(props.methods).find(k => props.methods[k]);
    const href = hasSubRoutes ? '' : `#${methodName}:${props.path}`
    return {href, hasSubRoutes}
  },
  template: `
<li class="clickable" v-if="hasSubRoutes">
  <collapsible-section :title="path">
    <ul>
      <api-doc-item v-for="item in subRoute" v-bind="item" class="ml-3"/>  
    </ul>
  </collapsible-section>
</li>
<li v-else class="clickable">
  <div class="py-1">
    <a style="text-decoration: none; text-transform: capitalize; color: #767676; font-size: 15px; font-weight: 600;" :href="href">
      {{ metadata.title || path.toLowerCase() }}
    </a>
  </div>
</li>`
}
