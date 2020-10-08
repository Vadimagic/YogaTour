function calc() {
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
}

module.exports = calc;