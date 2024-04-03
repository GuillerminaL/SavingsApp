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

export async function fetchMovementsData(savingId) {
    try {
        const response = await fetch(`${API_HOST}/movements?savingId=${savingId}`);
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
    console.log("editing" + resource + id + data);
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

