import { css, html } from "lit";
import { BeeperBase } from "../../component/beeper-base.js";
import "../../component/beeper-header.js";
import "../../component/profile-list.js";
import "../../component/beep-list-search.js";

class SearchPage extends BeeperBase {
    static properties = {
        userInfo: {
            state: true,
        },
        isSelf: {
            state: true,
        },
        searchResult:{
            state: true,
        },
        searchType: {
            state: true,
        }
    };


    constructor() {
        super();
        this.userInfo = null;
        this.isSelf = true;
        this.searchResult = null;
        this.searchType = null;
    }


    async connectedCallback() {
        super.connectedCallback();
        const response = await fetch("/api/home");
    }

    async handleSearch(event) {
        if (event.code === "Enter" && !event.getModifierState("Shift")) {
            const textarea = event.target;
            let content = textarea.value;
            content = content.slice(0, content.length - 1);
            if (content[0] === "@"){ 
                this.searchType = "user";
                content = content.slice(1, content.length - 1);
                const response = await fetch(`/api/search/user/${content}`);
                this.searchResult = await response.json();
            } else if (content[0] === "#"){
// on cherche un hashtag

            } else {
// on chervhe un beep
                this.searchType = "beep";
                const response = await fetch(`/api/search/beep/${content}`);
                this.searchResult = await response.json();
            }
            textarea.value = "";
        }
    }

    render() {
        if (this.searchType === "user") {
            this.searchType === null;
            return html` 
                <beeper-header></beeper-header>
                <h1>Nouvelle recherche </h1>
                <textarea placeholder="Nouvelle recherche" @keyup=${this.handleSearch}></textarea>
                <search-list
                profileList=${JSON.stringify(
                        this.searchResult === null ? [] : this.searchResult
                    )}
                ></search-list>`}
        if (this.searchType === "beep") {
            this.searchType === null;
            return html` 
                <beeper-header></beeper-header>
                <h1>Nouvelle recherche </h1>
                <textarea placeholder="Nouvelle recherche" @keyup=${this.handleSearch}></textarea>
                <beep-list-search
                beepList=${JSON.stringify(
                        this.searchResult === null ? [] : this.searchResult
                    )}
                ></beep-list-search>`}
        if (this.searchType === null){
            return html` 
                <beeper-header></beeper-header>
                <h1>Nouvelle recherche </h1>
                <textarea placeholder="Nouvelle recherche" @keyup=${this.handleSearch}></textarea>
            `
        }
    }

    static styles = [
        BeeperBase.styles,
        css`
        .viewed-user-profile-picture {
            height: 80px;
            width: 80px;
            border-radius: 50%;
            margin-right: 12px;
        }
        textarea {
            width: 100%;
            height: 64px;
            margin: 10px 0 20px 0;
        }
        `,
    ];

}

customElements.define("search-page", SearchPage);