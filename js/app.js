const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const resultDiv = document.getElementById("result");
const rateInfo = document.getElementById("rateInfo");

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

// Populate dropdowns
function populateCurrencies() {

    currencies.forEach(currency => {

        fromCurrency.innerHTML +=
            `<option value="${currency}">${currency}</option>`;

        toCurrency.innerHTML +=
            `<option value="${currency}">${currency}</option>`;
    });

    fromCurrency.value = "USD";
    toCurrency.value = "AUD";
}

// Convert currencies
async function convertCurrency() {

    try {

        resultDiv.innerHTML = "Loading...";

        const amount = Number(amountInput.value);
        const from = fromCurrency.value;
        const to = toCurrency.value;

        const response = await fetch(
            `https://open.er-api.com/v6/latest/${from}`
        );

        if (!response.ok) {
            throw new Error("Failed to retrieve exchange rates");
        }

        const data = await response.json();

        console.log(data);

        const rate = data.rates[to];

        if (!rate) {
            throw new Error(`No exchange rate found for ${to}`);
        }

        const converted = amount * rate;

        resultDiv.innerHTML =
            `${amount.toLocaleString()} ${from} = ${converted.toLocaleString(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })} ${to}`;

        rateInfo.innerHTML =
            `1 ${from} = ${rate.toFixed(4)} ${to}`;

    } catch (error) {

        console.error(error);

        resultDiv.innerHTML =
            "Unable to retrieve exchange rates.";

        rateInfo.innerHTML = "";
    }
}

// Swap currencies
document.getElementById("swapBtn").addEventListener("click", () => {

    const temp = fromCurrency.value;

    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;

    convertCurrency();
});

// Convert button
convertBtn.addEventListener("click", convertCurrency);

// Auto convert when currency changes
fromCurrency.addEventListener("change", convertCurrency);
toCurrency.addEventListener("change", convertCurrency);

// Initialize page
populateCurrencies();
convertCurrency();
