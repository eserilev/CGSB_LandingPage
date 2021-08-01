const signupModalTemplate = document.createElement('template');

signupModalTemplate.innerHTML = `
<link rel="stylesheet" type="text/css" href="app/scss/style.css">
<div class="overlay has-fade"></div>
<div class="modal has-fade">
    <div class="modal__exit">
        <span></span>
        <span></span>
    </div>
    <div class="modal__header">
        
        <p>Take the first step on your jiu jitsu journey</p>
    </div>
    <div class="modal__input flex flex-jc-c flex-ai-c">
        <input placeholder="Name" type="text" id="name"></input>
        <input placeholder="Email" type="text" id="email"></input>
    </div>
    <div class="modal__action flex-jc-c flex-ai-c">
        <button type="button" class="header__cta">Sign up</button>
        <img src="images/cgsblogo.png" alt="Carlson Gracie South Bay">
    </div>
</div>
`;

class SignupModal extends HTMLElement {
    // visible = false;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(signupModalTemplate.content.cloneNode(true));

        this.overlay = this.shadowRoot.querySelector(".overlay");
        this.modal = this.shadowRoot.querySelector(".modal");
        this.exitBtn = this.shadowRoot.querySelector(".modal__exit");

    }

    // lifecycle hook when component is loaded
    async connectedCallback() {
        //this.addOptions(options);
        this.toggleModal(true);
        /*
        this.shadowRoot.addEventListener('toggle-signup-modal', () => {
            console.log('dispatch event');
            this.visible = true;
        });*/

        
        this.exitBtn.addEventListener('click', () => {
            this.toggleModal(false);
        })
    }

    // lifecycle hook when component is unloaded
    disconnectedCallback() {
        this.shadowRoot.removeEventListener('toggle-signup-modal');
    }

    addOptions(options) {
        let dropdown = this.shadowRoot.querySelector("#classOptions")

        dropdown.innerHTML = options
            .map(o => {
                return `
                    <option>${o.name} ${o.start} - ${o.end}</option>
                `;
            }).join("");
    }

    toggleModal(value) {
        if (value) {
            this.overlay.classList.remove('fade-out');
            this.modal.classList.remove('fade-out');
            this.overlay.classList.add('fade-in');
            this.modal.classList.add('fade-in');
        } else {
            this.overlay.classList.remove('fade-in');
            this.modal.classList.remove('fade-in');
            this.overlay.classList.add('fade-out');
            this.modal.classList.add('fade-out');
        }
    }

    get visible() {
        return this.hasAttribute('visible');
    }
}

window.customElements.define('cgsb-signup-modal', SignupModal);