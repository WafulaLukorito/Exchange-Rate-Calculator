// function calculate() {
//     fetch('items.json')
//         .then(response => response.json())
//         //.then(data => console.log(data));
//         .then(data => (document.body.innerHTML = data[1].text));
// }

// calculate();


const currencyEl_one = document.getElementById('currency-one');

const amountEl_one = document.getElementById('amount-one');

const currencyEl_two = document.getElementById('currency-two');

const amountEl_two = document.getElementById('amount-two');


const rateEl = document.getElementById('rate');

const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM

function calculate() {
    //console.log('Hello');
    const currency_one = currencyEl_one.value;
    const currency_two = currencyEl_two.value;

    //console.log(currency_one, currency_two);

    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`) // fetch data from the API
        .then(res => res.json()) // convert the data to json
        .then(data => {
            //console.log(data);
            const rate = data.rates[currency_two]; // get the rate from the data
            console.log(rate);

            rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`; // update the rate

            amountEl_two.value = (amountEl_one.value * rate).toFixed(2); // update the amount

        });
}

// Event listeners
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);

swap.addEventListener('click', () => {
    const temp = currencyEl_one.value;
    currencyEl_one.value = currencyEl_two.value;
    currencyEl_two.value = temp; // swap the currency
    calculate();
});

calculate();