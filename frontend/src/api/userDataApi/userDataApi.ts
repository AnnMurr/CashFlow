export const createUserStore = (userToken: string) => {
    return fetch("https://662be069de35f91de159c3b9.mockapi.io/usersStorage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            uid: userToken,
            data: {}
        })
    })
        .then(response => response)
        .catch(error => {
            throw new Error(error);
        })
}