export interface UserDataType {
    email: string;
    name?: string;
    password: string;
    repeatPassword?: string;
}

export type SetUserDataType = (data: UserDataType) => Promise<any>;
export type GetUserDataType = (data: string) => Promise<UserDataType>;