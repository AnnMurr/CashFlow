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
export interface RootState {
    storage: {
        storageData: UserStorageDataType | null;
        typesOfCategories: TypesOfCategoriesType | null;
        transactions: Array<Transaction> | null;
    };
}