import { getDataFromLocalStorage } from "../storage/localStorage/localStorage";

export const getUserAuth = () => {
    const isToken = getDataFromLocalStorage("token");
    
    return isToken !== undefined;
}