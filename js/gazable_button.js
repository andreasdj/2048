class GazableButtonElement extends HTMLElement {
  _activateTimeoutMs;
  _activateTimeout = undefined;

  constructor() {
    super();

    this._activateTimeoutMs = 250; //todo: read shared/default browser value

    // todo: should be a synced property
    this.setAttribute("gaze-enabled", true);
    this.setAttribute("role", "button");

    // Element functionality written in here
    // this.addEventListener('gazeenter', (e) => {
    this.addEventListener("mouseenter", (e) => {
      // eval(this.getAttribute('onGazeEnter'), e);
      // this.focus();
      console.log("mouse-enter, trigger click");
      this.setAttribute("gaze-focused", true);

      this._activateTimeout = setTimeout(() => {
        this.click();
      }, this._activateTimeoutMs);
    });

    // this.addEventListener('gazeleave', (e) => {
    this.addEventListener("mouseleave", (e) => {
      // eval(this.getAttribute( 'onGazeLeave'), e);
      this.removeAttribute("gaze-focused");

      if (this._activateTimeout !== undefined) {
        clearTimeout(this._activateTimeout);
        this._activateTimeout = undefined;
      }

      this.blur();
    });
  }
}

customElements.define("gazable-button", GazableButtonElement, {
  extends: "button",
});
