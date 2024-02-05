import { LitElement, css, html } from "lit";
import { BeeperBase } from "./beeper-base.js";

export class CommentView extends BeeperBase {
  static properties = {
    comment: {
      type: Object,
    },
  };

  constructor() {
    super();
  }

  render() {
    return html`
      <div class="comment">
        <div class="comment-header">
          <img
            src="${this.comment.authorPicture}"
            alt="Profile picture of ${this.comment.authorName}"
            class="author-profile-picture"
          />
          <div>
            <a class="author" href="/user/${this.comment.authorName}">
              ${this.comment.authorName}
            </a>
            <span class="created-at">
              &nbsp;- ${new Date(this.comment.createdAt).toLocaleString()} -&nbsp;
            </span>
          </div>
        </div>
        <div class="comment-content">${this.comment.content}</div>
      </div>
    `;
  }

  static styles = [
    BeeperBase.styles,
    css`
      .comment {
        margin-bottom: 12px;
      }

      .comment-header {
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

      .comment-content {
        margin-left: 30px; /* Adjust as needed */
      }
    `,
  ];
}

customElements.define("comment-view", CommentView);


