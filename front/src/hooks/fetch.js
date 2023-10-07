const path = 'http://localhost:3333';

export const callbackend = async (url, method, obj={}) => {
    let init = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
    }
    if (method !== 'GET' && method !== 'HEAD') init = {...init, body: JSON.stringify(obj)}

    return fetch(path + url, init)
};