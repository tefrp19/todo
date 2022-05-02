import fetchparams from './app.js';

export const getGroups = async () => {
    return await fetchparams('/groups', 'get')
}

/**
 * 
 * @param {string} name
 * @returns 
 */
export const addGroupApi = async (name) => {
    return await fetchparams('/groups', 'post', { name })
}

/**
 * 
 * @param {Object} params
 * @param {number} params.id
 * @param {string} params.name
 * @returns 
 */
export const modifyGroup = async (params) => {
    return await fetchparams(`/groups/${params.id}`, 'put', params)
}

/**
 * 
 * @param {number} id
 * @returns 
 */
export const deleteGroup = async (id) => {
    return await fetchparams(`/groups/${id}`, 'delete')
}

