import { CheckUserDataByEmailType, CheckUserDataType, GetUserDataType, SetUserDataType, UpdateUserDataType } from "./authApiTypes";

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

export const checkUserData: CheckUserDataType = (data) => {
    return fetch("http://localhost:5050/check-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userData: data })
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

export const checkUserDataByEmail: CheckUserDataByEmailType = (email) => {
    return fetch("http://localhost:5050/check-data-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userData: email })
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

export const getUserDataById: GetUserDataType = (id) => {
    return fetch("http://localhost:5050/get-data-id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id })
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

export const updateUserData: UpdateUserDataType = (token, changedData) => {
    return fetch("http://localhost:5050/change-data", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: token,
            newData: changedData
        })
    })
        .then(response => {
            if (!response.ok) {
                console.error("failed to update user data");
            }

            return response.text();
        })
        .catch(error => {
            throw new Error(error);
        })
}

