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

            return response.json();
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

            return response.json();
        })
        .catch(error => {
            throw new Error(error);
        })
}

export const checkUserDataByEmail: SetUserDataType = (data) => {
    return fetch("http://localhost:5050/check-data-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({userData: data})
    })
        .then(response => {
            if (!response.ok) {
                console.error("Failed to check user data");
            }

            return response.json();
        })
        .catch(error => {
            throw new Error(error);
        })
}

export const getDAta = () => {
    return fetch("http://localhost:5050/get-data-id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id: "662fb0784a6110e692f702a4"})
    })
        .then(response => {
            if (!response.ok) {
                console.error("Failed to check user data");
            }
            response.json();
            console.log(response)
        })
        .catch(error => {
            throw new Error(error);
        })
}