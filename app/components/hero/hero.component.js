const heroTemplate = document.createElement('template');

heroTemplate.innerHTML = `
<link rel="stylesheet" type="text/css" href="app/scss/style.css">
<section class="hero">
    <div class="hero__image container container--pall flex-ai-c"></div>
    <div class="hero__text container container--pall">
        <h1>Carlson Gracie Brazilian Jiu Jitsu South Bay</h1>
        <p>Learn the techniques and principles that make Brazilian jiu-jitsu the most efficient and effective fighting art
            in the world. Classes are available multiple times a day, throughout the week, so you can easily fit jiu jitsu
            training into your schedule.</p>
        <div class="hero__cta">
            <button type="button" class="hero__cta__button">Sign up</button>
        </div>
    </div>
</section>
`

class Hero extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(heroTemplate.content.cloneNode(true));
    }

    // lifecycle hook when component is loaded
    connectedCallback() {
       
    }

    // lifecycle hook when component is unloaded
    disconnectedCallback() {
        
    }
}

window.customElements.define('cgsb-hero', Hero);