const {computed} = require('vue')
const CollapsableSection = require('./CollapsableSection');

module.exports = {
  props: {
    title: String,
    value: Object
  },
  components: {CollapsableSection},
  setup(props) {
    const visible = computed(() => props.value)
    const entries = computed(() => Object.entries(props.value || {}))
    return {
      visible, entries
    }
  },
  template: `
  <collapsable-section :title="title" v-if="visible">
    <div class="fc fg-1">
      <div v-for="(entry, i) of entries" :key="i" style="border: 1px solid #ddd; border-radius: 10px" class="px-3 py-3">
        <p class="mb-3" style="font-size: 12px">
          <span class="mr-2 fw-7">{{ entry[0] }}</span>
          <span class="mr-2" style="color: #6c7378">{{ entry[1].type }}</span>
          <span v-if="entry[1].required" style="color: #f08d00">required</span>
        </p>
        <p class="fs-xs">{{ entry[1].desc }}</p>
      </div>
    </div>
  </collapsable-section>
  `
}
