export interface UserDataType {
    name: string,
    email: string,
    password: string,
}
export interface InitialStateType {
    userData: null | UserDataType;
    loading: boolean;
}