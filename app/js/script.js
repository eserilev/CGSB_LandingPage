const btnHamburger = document.querySelector('#btnHamburger');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const fadeElems = document.querySelectorAll('.has-fade');
const body = document.querySelector('body');


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