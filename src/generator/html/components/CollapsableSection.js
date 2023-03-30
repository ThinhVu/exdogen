module.exports = {
  props: {
    title: String,
  },
  template: `
    <div>
      <div class="fr ai-c py-1" style="gap: 6px" >
        <span style="color: #767676; font-size: 15px; font-weight: 600;">{{title}}</span>
      </div>
      <div>
        <slot></slot>
      </div>
    </div>
  `
}
