import { css, html } from "lit";
import { BeeperBase } from "./beeper-base.js";

export class BeepView extends BeeperBase {
  static properties = {
    beep: {
      type: Object,
    },
  };

  constructor() {
    super();
  }

  async handleLike() {
    if (this.beep.liked) {
      await fetch(`/api/unlike/${this.beep.id}`, {
        method: "PUT",
      });
      this.beep = {
        ...this.beep,
        liked: false,
        likeCount: this.beep.likeCount - 1,
      };
    } else {
      await fetch(`/api/like/${this.beep.id}`, {
        method: "PUT",
      });
      this.beep = {
        ...this.beep,
        liked: true,
        likeCount: this.beep.likeCount + 1,
      };
    }
  }

  render() {
    return html` 
    <div class="beep-box">
    <div class="beep">
      <div class="beep-header">
        <img
          src="${this.beep.authorPicture}"
          alt="Profile picture of ${this.beep.authorName}"
          class="author-profile-picture"
        />
        <div>
          <a class="author" href="/user/${this.beep.authorName}">
            ${this.beep.authorName}
          </a>
          <span class="created-at">
            &nbsp;- ${new Date(this.beep.createdAt).toLocaleString()} -&nbsp;
          </span>
          <!-- Like button -->
          <button @click=${this.handleLike} class="like-button"> Like </button>
          <!-- Like count -->
          <span class="like-count ${this.beep.liked ? 'liked-count' : ''}">${this.beep.likeCount} &#9829;</span>
        </div>
      </div>
      <div>${this.beep.content}</div>
    </div>
    </div>`;
  }

  static styles = [
    BeeperBase.styles,
    css`
      .beep-box {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 12px;
        margin-bottom: 16px;
      }
      
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

      .like-button {
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 4px;
        cursor: pointer;
        padding: 4px 8px;
        margin-top: 8px;
      }

      .like-count {
        margin-left: 8px;
        font-size: 14px;
      }

      .liked-count {
        margin-left: 8px;
        font-size: 14px;
        color: red;
      }

      }
    `,
  ];
}

customElements.define("beep-view", BeepView);
