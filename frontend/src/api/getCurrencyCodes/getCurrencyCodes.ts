export const getCurrency = async () => {
    return fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(data => data)
        .catch(error => console.error(error));
}