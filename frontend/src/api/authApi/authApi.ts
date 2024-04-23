import { SetUserDataType } from "./authApiTypes";

export const setUserData: SetUserDataType = (data) => {
    return fetch("http://localhost:5050/putdata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userData: data })
    })
        .then(response => {
            if (!response.ok) {
                console.error("Failed to put user data");
            }

            return response.text();
        })
        .catch(error => {
            throw new Error(error.message);
        })
}


export const checkUserData: SetUserDataType = (data) => {
    return fetch("http://localhost:5050/check-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({userData: data})
    })
        .then(response => {
            if (!response.ok) {
                console.error("Failed to check user data");
            }

            return response.text();
        })
        .catch(error => {
            throw new Error(error);
        })
}