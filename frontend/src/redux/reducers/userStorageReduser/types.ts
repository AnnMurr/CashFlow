export interface CategoriesType {
    name: string;
    icon: string;
}

export interface Transaction {
    type: 'expenses' | 'income',
    category: string;
    icon: string;
    date: string;
    sum: number;
    uid: string;
}

export type StorageDataKeys = "categoriesExpenses" | "categoriesIncome" | "expenses" | "income";

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

export interface RootState {
    storage: {
        storageData: UserStorageDataType | null;
        typesOfCategories: TypesOfCategoriesType | null;
        transactions: Array<Transaction> | null;
    };
}