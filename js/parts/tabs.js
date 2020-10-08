function tabs() {
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
}

module.exports = tabs;