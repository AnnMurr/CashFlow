export interface UserDataType {
    email: string;
    name?: string;
    password: string;
    repeatPassword?: string;
}

export type SetUserDataType = (data: UserDataType) => Promise<string>;
export type CheckUserDataType = (data: UserDataType) => Promise<string | boolean>;
export type CheckUserDataByEmailType = (data: UserDataType) => Promise<string>;
export type GetUserDataType = (data: string) => Promise<UserDataType>;