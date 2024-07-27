import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserStorageDataType } from "./types";
import { ICONS_EXPENSES_COLLECTION } from "../../../consts/images";

const initialstate = {
    storageData: null,
    currency: null,
    typesOfCategories: null,
    transactions: null,
    statisticalData: null,
    isEditingData: true,
    chosenFilter: null,
    chosenCategoryStatistic: null,
}

export const storageSlice = createSlice({
    name: 'storage',
    initialState: initialstate,
    reducers: {
        setUserDataToReduxStore: (state, action) => {
            state.storageData = action.payload;
            state.currency = action.payload.settings.currency;
        },
        setCategoriesTypes: (state, action) => {
            state.typesOfCategories = action.payload;
        },
        setTransactions: (state, action) => {
            state.transactions = action.payload;
        },
        setStatisticalData: (state, action) => {
            state.statisticalData = action.payload;
        },
        setIsEditingData: (state, action) => {
            state.isEditingData = action.payload;
        },
        setChosenFilter: (state, action) => {
            state.chosenFilter = action.payload;
        },
        setChosenCategoryStatistic: (state, action) => {
            state.chosenCategoryStatistic = action.payload;
        }
    }
});

export const createUserStore = createAsyncThunk<UserStorageDataType, string>(
    "data/createUserStore",
    async (userToken, { dispatch, rejectWithValue }) => {
        try {
            const response = await fetch("https://662be069de35f91de159c3b9.mockapi.io/usersStorage", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    uid: userToken,
                    settings: {
                        currency: "USD",
                        name: "United States dollar",
                        symbol: "$"
                    },
                    data: {
                        categoriesExpenses: [
                            { name: "food", icon: ICONS_EXPENSES_COLLECTION[0] },
                            { name: "transport", icon: ICONS_EXPENSES_COLLECTION[1] },
                            { name: "house", icon: ICONS_EXPENSES_COLLECTION[2] },
                        ],
                        categoriesIncome: [{ name: "work", icon: ICONS_EXPENSES_COLLECTION[5] }],
                        expenses: [],
                        income: [],
                    }
                })
            });

            if (!response.ok) throw new Error("Failed to create user storage");

            const data = await response.json();
            return data;

        } catch (error) {
            error instanceof Error && rejectWithValue(error.message);
        }
    }
)

export const getDataFromUserStore = createAsyncThunk<UserStorageDataType, string>(
    "data/getDataFromUserStore",
    async (userToken, { dispatch, rejectWithValue }) => {
        try {
            const response = await fetch("https://662be069de35f91de159c3b9.mockapi.io/usersStorage");
            const data = await response.json();
            const dataFiltered = data.find((item: UserStorageDataType) => item.uid === userToken);

            if (dataFiltered) {
                console.log("dataFiltered", dataFiltered)
                dispatch(setUserDataToReduxStore(dataFiltered));
                dispatch(setCategoriesTypes({ expenses: [...dataFiltered.data.categoriesExpenses], income: [...dataFiltered.data.categoriesIncome] }));
                dispatch(setTransactions([...dataFiltered.data.expenses, ...dataFiltered.data.income]));

                return dataFiltered;
            }
        } catch (error) {
            error instanceof Error && rejectWithValue(error.message);
        }
    }
);

export const changeUserData = createAsyncThunk<UserStorageDataType, { userToken: string, updatedData: UserStorageDataType }>(
    "data/changeUserData",
    async ({ userToken, updatedData }, { dispatch, rejectWithValue }) => {
        try {
            const userData = (await dispatch(getDataFromUserStore(userToken))).payload as UserStorageDataType;

            if (!userData) throw new Error("User data not found in store");

            if (userData) {
                const response = await fetch(`https://662be069de35f91de159c3b9.mockapi.io/usersStorage/${userData.id}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedData)
                })

                if (!response.ok) throw new Error("Failed to update user's data");

                const dataUpdated = await response.json();
                dispatch(setUserDataToReduxStore(dataUpdated));
                return dataUpdated;
            }
        } catch (error) {
            error instanceof Error && rejectWithValue(error.message);
        }
    }
)

export const deleteUserStore = createAsyncThunk<string, string>(
    "data/deleteUserStore",
    async (userToken, { dispatch, rejectWithValue }) => {
        try {
            const userData = (await dispatch(getDataFromUserStore(userToken))).payload as UserStorageDataType;

            if (!userData) throw new Error("User data not found in store");

            const response = await fetch(`https://662be069de35f91de159c3b9.mockapi.io/usersStorage/${userData.id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },

            });

            if (!response.ok) throw new Error("Failed to delete user's data from store");

            const data = await response.json();
            return data;

        } catch (error) {
            error instanceof Error && rejectWithValue(error.message);
        }
    }
)

export const userStorageReducer = storageSlice.reducer;
export const { setUserDataToReduxStore, setCategoriesTypes, setTransactions, setStatisticalData, setIsEditingData, setChosenFilter, setChosenCategoryStatistic } = storageSlice.actions;