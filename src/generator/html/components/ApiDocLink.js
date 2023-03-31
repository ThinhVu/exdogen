const {computed} = require('vue');

module.exports = {
  name: 'ApiDocItem',
  props: {
    path: String,
    subRoute: Array,
    methods: Object,
    metadata: Object
  },
  setup(props) {
    const isSubRoute = props.subRoute && props.subRoute.length > 0
    const methodName = isSubRoute ? '' : Object.keys(props.methods).find(k => props.methods[k]);
    const href = isSubRoute ? '' : `#${methodName}:${props.path}`
    return {href, isSubRoute}
  },
  template: `
<ul v-if="isSubRoute">
    <li class="my-1 clickable">{{ path }}</li>
    <api-doc-item v-for="item in subRoute" v-bind="item" class="ml-3"/>
</ul>
<li v-else class="my-1 clickable">
    <a style="text-decoration: none; color: #0c0c0d" :href="href">
      {{ metadata.title || path.toLowerCase() }}
    </a>
</li>
  `
}
