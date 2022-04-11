import fetchData from './common.js';

export const register = async (data) => {
    return await fetchData('/register', 'post', data);
}

export const login = async (data) => {
    return await fetchData('/login', 'post', data);
}

export const logout=async ()=>{
    return await fetchData('/logout','get')
}



