import { css, html } from "lit";
import { BeeperBase } from "./beeper-base.js";

export class SearchBeepView extends BeeperBase {
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
      <div class="beep-header">
        <img
          src="${this.search.authorPicture}"
          alt="Profile picture of ${this.search.authorName}"
          class="author-profile-picture"
        />
        <div>
          <a class="author" href="/user/${this.search.authorName}">
            ${this.search.authorName}
          </a>
          <span class="created-at">
            &nbsp;- ${new Date(this.search.createdAt).toLocaleString()} -&nbsp;
          </span>
            <span
              class="like-count ${this.search.liked ? "liked" : ""}"
              @click=${this.handleLike}
            >
              ${this.search.likeCount}
            </span>
            +
          </span>
        </div>
      </div>
      <div>${this.search.content}</div>
    </div>`;
  }

  static styles = [
    BeeperBase.styles,
    css`
    .beep {
      margin-bottom: 16px;
    }

    .beep-header {
      display: flex;
      align-items: center;
    }

    .author-profile-picture {
      display: block;
      height: 24px;
      width: 24px;
      border-radius: 50%;
      margin-right: 6px;
    }

    .author {
      font-weight: bold;
    }

    .created-at {
      font-style: italic;
      font-size: 14px;
    }

    .likes {
      font-size: 12px;
      cursor: pointer;
    }

    .liked {
      font-weight: bold;
    }
    `,
  ];
  
}

customElements.define("search-beep-view", SearchBeepView);
