const CC = require('currency-converter-lt');

let currencyConverter = new CC();

let ratesCacheOptions = {
    isRatesCaching: true, // Set this boolean to true to implement rate caching
    ratesCacheDuration: 3600 // Set this to a positive number to set the number of seconds you want the rates to be cached. Defaults to 3600 seconds (1 hour)
}

currencyConverter = currencyConverter.setupRatesCache(ratesCacheOptions);

export const CURRENCY_CODES = currencyConverter.currencyCode;

export const CURRENCY_NAMES = currencyConverter.currencies; //Json { "CODE": "Currency Name"}

export async function currencyConvertion(currencyCodeFrom: string, currencyCodeTo: string, amount: number): Promise<Number | String> {
    if ( ! CURRENCY_CODES.includes(currencyCodeFrom) ) {
        return `Invalid currency code ${currencyCodeFrom}`;
    } 
    if ( ! CURRENCY_CODES.includes(currencyCodeFrom) ) {
        return `Invalid currency code ${currencyCodeFrom}`;
    }
    if ( amount <= 0 ) {
        return `Invalid amount ${amount}. Amount must be greater than 0`;
    }
    try {
        const result: Number =  await currencyConverter.from( currencyCodeFrom ).to( currencyCodeTo ).amount( amount ).convert();
        return result;
    } catch (error) {
        console.log(error);
        return `Internal Error`;
    }

};
