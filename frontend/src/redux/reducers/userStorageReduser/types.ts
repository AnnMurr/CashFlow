import { CurrencyCode } from "../../../utils/getFormatCurrency";

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
    settings:{
        currency: CurrencyCode,
    }
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
        currency: CurrencyCode | null;
        typesOfCategories: TypesOfCategoriesType | null;
        transactions: Array<Transaction> | null;
        statisticalData: StatisticalDataType | null;
        isEditingData: boolean;
        chosenFilter: {isFilter: boolean, type: string, date: string, data: Array<ItemType>} | null;
        chosenCategoryStatistic: Array<ItemType> | null;
    };
}