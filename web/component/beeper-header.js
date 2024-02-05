import { css, html } from "lit";
import { getActiveUserProfile } from "../util/active-user-profile.js";
import { BeeperBase } from "./beeper-base.js";

export class BeeperHeader extends BeeperBase {
  static properties = {
    profile: {
      state: true,
    },
  };

  static styles = [
    BeeperBase.styles,
    css`
      .header {
        display: flex;
        align-items: center;
      }

      .profile-picture {
        border-radius: 50%;
        height: 48px;
        width: 48px;
      }

      .logout {
        margin-left: auto;
        border: none;
        cursor: pointer;
        font-style: italic;
      }

      .search-bar {
        margin-left: auto;
        border: none;
        cursor: pointer;
        font-style: italic;
      }
    `,
  ];

  constructor() {
    super();
    this.profile = null;
  }

  async connectedCallback() {
    super.connectedCallback();
    this.profile = await getActiveUserProfile();
  }

  render() {
    return html`
      <div class="header">
        <a href="/home">🏠 Home</a>
        <a class="search-bar" href="/search">Chercher</a>
        <a href="/logout" class="logout">logout - </a>
        <img class="profile-picture" src="${this.profile?.picture}" />
      </div>
    `;
  }
}

customElements.define("beeper-header", BeeperHeader);
