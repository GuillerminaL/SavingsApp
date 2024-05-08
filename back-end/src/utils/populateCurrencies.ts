import Currency from "../models/currency";
import { CURRENCY_CODES, CURRENCY_NAMES } from "./converter";

/**
 * Populates Currency Collection according to the currency converter data (codes and names)
 * Obs: - Asumes that collection exists (since it is automatically created for mongoose)
 *      - Collection must be empty, or action is rejected
 */
export default async function() {
        try {
                const docsCount = await Currency.countDocuments();
                if ( docsCount > 0 ) {
                        console.log(`Refused Currencies collection population: collection not empty (contains ${docsCount} docs)`);
                        return;
                }
   
                const currencies = [];
                for (let i = 0; i < CURRENCY_CODES.length; i++) {
                        const code = CURRENCY_CODES[i];
                        const name = CURRENCY_NAMES[code];
                        currencies.push({ code, name });
                }
                const result = await Currency.insertMany(currencies, {ordered: false});
                if ( ! result || result.length < currencies.length ) {
                        console.log(`Error while populating currencies collection...`);
                        if ( result ) {
                                console.log(`Currency codes: ${CURRENCY_CODES.length}, Loaded docs: ${result.length}`);
                        }  
                } else {
                        console.log(`Currencies collection has been successfully populated (Loaded docs: ${result.length}, Currency codes: ${CURRENCY_CODES.length})`); 
                }
        } catch (error) {
                console.log(error);
        }
}