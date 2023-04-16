module.exports = {
  props: {title: String},
  template:
`<div class="collapsible hide">
  <div data-component="collapsible-title" class="fr ai-c py-1 clickable collapsible--title" style="gap: 6px">
    <span style="color: #767676; font-size: 15px; font-weight: 600; text-transform: capitalize;">{{title}}</span>
    <span class="arrow" style="user-select: none; rotate: 90deg; color: #767676; font-size: 12px">▶</span>
  </div>
  <div data-component="collapsible-slot" class="collapsible--content">
    <slot></slot>
  </div>
</div>`
}
