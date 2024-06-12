export interface ItemType {
    category: string;
    date: Date;
    icon: string;
    sum: number;
    uid: string;
}

export interface LineProps {
    data: Array<ItemType>;
}

export interface ItemsType {
    [key: string]: Array<ItemType>;
};