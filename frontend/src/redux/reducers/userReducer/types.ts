export interface UserDataType {
    name: string,
    email: string,
    password?: string,
}
export interface InitialStateType {
    userData: null | UserDataType;
    loading: boolean;
}
export interface SetUserDataType {
    link: string;
    userData: UserDataType;
}
export interface CheckUserDataByEmailType {
    email: string;
    link: string;
}

export interface UserDataType {
    email: string;
    name: string;
    password?: string;
    confirmPassword?: string;
}