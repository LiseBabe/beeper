import { LitElement, css, html } from "lit";
import { BeeperBase } from "./beeper-base.js";
import { BeepView } from "./beep-view.js";

export class BeepListSearch extends BeeperBase {
  static properties = {
    beepList: {
      type: Array,
    },
  };

  static styles = [BeeperBase.styles, css``];

  constructor() {
    super();
    this.beepList = [];
  }

  render() {
    return html`
      ${this.beepList.map(
        (b) => html`<beep-view beep="${JSON.stringify(b)}"></beep-view>`
      )}
    `;
  }
}
customElements.define("beep-list-search", BeepListSearch);
