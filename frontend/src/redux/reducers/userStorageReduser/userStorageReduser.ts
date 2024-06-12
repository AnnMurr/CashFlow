import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserStorageDataType {
    data: {
        categoriesExpenses: [
            {
                name: string,
                icon: string
            },
        ],
        categoriesIncome: [
            {
                name: string,
                icon: string
            },
        ],
        expenses: [
            {
                category: string,
                icon: string,
                date: string,
                sum: number,
                uid: string
            },
        ],
        income: [
            {
                category: string,
                icon: string,
                date: string,
                sum: number,
                uid: string
            },
        ]
    },
    id: string;
    uid: string;
}

const initialstate = {
    storageData: null
}

export const storageSlice = createSlice({
    name: 'storage',
    initialState: initialstate,
    reducers: {
        setUserDataToReduxStore: (state, action) => {
            console.log("apiresponse", action.payload);
            state.storageData = action.payload;
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
            dispatch(setUserDataToReduxStore(dataFiltered));

            return dataFiltered;
        } catch (error) {
            error instanceof Error && rejectWithValue(error.message);
        }
    }
);

export const userStorageReducer = storageSlice.reducer;
export const { setUserDataToReduxStore } = storageSlice.actions;