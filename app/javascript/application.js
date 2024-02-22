// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"

window.Slider = {
  items: {},

  add: function (id, slider) {
    if (!window.Slider.items[id]) {
      window.Slider.items[id] = slider
    }
  },

  delete: function (id) {
    if (window.Slider.items[id]) {
      delete window.Slider.items[id]
    }
  },

  get: function (id) {
    return window.Slider.items[id] || null
  }
}
