export interface UserDataType {
    email: string;
    name?: string;
    password: string;
    confirmPassword?: string;
}

export type SetUserDataType = (data: UserDataType) => Promise<string>;
export type CheckUserDataType = (data: UserDataType) => Promise<string | boolean>;
export type CheckUserDataByEmailType = (data: UserDataType) => Promise<string>;
export type GetUserDataType = (data: string) => Promise<UserDataType>;
export type UpdateUserDataType = (token: string, changedData: UserDataType ) => Promise<string>;