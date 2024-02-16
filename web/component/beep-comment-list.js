// import { LitElement, css, html } from "lit";
// import { BeeperBase } from "./beeper-base.js";
// import "./comment-view.js";

// export class BeepCommentList extends BeeperBase {
//   static properties = {
//     commentList: {
//       type: Array,
//     }
//   };

//   static styles = [BeeperBase.styles, css``];

//   constructor() {
//     super();
//     this.commentList = [];
//   }

//   updated(changedProperties) {
//     if (changedProperties.has('commentList')) {
//       // Ensure to call requestUpdate() whenever the beepCommentList property changes
//       this.requestUpdate();
//     }
//   }

//   render() {
//     //console.log("HERE Count " + this.commentList.length);
//     return html`
//       ${this.commentList.map(
//         (c) => html`<comment-view comment="${JSON.stringify(c)}"></comment-view>`
//       )}
//     `;
//   }
// }
// customElements.define("beep-comment-list", BeepCommentList);
