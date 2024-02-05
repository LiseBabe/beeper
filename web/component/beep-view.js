import { css, html } from "lit";
import { BeeperBase } from "./beeper-base.js";
import { CommentView } from "./comment-view.js";

export class BeepView extends BeeperBase {
  static properties = {
    beep: {
      type: Object,
    },
    comments: {
      state: true,
    },
  };

  constructor() {
    super();
    this.comments = [];
  }

  async connectedCallback() {
    super.connectedCallback();
    // Make an HTTP request to fetch the comments for the current beep
    try {
      const response = await fetch(`/api/comments/${this.beep.id}`);
      if (response.ok) {
        // If the request is successful, parse the JSON response and assign it to the comments property
        this.comments = await response.json();
        //console.log("Comments for " + this.beep.id +"Count " + this.comments.length);
      } else {
        console.error("Failed to fetch comments:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
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

  async fetchComments() {
    try {
      const response = await fetch(`/api/comments/${this.beep.id}`);
      if (response.ok) {
        this.comments = await response.json();
      } else {
        console.error("Failed to fetch comments:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  }

  async addComment(event) {
    if (event.type === "click" || (event.code === "Enter" && !event.getModifierState("Shift"))) {
      const textarea = event.target.tagName === "BUTTON" ? event.target.previousElementSibling : event.target;
  
      let content = textarea.value.trim();
  
      if (content !== "") {
        const response = await fetch(`/api/add-comment/${this.beep.id}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content,
          }),
        });
  
        const postedComment = await response.json();
        // console.log("new comment", postedComment);
        textarea.value = "";
  
        // Add the posted comment to the comment list
        this.comments = [...this.comments, postedComment];
        await this.fetchComments();
      }
    }
  }
  

  render() {
    // console.log("RENDER: Comments for " + this.beep.id +"Count " + this.comments.length);
    // this.comments.forEach(element => {
    //   console.log(element.content);
    // });
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
        <div class="comments-container">
          <!-- <beep-comment-list beepCommentList=${JSON.stringify(this.comments)}></beep-comment-list> -->
          ${this.comments ? this.comments.map(
            (comment) => html`<comment-view comment="${JSON.stringify(comment)}"></comment-view>`
          ) : ''}
          <!-- Add comment -->
          <div class="add-comment">
            <textarea @keyup=${this.addComment}></textarea>
            <button @click=${this.addComment} class="comment-button">Add Comment</button>
          </div>
        </div>
    </div>
    </div>`;
  }

  static styles = [
    BeeperBase.styles,
    css`
      .beep-box {
        border: 1px solid pink;
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

      .like-count {
        margin-left: 8px;
        font-size: 14px;
      }

      .liked-count {
        margin-left: 8px;
        font-size: 14px;
        color: red;
      }

      .comments-container {
        margin-top: 16px;
        padding-left: 24px;
      }

      .like-button,
      .comment-button {
        background-color: pink;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        padding: 4px 8px;
        margin-right: 8px; /* Add margin to separate the buttons */
      }

      }
    `,
  ];
}

customElements.define("beep-view", BeepView);
