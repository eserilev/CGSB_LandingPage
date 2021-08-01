const scheduleTemplate = document.createElement('template');

scheduleTemplate.innerHTML = `
<link rel="stylesheet" type="text/css" href="app/scss/style.css">
<section class="schedule">
    <div class="schedule__header flex flex-jc-c flex-ai-c">
        <h1>Schedule</h1>
        </div>
        <nav class="flex flex-jc-c flex-ai-c container container--px">
            <div class="schedule__links hide-for-desktop">
                <a id="schedule-btn-mon">Mon</a>
                <a id="schedule-btn-tue">Tue</a>
                <a id="schedule-btn-wed">Wed</a>
                <a id="schedule-btn-thur">Thur</a>
                <a id="schedule-btn-fri">Fri</a>
                <a id="schedule-btn-sat">Sat</a>
            </div>   
            <div class="schedule__links hide-for-mobile">
                <a id="schedule-btn-mon">Monday</a>
                <a id="schedule-btn-tue">Tuesday</a>
                <a id="schedule-btn-wed">Wednesday</a>
                <a id="schedule-btn-thur">Thursday</a>
                <a id="schedule-btn-fri">Friday</a>
                <a id="schedule-btn-sat">Saturday</a>
            </div>   
        </nav>
    <div class="schedule__card">
        <div class="schedule__card__header flex flex-jc-c flex-ai-c">      
            <h1 id="schedule-content-header"></h1>    
        </div>
        <div class="schedule__card__content container container--pall flex-jc-c flex-ai-c">        
        </div>
    </div>
</section>
`;

class Schedule extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(scheduleTemplate.content.cloneNode(true));
        this._scheduleList = this.shadowRoot.querySelector(".schedule__card__content");
        this.schedule = [];
    }

    // lifecycle hook when component is loaded
    async connectedCallback() {
        this.schedule = await this.loadSchedule();
        this.shadowRoot.querySelectorAll('.schedule__links > a').forEach(link => {
            link.addEventListener('click', () => {
                this.toggleSchedule(link.id);
            })
        });
    }

    // lifecycle hook when component is unloaded
    disconnectedCallback() {
        this.shadowRoot.querySelectorAll('.schedule__links > a').forEach(link => {
            link.removeEventListener('click');
        });
    }

    showSchedule(schedule) {
        console.log(schedule);
        this._scheduleList.innerHTML = schedule
            .map(s => {
                return `
                <div class="schedule__card__content__item">
                    <h1>${s.start} - ${s.end}</h1>
                    <p>${s.name}</p>
                </div>
                `
            }).join('');
        console.log(this._scheduleList.innerHTML);
    }

    async loadSchedule() {
        return new Promise((resolve,reject)=> {
            var xhttp = new XMLHttpRequest();
            xhttp.overrideMimeType("application/json");
            xhttp.open('GET', '/app/components/schedule/schedule.json', true);
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

    setScheduleHeader(day) {
        const scheduleHeader = this.shadowRoot.querySelector('#schedule-content-header');
        scheduleHeader.innerHTML = day;
    }

    toggleSchedule(btnId) {
        const mwf = ['schedule-btn-mon', 'schedule-btn-wed', 'schedule-btn-fri'];
        const tuethur = ['schedule-btn-tue', 'schedule-btn-thur'];
        const sat = ['schedule-btn-sat'];
        console.log(this.schedule);
        switch(btnId) {
            case 'schedule-btn-mon':
                this.setScheduleHeader('Monday');
                this.showSchedule(this.schedule['mondayWednesdayFriday']);
                break; 
            case 'schedule-btn-tue':
                this.setScheduleHeader('Tuesday');
                this.showSchedule(this.schedule['tuesdayThursday']);
                break; 
            case 'schedule-btn-wed':
                this.setScheduleHeader('Wednesday');
                this.showSchedule(this.schedule['mondayWednesdayFriday']);
                break; 
            case 'schedule-btn-thur':
                this.setScheduleHeader('Thursday');
                this.showSchedule(this.schedule['tuesdayThursday']);
                break; 
            case 'schedule-btn-fri':
                this.setScheduleHeader('Friday');
                this.showSchedule(this.schedule['mondayWednesdayFriday']);
                break; 
            case 'schedule-btn-sat':
                this.setScheduleHeader('Saturday');
                this.showSchedule(this.schedule['saturday']);
                break; 
        }
    }
    
}

window.customElements.define('cgsb-schedule', Schedule);