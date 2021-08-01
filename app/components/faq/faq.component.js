const faqTemplate = document.createElement('template');

faqTemplate.innerHTML = `
<link rel="stylesheet" type="text/css" href="app/scss/style.css">
<section class="faq container container--pall">
    <div class="faq__header">
    <h1>FAQ</h1>
    </div>
    <div class="faq__content">
    </div>
</section>
`

class Faq extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(faqTemplate.content.cloneNode(true));
    }

    // lifecycle hook when component is loaded
    async connectedCallback() {
        let frequentlyAsked = await this.loadFaq();
        this._faqList = this.shadowRoot.querySelector(".faq__content");
        this._faqList.innerHTML = frequentlyAsked.faqs
            .map(f => {
                return `
                    <div class="faq__content__card  container--pall">
                        <div class="faq__question">
                            <h1>${f.question}</h1>
                        </div>
                        <div class="faq__answer">
                            ${f.answer}
                        </div>
                    </div>
                `;
            }).join("");
    }

    async loadFaq() {
        return new Promise((resolve,reject)=> {
            var xhttp = new XMLHttpRequest();
            xhttp.overrideMimeType("application/json");
            xhttp.open('GET', '/app/components/faq/faq.json', true);
            xhttp.onload = function () {
                if (xhttp.status == "200") {
                    resolve(JSON.parse(xhttp.response));
                } else {
                    reject();
                }
            };
            xhttp.send(null);
        });
    }
}

window.customElements.define('cgsb-faq', Faq);