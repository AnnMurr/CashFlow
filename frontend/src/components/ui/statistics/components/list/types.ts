export interface ItemType {
    category: string;
    date: Date;
    icon: string;
    sum: number;
    uid: string;
}

export interface LineProps {
    data: Array<ItemType>;
    setIsEditCategoryModalActive: (value: boolean) => void;
    setIsDeleteCategoryModalActive: (value: boolean) => void;
    setChoosedCategoryId: (value: string) => void;
}

export interface ItemsType {
    [key: string]: Array<ItemType>;
};