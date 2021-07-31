const btnHamburger = document.querySelector('#btnHamburger');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const fadeElems = document.querySelectorAll('.has-fade');
const body = document.querySelector('body');

// schedule
const btnSchedules = document.querySelectorAll('.schedule__links > a');
const scheduleMWF = document.querySelector('#schedule-mwf');
const scheduleTueThur = document.querySelector('#schedule-tuethur');
const scheduleSat = document.querySelector('#schedule-sat');
const scheduleHeader = document.querySelector('#schedule-content-header');

btnSchedules.forEach(btn => {
    btn.addEventListener('click', function() {
        toggleSchedule(btn.id);
    });
})

function enableMwf() {

    scheduleMWF.classList.add('fade-in');
    scheduleMWF.classList.remove('fade-out');
    scheduleTueThur.classList.add('fade-out');
    scheduleSat.classList.add('fade-out');
    
    scheduleMWF.classList.remove('absolute');
    scheduleMWF.classList.add('relative');
    
    scheduleTueThur.classList.add('absolute');
    scheduleSat.classList.add('absolute');

   
}

function enableTueThur() {
    scheduleMWF.classList.add('fade-out');
    scheduleTueThur.classList.remove('fade-out');
    scheduleTueThur.classList.add('fade-in');
    scheduleSat.classList.add('fade-out');

    scheduleMWF.classList.add('absolute');
    scheduleTueThur.classList.remove('absolute');
    scheduleTueThur.classList.add('relative');
    scheduleSat.classList.add('absolute');

  
}

function enableSat() {
    scheduleMWF.classList.add('fade-out');
    scheduleTueThur.classList.add('fade-out');
    scheduleSat.classList.add('fade-in');
    scheduleSat.classList.remove('fade-out');

    scheduleMWF.classList.add('absolute');
    scheduleTueThur.classList.add('absolute');
    scheduleSat.classList.add('relative');
    scheduleSat.classList.remove('absolute');


}

function hideSchedule() {
    scheduleTueThur.classList.add('fade-out');
    scheduleSat.classList.add('fade-out');
}

function setScheduleHeader(day) {
    scheduleHeader.innerHTML = day;
}

function toggleSchedule(btnId) {
    const mwf = ['schedule-btn-mon', 'schedule-btn-wed', 'schedule-btn-fri'];
    const tuethur = ['schedule-btn-tue', 'schedule-btn-thur'];
    const sat = ['schedule-btn-sat'];
    switch(btnId) {
        case 'schedule-btn-mon':
            setScheduleHeader('Monday');
            enableMwf();
            break; 
        case 'schedule-btn-tue':
            setScheduleHeader('Tuesday');
            enableTueThur();
            break; 
        case 'schedule-btn-wed':
            setScheduleHeader('Wednesday');
            enableMwf();
            break; 
        case 'schedule-btn-thur':
            setScheduleHeader('Thursday');
            enableTueThur();
            break; 
        case 'schedule-btn-fri':
            setScheduleHeader('Friday');
            enableMwf();
            break; 
        case 'schedule-btn-sat':
            setScheduleHeader('Saturday');
            enableSat();
            break; 
    }
}

btnHamburger.addEventListener('click', function() {

    if(header.classList.contains('open')) {      
        // close menu
        body.classList.remove('noscroll');
        header.classList.remove('open');
        
        fadeElems.forEach(elem => {
            elem.classList.remove('fade-in');
            elem.classList.add('fade-out')
        });
    }  else { 
        // open menu
        body.classList.add('noscroll');
        header.classList.add('open');

        fadeElems.forEach(elem => {
            elem.classList.add('fade-in');
            elem.classList.remove('fade-out')
        });
    }
});