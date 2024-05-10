const CC = require('currency-converter-lt');

let currencyConverter = new CC();

let ratesCacheOptions = {
    isRatesCaching: true, // Set this boolean to true to implement rate caching
    ratesCacheDuration: 3600 // Set this to a positive number to set the number of seconds you want the rates to be cached. Defaults to 3600 seconds (1 hour)
}

currencyConverter = currencyConverter.setupRatesCache(ratesCacheOptions);

export const CURRENCY_CODES = currencyConverter.currencyCode;

export const CURRENCY_NAMES = currencyConverter.currencies; //Json { "CODE": "Currency Name"}

export type ConverterReturnType = {
    status: number;
    message: string;
    conversionAmount?: number;
}

export async function convert(amount: number, currencyCodeFrom: string, currencyCodeTo: string)
    : Promise<ConverterReturnType> {
    if ( CURRENCY_NAMES[currencyCodeFrom] === CURRENCY_NAMES[currencyCodeTo] ) {
        return {status: 400, message: `Currency codes from/to are equal`};
    }
    if ( ! CURRENCY_NAMES[currencyCodeFrom] ) {
        return {status: 400, message: `Invalid currency code from ${currencyCodeFrom}`};
    } 
    if ( ! CURRENCY_NAMES[currencyCodeTo] ) {
        return {status: 400, message:`Invalid currency code to ${currencyCodeTo}`};
    }
    if ( amount <= 0 ) {
        return {status: 400, message:`Invalid amount ${amount}. Amount must be greater than 0`};
    }
    try {
        const result: number =  await currencyConverter.from( currencyCodeFrom ).to( currencyCodeTo ).amount( amount ).convert();
        return {status: 200, message: 'Succefull conversion', conversionAmount: result};
    } catch (error) {
        console.log(error);
        return {status: 500, message:`Internal error`};
    }
};
