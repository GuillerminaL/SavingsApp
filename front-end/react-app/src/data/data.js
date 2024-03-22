import { API_HOST } from '../config/index';

export async function fetchSavings() {
    try {
        const response = await fetch(`${API_HOST}/savings`);
        const data = await response.json();
        const savings = [];
        for (const key in data.savings) {
            const saving = {
                id: data.savings[key]._id,
                tagId: data.savings[key].tag._id,
                tagName: data.savings[key].tag.name,
                tagDescription: data.savings[key].tag.description,
                currencyId: data.savings[key].currency._id,
                currencyName: data.savings[key].currency.name,
                currencyImage: data.savings[key].currency.imageUrl,
                amount: data.savings[key].amount
            };
            savings.push(saving);
        }
        return savings;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function fetchCurrencies() {
    try {
        const response = await fetch(`${API_HOST}/currencies`);
        const data = await response.json();
        const currencies = [];
        for (const key in data.currencies) {
            const currency = {
                key: data.currencies[key]._id,
                id: data.currencies[key]._id,
                name: data.currencies[key].name,
                image: data.currencies[key].imageUrl
            };
            currencies.push(currency);
        }
        return currencies;
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function fetchTags() {
    try {
        const response = await fetch(`${API_HOST}/tags`);
        const data = await response.json(); 
        const tags = [];
        for (const key in data.tags) {
            const tag = {
                key: data.tags[key]._id,
                id: data.tags[key]._id,
                name: data.tags[key].name,
                description: data.tags[key].description
            }
            tags.push(tag);
        }
        return tags;
    } catch (error) {
        console.log(error);
        return [];
    }
}

/*---------------------------------  POST -----------------------------------------------*/
export async function addSaving(data) {
    try {
        const response = await fetch(`${API_HOST}/savings`, 
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        });
        const responseData = await response.json();
        const result = {
            status: response.status,
            response: responseData
        }
        return result;
    } catch (error) {
        console.log(error);
        return;
    }
}

