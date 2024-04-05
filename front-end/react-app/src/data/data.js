import { API_HOST } from '../config/index';

export async function fetchData(resource) {
    try {
        const response = await fetch(`${API_HOST}/${resource}`);
        return await response.json();
    } catch (error) {
        console.log(error);
        return;
    }
}

export async function fetchMovementsData({ active, savingId, currencyId, page, limit }) {
    let url = `${API_HOST}/movements?`; //always shows existing movements (not deleted ones)
    if ( !active && !page && !limit && !savingId && !currencyId ) { 
        console.log("Must specify movements at least one filter parameter: active, page, limit, savingId currencyId");
        return; 
    }
    if ( active ) { url += `active=${active}&`; }
    if ( page && page > 0 ) { url += `page=${page}&`; }
    if ( limit && limit > 0 && limit <= 10 ) { url += `limit=${limit}&`; }
    if ( savingId ) { url += `savingId=${savingId}&`; }
    if ( currencyId ) { url += `currencyId=${currencyId}`; }
  
    return;
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log(error);
        return [];
    }
}

/*--------------------------------------------------------------------------------*/
export async function postData(resource, data) {
    try {
        const response = await fetch(`${API_HOST}/${resource}`, 
        {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        });
        return await response.json();
    } catch (error) {
        console.log(error);
        return;
    }
}


/*--------------------------------------------------------------------------------*/
export async function deleteData(resource, id) {
    try {
        const response = await fetch(`${API_HOST}/${resource}/${id}`, {
            method: 'DELETE'
        });
        return await response.json();
    } catch (error) {
        console.log(error);
        return;
    }
}


/*--------------------------------------------------------------------------------*/
export async function patchData(resource, id, data) {
    try {
        const response = await fetch(`${API_HOST}/${resource}/${id}`, 
        {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        });
        return await response.json();
    } catch (error) {
        console.log(error);
        return;
    }
}

