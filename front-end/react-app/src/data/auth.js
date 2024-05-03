import { API_HOST } from '../config/index';

export async function manualRegister(data) {
    try {
        const response = await fetch(`${API_HOST}/signup`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        });
        return { status: response.status, data: await response.json()}
    } catch (error) {
        console.log(error);
        return;
    }
}

export async function manualLogin(data) {
    try {
        const response = await fetch(`${API_HOST}/login`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        });
        return { status: response.status, data: await response.json()}
    } catch (error) {
        console.log(error);
        return;
    }
}

export async function refreshToken(data) {
    try {
        const response = await fetch(`${API_HOST}/login`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        });
        return { status: response.status, data: await response.json()}
    } catch (error) {
        console.log(error);
        return;
    }
}

export async function APISignup(credentials) {
    try {
        const response = await fetch(`${API_HOST}/signup`, 
        {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {'Content-Type': 'application/json'}
        });
        return { status: response.status, data: await response.json()}
    } catch (error) {
        console.log(error);
        return;
    }
}

export async function APILogin(email) {
    try {
        return await fetch(`${API_HOST}/login`, 
        {
            method: 'POST',
            body: JSON.stringify(email),
            headers: {'Content-Type': 'application/json'}
        });
    } catch (error) {
        console.log(error);
        return;
    }
}

export async function restoreAccount(data) {
    try {
        const response = await fetch(`${API_HOST}/accounts/recover`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {'Content-Type': 'application/json'}
        });
        return { status: response.status, data: await response.json() }
    } catch (error) {
        console.log(error);
        return;
    }
}

export async function APIdeleteAccount(userId) {
    try {
        const response = await fetch(`${API_HOST}/accounts/remove/${userId}`, {
            method: 'DELETE'
        });
        return await response.json();
    } catch (error) {
        console.log(error);
        return;
    }
}