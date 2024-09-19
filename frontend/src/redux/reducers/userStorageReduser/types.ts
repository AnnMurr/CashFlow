import { ThemeType } from "../../../contexts/themeContext/types";

interface FilterOptions  { 
    isFilter: boolean;
    type: string;
    date: string;
    data: Array<ItemType>; 
}

type FilterOptionsType = FilterOptions | null;
export type CategoryKeys = "categoriesExpenses" | "categoriesIncome";
export type TransactionKeys = "expenses" | "income";
export type StorageDataKeys = CategoryKeys | TransactionKeys;

export interface CategoriesType {
    name: string;
    icon: string;
}

export interface Transaction {
    type: TransactionKeys;
    category: string;
    icon: string;
    date: Date;
    sum: number;
    uid: string;
}

export interface CategoryPlanning {
    name: string;
    sum: number;
}

export interface BudgetPlanning {
    period: string;
    categories: Array<CategoryPlanning>;
}

export interface StorageDataType {
    categoriesExpenses: Array<CategoriesType>;
    categoriesIncome: Array<CategoriesType>;
    expenses: Array<Transaction>;
    income: Array<Transaction>;
    planning: Array<BudgetPlanning>;
}

export interface UserStorageDataType {
    data: StorageDataType;
    id: string;
    uid: string;
    settings: {
        currency: Currency;
        theme: ThemeType;
        charts: {
            barChartColor: Array<string>,
            pieChartColor: Array<string>,
        }
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

interface Currency {
    code: string;
    name: string;
    symbol: string;
}

export interface RootState {
    storage: {
        storageData: UserStorageDataType | null;
        currency: Currency | null;
        typesOfCategories: TypesOfCategoriesType | null;
        transactions: Array<Transaction> | null;
        statisticalData: StatisticalDataType | null;
        isEditingData: boolean;
        chosenFilter: FilterOptionsType;
        chosenCategoryStatistic: Array<ItemType> | null;
    };
}