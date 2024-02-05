import { css, html } from "lit";
import { BeeperBase } from "./beeper-base.js";

export class SearchHastagView extends BeeperBase {
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
      coucou hashtag
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

customElements.define("search-hashtag-view", SearchHastagView);
