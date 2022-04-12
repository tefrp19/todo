import fetchparams from './common.js';

export const getGroups = async () => {
    return await fetchparams('/groups','get')
}

export const addGroup = async (params) => {
    return await fetchparams('/groups','post',params)
}

export const modifyGroup = async (params) => {
    return await fetchparams(`/groups/${params.groupId}`,'put',params)
}

export const deleteGroup = async (params) => {
    return await fetchparams(`/groups/${params.groupId}`,'delete')
}

