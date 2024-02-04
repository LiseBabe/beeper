import { css, html } from "lit";
import { BeeperBase } from "./beeper-base.js";

export class SearchProfileView extends BeeperBase {
  static properties = {
    search: {
      type: Object,
    },
  };

  constructor() {
    super();
  }

  render() {
    return html` <div class="search">
        <img
          class="viewed-user-profile-picture"
          src="${this.search?.picture}"
          alt="Profile pic"
        />
        <a class="viewed-user-username" href="/user/${this.search.name}"
          >${this.search.name}</a
        >
    </div>`;
  }

  static styles = [
    BeeperBase.styles,
    css`
      .user {
        display: flex;
        align-items: center;
        margin-top: 24px;
        margin-bottom: 48px;
      }

      .viewed-user-profile-picture {
        height: 80px;
        width: 80px;
        border-radius: 50%;
        margin-right: 12px;
      }

      .viewed-user-username {
        font-size: 24px;
        font-weight: bold;
      }

      .follow-button {
        margin-left: auto;
        font-size: 16px;
        cursor: pointer;
        position: relative;
        bottom: -2px;
      }
    `,
  ];
  
}

customElements.define("search-profile-view", SearchProfileView);
