 export const saveListTOLocalStorage = (tasks) => {
    localStorage.setItem('pinklist', JSON.stringify(tasks))
}