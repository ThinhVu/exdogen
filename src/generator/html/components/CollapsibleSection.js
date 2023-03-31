module.exports = {
  props: {title: String},
  template:
`<div data-component="collapsible-section" class="collapsible hide">
  <div class="fr ai-c py-1 clickable collapsible--title" style="gap: 6px">
    <span style="color: #767676; font-size: 15px; font-weight: 600; margin-left: 20px">{{title}}</span>
  </div>
  <div data-component="collapsible-slot" class="collapsible--content">
    <slot></slot>
  </div>
</div>`
}
