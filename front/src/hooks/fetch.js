const path = process.env.LinkAPI;

export const callbackend = async (url, method, obj={}) => {
    console.log(path)
    let init = {
        method: method,
        headers: { 'Content-Type': 'application/json' },
    }
    if (method !== 'GET' && method !== 'HEAD') init = {...init, body: JSON.stringify(obj)}
    return fetch(path + url, init)
};