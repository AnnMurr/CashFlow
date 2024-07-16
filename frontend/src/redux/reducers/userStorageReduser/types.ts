export interface CategoriesType {
    name: string;
    icon: string;
}

export type CategoryKeys = "categoriesExpenses" | "categoriesIncome";
export type TransactionKeys = "expenses" | "income";
export type StorageDataKeys = CategoryKeys | TransactionKeys;
export interface Transaction {
    type: TransactionKeys;
    category: string;
    icon: string;
    date: Date;
    sum: number;
    uid: string;
}
export interface StorageDataType {
    categoriesExpenses: Array<CategoriesType>;
    categoriesIncome: Array<CategoriesType>;
    expenses: Array<Transaction>;
    income: Array<Transaction>;
}
export interface UserStorageDataType {
    data: StorageDataType;
    id: string;
    uid: string;
}
export interface TypesOfCategoriesType {
    expenses: Array<CategoriesType>;
    income: Array<CategoriesType>;
}
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
export interface StatisticalDataType {
    days: Array<string>;
    data: ItemsType;
}
export interface RootState {
    storage: {
        storageData: UserStorageDataType | null;
        typesOfCategories: TypesOfCategoriesType | null;
        transactions: Array<Transaction> | null;
        statisticalData: StatisticalDataType | null;
        isEditingData: boolean;
    };
}