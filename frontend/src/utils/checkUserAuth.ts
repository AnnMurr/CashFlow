import { getDataFromLocalStorage } from "../storage/localStorage/localStorage";

export const getUserAuth = (): boolean => {
    const isToken = getDataFromLocalStorage("token");
    
    return isToken !== undefined;
}