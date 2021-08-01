const academyTemplate = document.createElement('template');

academyTemplate.innerHTML = `
<link rel="stylesheet" type="text/css" href="app/scss/style.css">
<section class="academy container container--pall">
    <div class="academy__header">
        <h1>The Academy</h1>
    </div>
    <div class="academy__review"></div>
</section>
`

class Academy extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(academyTemplate.content.cloneNode(true));
    }

    // lifecycle hook when component is loaded
    async connectedCallback() {
        let reviews = await this.loadReviews();
        let reviewList = this.shadowRoot.querySelector(".academy__review");
        reviewList.innerHTML = reviews.reviews
            .map(r => {
                return `
                <div class="academy__review__card  container--pall">
                    <div class="academy__review__image"></div>
                        <div class="academy__review__header">
                            <p>${r.name}</p>
                        </div>
                        <div class="academy__review__content">
                            <h1>
                            ${r.title}
                            </h1>
                            ${r.body}
                        </div>
                    </div>
                </div>
                `;
            }).join("");
    }

    async loadReviews() {
        return new Promise((resolve,reject)=> {
            var xhttp = new XMLHttpRequest();
            xhttp.overrideMimeType("application/json");
            xhttp.open('GET', '/app/components/academy/reviews.json', true);
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

window.customElements.define('cgsb-academy', Academy);