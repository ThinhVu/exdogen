const {computed} = require('vue');
const FieldSpec = require('./FieldSpec');

const methodColors = {
  'get': '#1ccc11',
  'post': '#f6871a',
  'put': '#009cde',
  'delete': '#ec5050',
}

module.exports = {
  name: 'ApiDocItem',
  components: {
    FieldSpec
  },
  props: {
    subRoute: Array,
    path: String,
    methods: Object,
    metadata: Object
  },
  setup(props) {
    const isSubRoute = props.subRoute && props.subRoute.length > 0
    const methodName = isSubRoute ? '' : Object.keys(props.methods).find(k => props.methods[k]);
    const methodColor = methodColors[methodName] || '#aaa'
    const elId = `${methodName}:${props.path}`
    return {
      isSubRoute,
      methodName,
      methodColor,
      elId
    }
  },
  template: `
<div v-if="isSubRoute">
  <div style="padding: 10px; background-color: #b4b4b4">{{path}}</div>
  <api-doc-item v-for="item in subRoute" v-bind="item" class="mb-3"/>
</div>    
<div v-else class="grid gtc-1fr-1fr" style="border-top: 1px solid #ddd">
    <div class="fc fg-1 px-3">
      <div class="pt-2 fs-l" style="text-transform: capitalize" :id="elId">{{metadata.title}}</div>
      <div style="border: 1px solid #ddd; line-height: 30px; border-radius: 6px;" class="fr ai-c mb-2 ovf-h">
        <span class="h-100 fs-s ta-c t-t--u" style="display: inline-block; min-width: 80px; color: #e3f2fd;" :style="{backgroundColor: methodColor}">{{ methodName }}</span>
        <span class="h-100 ml-1" style="color: #555; font-size: 0.9375rem; font-weight: 400;">{{ path }}</span>
      </div>
      <p class="fs-s mb-3">{{ metadata.desc }}</p>
      <field-spec title="Headers" :value="metadata.schema?.headers"/>
      <field-spec title="Path parameters" :value="metadata.schema?.params"/>
      <field-spec title="Query string" :value="metadata.schema?.query"/>
      <field-spec title="Request body" :value="metadata.schema?.body"/>
      <field-spec title="Response" :value="metadata.response"/>
    </div>
    <div style="color: #fff; background-color: #1e204c; border-radius: 0 0 6px 6px">
    </div>
</div>`
}
