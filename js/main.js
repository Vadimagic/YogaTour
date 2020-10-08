window.addEventListener('DOMContentLoaded', () => {

    'use strict'

    // Табы
    let tab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    function hideTabContent(a) { // Скрывает элементы
        for (let i = a; i < tabContent.length; i++) {
            tabContent[i].classList.remove('show'); // Удаляем класс
            tabContent[i].classList.add('hide'); // Добавляем класс
        }
    }

    hideTabContent(1); // Скроем все, кроме первого

    function showTabContent(b) { // Показывает элемент
        if (tabContent[b].classList.contains('hide')) { // Проверяем на наличие класс
            tabContent[b].classList.remove('hide'); // Удаляем класс
            tabContent[b].classList.add('show'); // Добавляем класс
        }
    }

    info.addEventListener('click', (event) => { // Переключаем при клике элементы
        let target = event.target; // получаем элемент на который кликнули (Начиная с детей до родителя)
        if (target && target.classList.contains('info-header-tab')) {// Проверяем что тыкнули на кнопки
            for( let i = 0; i < tab.length; i++) { // Перебираем кнопки
                if (target == tab[i]) { // И ищем ту, на которую кликнули
                    hideTabContent(0); // Скрываем все элементы
                    showTabContent(i); // Показываем элемент 
                    break; // Выходим из цикла
                }
            }
        }
    });

    // Таймер 

    let deadline = "2019-12-15 22:30"; // Крайний день

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / 1000 / 60 / 60) );
        return {
            'total' : t,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock(id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            timeInterval = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(endtime);

            function addZero(num){
                if(num <= 9) {
                    return '0' + num;
                } else return num;
            };

            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);
            
            if (t.total <= 0) {
                clearInterval(timeInterval);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }

    }

    setClock('timer', deadline);


    // Modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');

    more.addEventListener('click', function() {
        overlay.style.display = 'block';
        this.classList.add('more-splash'); 
        document.body.style.overflow = 'hidden';
    });

    close.addEventListener('click', function() {
        overlay.style.display = "none";
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    // //Создаём класс с методом создающим div на странице
    // class options {
    //     constructor (height, width, bg, fontSize, textAlign) {
    //         this.height = height;
    //         this.width = width;
    //         this.bg = bg;
    //         this.fontSize = fontSize;
    //         this.textAlign = textAlign;
    //     }
    //     createDiv() {
    //         let elem = document.createElement('div');
    //         document.body.appendChild(elem);
    //         let param = `width: ${this.width}px;
    //         height: ${this.height}px;
    //         background: ${this.bg};
    //         font-size: ${this.fontSize}px;
    //         text-align: ${this.textAlign};`
    //         elem.style.cssText = param;
    //     }
    // }

    // const styleDiv = new options(100, 200, 'red', 20, 'center');

    // styleDiv.createDiv();

    // Form

    let message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся!',
        failure: 'Что-то пошло не так...'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');

        statusMessage.classList.add('status');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(form);

        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        });
        let json = JSON.stringify(obj);

        request.send(json);

        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if(request.readyState === 4 && request.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

        for (let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    });

    // Slider

    let slideIndex = 1, // параметр текущего слайда
        // slideReplay = 3000,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = dotsWrap.querySelectorAll('.dot');

    showSlides(slideIndex);

    function showSlides(n) {

        if (n > slides.length) {
            slideIndex = 1;
        }

        if (n < 1) {
            slideIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');
        // for (let i = 0; i < slides.length; i++) {
        //     slides[i].style.display = 'none';
        // }
        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[slideIndex - 1].style.display = 'block';
        dots[slideIndex - 1].classList.add('dot-active');
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    prev.addEventListener('click', () => {
        plusSlides(-1);
    });
    next.addEventListener('click', () => {
        plusSlides(1);
    });

    // function slideInterval() {
    //     let slideTimeout = setTimeout(function replay() {
    //         plusSlides(1); 
    //         slideTimeout = setTimeout(replay, slideReplay);
    //         }, 
    //         slideReplay
    //     );
    // }

    // slideInterval();

    // dotsWrap.addEventListener('click', function(event) {
    //     for (let i = 1; i < dots.length + 1; i++) {
    //         if (event.target.classList.contains('dot') && event.target == dots[i-1]) {
    //             currentSlide(i);
    //             // clearTimeout(slideTimeout);
    //             // slideInterval();
    //         }
    //     }
    // });

    // Calc

    let peopleValue = document.querySelectorAll('.counter-block-input')[0],
        dayValue = document.querySelectorAll('.counter-block-input')[1],
        base = document.getElementById('select'),
        // options = base.querySelectorAll('option'), // Надо сделать чтобы переключение до посчётов влияло на будущий результат 
        totalValue = document.getElementById('total'),
        peopleSum = 0,
        daySum = 0,
        total = 0;

    totalValue.innerHTML = 0;

    peopleValue.addEventListener('change', function() {
        peopleSum = +this.value;
        total = peopleSum * daySum * 4000;
        if (dayValue.value == '') {
            totalValue.innerHtml = 10;
        } else {
            totalValue.innerHTML = total
        }
    });

    dayValue.addEventListener('change', function() {
        daySum = +this.value;
        total = peopleSum * daySum * 4000;
        if (peopleValue.value == '') {
            totalValue.innerHtml = 10;
        } else {
            totalValue.innerHTML = total;
        }
    });

    base.addEventListener('change',  function() { 
        if (peopleValue.value == '' || dayValue.value == '') {
            totalValue.innerHtml = 0;
        } else {
            let a = total;
            totalValue.innerHTML = a * this.options[this.selectedIndex].value;
        }
    });
});