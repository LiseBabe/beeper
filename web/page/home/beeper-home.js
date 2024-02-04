import { css, html } from "lit";
import { BeeperBase } from "../../component/beeper-base.js";
import "../../component/beeper-header.js";
import "../../component/beep-list.js";
import { getActiveUserProfile } from "../../util/active-user-profile.js";

class BeeperHome extends BeeperBase {
  static properties = {
    userName: {
      state: true,
    },
    beepList: {
      state: true,
    },
  };

  constructor() {
    super();
    this.beepList = [];
    this.userName = "";
  }

  async connectedCallback() {
    super.connectedCallback();
    const response = await fetch("/api/home");
    this.beepList = await response.json();
    // this.beepList.forEach((beep) => {
    //   console.log('Beep ID: ' + beep.id);
    //   this.fetchCommentsForBeep(beep);
    // });

    this.userName = (await getActiveUserProfile()).name;
  }

  // async fetchCommentsForBeep(beep){
  //   const responseComments = await fetch("/api/comments" + beep.id);
  //   const commentList = await responseComments.json();
  //   beep.comments = JSON.parse(commentList);
  // }

  async postBeep(event) {
    if (event.type === "click" || (event.code === "Enter" && !event.getModifierState("Shift"))) {
      const textarea = event.target.tagName === "BUTTON" ? event.target.previousElementSibling : event.target;
  
      let content = textarea.value.trim();
  
      if (content !== "") {
        const response = await fetch("/api/beep", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content,
          }),
        });
  
        const postedBeep = await response.json();
  
        textarea.value = "";
  
        this.beepList = [postedBeep, ...this.beepList];
      }
    }
  }

  render() { //ce qui va se mettre sur la page : puis html
    return html` <beeper-header></beeper-header> 
      <h1>Welcome ${this.userName}!</h1>
      <div class="compose-container">
        <textarea @keyup=${this.postBeep}></textarea>
        <button @click=${this.postBeep} class="post-button">Post</button>
      </div>
      <beep-list beepList=${JSON.stringify(this.beepList)}></beep-list>`;
  }

  static styles = [
    BeeperBase.styles,
    css`
      .compose-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }


      textarea {
        width: 100%;
        height: 64px;
        margin: 10px 0 20px 0;
      }
    
      .post-button {
        background-color: #007bff; /* Set button background color */
        color: #fff; /* Set button text color */
        border: none;
        border-radius: 4px;
        padding: 8px 16px;
        cursor: pointer;
      }
    `,
  ];
}

customElements.define("beeper-home", BeeperHome);
