/**
 * 
 * @param {Date} utc eg:2022-04-07T16:00:00.000Z
 * @returns {string} eg:2022-4-8
 */
module.exports=utc=>new Date(utc).toLocaleDateString().replace(/\//g,'-')