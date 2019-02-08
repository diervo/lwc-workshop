import { LightningElement } from "lwc";

export default class Foo extends LightningElement {

    handleLanguageChange(event){ 

        console.log(event.detail);

        // const ev = new CustomEvent('languagechange', {
        //     detail: event.target.dataset.key,
        //     composed: true,
        //     bubbles: true
        // });

        // this.dispatchEvent(ev);
    }

}
