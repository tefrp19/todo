import fetchparams from './common.js';

export const getTasks=async (groupId)=>{
    return await fetchparams(`/groups/${groupId}/tasks`,'get')
}

export const addTask=async (params)=>{
    return await fetchparams(`/groups/${params.groupId}/tasks`,'post',params)
}

export const modifyTask=async (params)=>{
    return await fetchparams(`/groups/1/tasks/${params.taskId}`,'put',params)
}

export const deleteTask=async (taskId)=>{
    return await fetchparams(`/groups/1/tasks/${taskId}`,'delete')
}

export const getImportantTasks=async ()=>{
    return await fetchparams('/tasks/important','get')
}

export const getTodayTasks=async ()=>{
    return await fetchparams('/tasks/today','get')
    
}