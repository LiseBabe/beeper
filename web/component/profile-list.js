import { LitElement, css, html } from "lit";
import { BeeperBase } from "./beeper-base.js";
import "./search-profile-view.js";

export class SearchList extends BeeperBase {
  static properties = {
    profileList: {
      type: Array,
    },
  };

  static styles = [BeeperBase.styles, css``];

  constructor() {
    super();
    this.profileList = [];
  }

  render() {
    return html`
      ${this.profileList.map(
        (b) => html`<search-profile-view search="${JSON.stringify(b)}"></search-profile-view>`
      )}
    `;
  }
}
customElements.define("search-list", SearchList);
