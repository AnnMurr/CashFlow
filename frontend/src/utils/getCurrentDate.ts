export const getCurrentDate = () => {
    const newData = new Date();

    const day = newData.getDate().toString().padStart(2, '0');
    const month = (newData.getMonth() + 1).toString().padStart(2, '0');
    const year = newData.getFullYear();
    const hours = newData.getHours().toString().padStart(2, '0');
    const minutes = newData.getMinutes().toString().padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
}