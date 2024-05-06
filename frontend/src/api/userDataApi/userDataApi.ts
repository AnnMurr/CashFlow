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

export const getDataFromUserStore = (userToken: string) => {
    return fetch("https://662be069de35f91de159c3b9.mockapi.io/usersStorage")
        .then(response => response.json())
        .then(data => {
            return data.find((item: any) => item.uid === userToken);
        })
        .catch(error => {
            throw new Error(error);
        })
}

export const deleteUserStore = async (userToken: string) => {
    const userData = await getDataFromUserStore(userToken);

    if (!userData) throw new Error("User data not found in store");

    return fetch(`https://662be069de35f91de159c3b9.mockapi.io/usersStorage/${userData.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },

    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to delete user's data from store");
            }
            return response;
        })
        .catch(error => {
            throw new Error(error);
        })
}