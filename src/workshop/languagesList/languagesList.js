import { LightningElement, api, track } from "lwc";

export default class languagesList extends LightningElement{
    @api
    languages = [{label: 'english', language: 'EN'}];

    @track langCount = 2;

    get languageLimited(){
        return  this.languages.slice(0, this.langCount);
    }

    limitUp(event) {
        this.langCount += 1;
    }

    limitDown(event) {
        this.langCount -= 1;
    }

    languageChange(event) {

        const ev = new CustomEvent('languagechange', {
            detail: event.target.dataset.key,
            composed: true,
            bubbles: true
        });

        this.dispatchEvent(ev);
    }
}