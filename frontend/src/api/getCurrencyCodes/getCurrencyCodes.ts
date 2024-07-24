export const getCurrency = async () => {
    return fetch("https://v6.exchangerate-api.com/v6/ce47d876b52be31e470d7757/codes")
            .then(response => response.json())
            .then(data => data)
            .catch(error => console.error(error));
}