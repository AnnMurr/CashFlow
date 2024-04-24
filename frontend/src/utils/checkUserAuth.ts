import { getDataFromLocalStorage } from "../storage/localStorage/localStorage";

export const getUserAuth = () => {
    const isToken = getDataFromLocalStorage("token");

    if (isToken && isToken !== undefined) {
        return true;
    } else {
        return false;
    }
}