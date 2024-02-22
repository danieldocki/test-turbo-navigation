import { Controller } from "@hotwired/stimulus"
import { Turbo } from "@hotwired/turbo-rails"
import { enter, leave } from "el-transition"

export default class extends Controller {
  static targets = ["transition"]
  static values = {
    restoreUrl: String,
    turboFrameRequest: {
      type: Boolean,
      default: false
    }
  }

  connect() {
    this.showSlider()

    this.enterTransitions().then(() => {
      this.lockBodyScroll()
      this.element.focus({ preventScroll: true })
      window.Slider.add(this.element.id, this)
    })
  }

  close() {
    this.leaveTransitions().then(() => {
      window.Slider.delete(this.element.id)
      this.hideSlider()
      this.unlockBodyScroll()
      this.handleRestoreUrl()
    })
  }

  enterTransitions() {
    return Promise.all(this.transitionTargets.map((transition) => enter(transition)))
  }

  leaveTransitions() {
    return Promise.all(this.transitionTargets.map((transition) => leave(transition)))
  }

  showSlider() {
    this.element.classList.remove("hidden")
  }

  hideSlider() {
    this.element.classList.add("hidden")
  }

  lockBodyScroll() {
    document.body.style.overflow = "hidden"
  }

  unlockBodyScroll() {
    document.body.style.overflow = "auto"
  }

  handleRestoreUrl() {
    if (this.hasRestoreUrlValue) {
      if (this.turboFrameRequestValue) {
        history.back()
      } else {
        Turbo.visit(this.restoreUrlValue, { action: "advance" })
      }
    }
  }
}
