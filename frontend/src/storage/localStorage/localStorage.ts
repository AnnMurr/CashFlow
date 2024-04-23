export const setDataToLocalStorage = (name: string, data: string) => {
    localStorage.setItem(name, JSON.stringify(data));
}

export const getDataFromLocalStorage = (name: string) => {
    const dataFromLocalStorage: string | null = localStorage.getItem(name)
    if (dataFromLocalStorage) { return JSON.parse(dataFromLocalStorage) }
}