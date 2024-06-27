import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { UserStorageDataType } from "./types";

// storageData??
const initialstate = {
    storageData: null,
    typesOfCategories: null,
    transactions: null
}

export const storageSlice = createSlice({
    name: 'storage',
    initialState: initialstate,
    reducers: {
        setUserDataToReduxStore: (state, action) => {
            state.storageData = action.payload;
        },
        setCategoriesTypes: (state, action) => {
            state.typesOfCategories = action.payload;
        },
        setTransactions: (state, action) => {
            state.transactions = action.payload;
        }
    }
});

export const getDataFromUserStore = createAsyncThunk<UserStorageDataType, string>(
    "data/getDataFromUserStore",
    async (userToken, { dispatch, rejectWithValue }) => {
        try {
            const response = await fetch("https://662be069de35f91de159c3b9.mockapi.io/usersStorage");
            const data = await response.json();
            const dataFiltered = data.find((item: UserStorageDataType) => item.uid === userToken);

            if (dataFiltered) {
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

export const changeUserData = createAsyncThunk<any, { userToken: string, updatedData: any }>(
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

                if (!response.ok) {
                    throw new Error("Failed to update user's data")
                } else {
                    const dataUpdated = await response.json();
                    dispatch(setUserDataToReduxStore(dataUpdated));
                    return dataUpdated
                }
            }
        } catch (error) {
            error instanceof Error && rejectWithValue(error.message);
        }
    }
)

export const userStorageReducer = storageSlice.reducer;
export const { setUserDataToReduxStore, setCategoriesTypes, setTransactions } = storageSlice.actions;