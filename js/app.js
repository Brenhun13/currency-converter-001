const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const resultDiv = document.getElementById("result");
const rateInfo = document.getElementById("rateInfo");

let chart;

const currencies = [
    "AUD",
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "CAD",
    "NZD",
    "CHF",
    "SGD",
    "HKD"
];

function populateCurrencies() {

    currencies.forEach(currency => {

        fromCurrency.innerHTML +=
            `<option value="${currency}">
                ${currency}
            </option>`;

        toCurrency.innerHTML +=
            `<option value="${currency}">
                ${currency}
            </option>`;
    });

    fromCurrency.value = "USD";
    toCurrency.value = "AUD";
}

async function convertCurrency() {

    const amount = amountInput.value;

    const from = fromCurrency.value;
    const to = toCurrency.value;

    const url =
        `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`;

    const response = await fetch(url);

    const data = await response.json();

    const converted = data.rates[to];

    resultDiv.innerHTML =
        `${amount} ${from} = ${converted.toFixed(2)} ${to}`;

    const rateResponse =
        await fetch(
            `https://api.frankfurter.app/latest?from=${from}&to=${to}`
        );

    const rateData =
        await rateResponse.json();

    rateInfo.innerHTML =
        `1 ${from} = ${rateData.rates[to]} ${to}`;
}

document
    .getElementById("swapBtn")
    .addEventListener("click", () => {

        const temp = fromCurrency.value;

        fromCurrency.value =
            toCurrency.value;

        toCurrency.value =
            temp;

        convertCurrency();
    });

convertBtn.addEventListener(
    "click",
    convertCurrency
);

populateCurrencies();
convertCurrency();