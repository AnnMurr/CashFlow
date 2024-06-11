import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getDataFromLocalStorage } from "../../../storage/localStorage/localStorage";
import { CheckUserDataByEmailType, InitialStateType, SetUserDataType, UserDataType } from "./types";

const initialState: InitialStateType = {
    userData: null,
    loading: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDataToRedux: (state, action) => {
            state.userData = action.payload;
        },
        deleteUserDataFromRedux: (state) => {
            state.userData = null;
        }
    },
    extraReducers: (builder) =>
        builder
            .addCase(getUserDataById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserDataById.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(getUserDataById.rejected, (state) => {
                state.loading = false;
            })
});

export const getUserDataById = createAsyncThunk(
    "data/UserByToken",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const token = getDataFromLocalStorage("token");
            const response = await fetch("http://localhost:5050/get-data-id", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: token })
            });

            if (!response.ok) {
                throw new Error("Failed to check user data");
            }

            const userData = await response.json();
            dispatch(setUserDataToRedux(userData));
        } catch (error) {
            error instanceof Error && rejectWithValue(error.message);
        }
    }
);

export const updateUserData = createAsyncThunk<string | undefined, UserDataType>(
    "data/updateUserData",
    async (changedData, { dispatch, rejectWithValue }) => {
        try {
            const token = getDataFromLocalStorage("token");
            const response = await fetch("http://localhost:5050/change-data", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: token,
                    newData: changedData
                })
            })

            if (!response.ok) {
                throw new Error("failed to update user data");
            }

            const data = await response.text();
            dispatch(setUserDataToRedux(changedData));
            return data;
        } catch (error) {
            error instanceof Error && rejectWithValue(error.message);
        }
    }
)

export const deleteUserData = createAsyncThunk<{ status: number, message: string } | undefined, void>(
    "data/deleteUserData",
    async (_, { dispatch, rejectWithValue }) => {
        try {
            const token = getDataFromLocalStorage("token");
            const response = await fetch("http://localhost:5050/delete-data", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: token })
            })

            if (!response.ok) {
                throw new Error("Failed to delete user's data from database");
            }

            deleteUserDataFromRedux();
            const message = await response.text();
            return { status: response.status, message: message };
        } catch (error) {
            error instanceof Error && rejectWithValue(error.message);
            return undefined;
        }
    }
)

export const checkUserDataByEmail = createAsyncThunk<string | boolean, CheckUserDataByEmailType>(
    "data/checkUserDataByEmail",
    async ({ email, link }, { dispatch, rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5050/${link}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userData: email })
            })

            if (!response.ok) {
                throw new Error("Failed to check user data");
            }

            const data = await response.json();
            return data;
        } catch (error) {
            error instanceof Error && rejectWithValue(error.message);
        }
    }
)

export const checkUserData = createAsyncThunk<string | boolean, { email: string, password: string }>(
    "data/checkUserData",
    async (userData, { dispatch, rejectWithValue }) => {
        try {
            const response = await fetch("http://localhost:5050/users/check", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userData: userData })
            })

            if (!response.ok) {
                throw new Error("Failed to check user data");
            }

            const data = response.json();
            return data;
        } catch (error) {
            error instanceof Error && rejectWithValue(error.message);
        }
    }
)

export const setUserData = createAsyncThunk<string, SetUserDataType>(
    "data/setUserData",
    async ({ userData, link }, { dispatch, rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5050/${link}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userData: userData })
            })

            if (!response.ok) {
                throw new Error("Failed to put user data");
            }

            const data = response.json();
            return data;
        } catch (error) {
            error instanceof Error && rejectWithValue(error.message);
        }
    }
)

export const linkAccountToGoogle = createAsyncThunk<string, string>(
    "data/setUserData",
    async (id, { dispatch, rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5050/link-account-to-google`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: id })
            })

            if (!response.ok) {
                throw new Error("Failed to put user data");
            }

            const data = response.json();
            return data;
        } catch (error) {
            error instanceof Error && rejectWithValue(error.message);
        }
    }
)

export const checkGoogleAccount = createAsyncThunk<string, string>(
    "data/setUserData",
    async (id, { dispatch, rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:5050/check-google-account`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: id })
            })

            if (!response.ok) {
                throw new Error("Failed to put user data");
            }

            const data = response.json();
            return data;
        } catch (error) {
            error instanceof Error && rejectWithValue(error.message);
        }
    }
)

export const userDataReducer = userSlice.reducer;
export const { setUserDataToRedux, deleteUserDataFromRedux } = userSlice.actions;