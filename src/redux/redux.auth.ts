import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance, fetchUserData } from "./redux.state";
import axios from "axios";

interface LoginCredentials {
    email: string;
    password: string;
}

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (credentials: LoginCredentials, { rejectWithValue, dispatch }) => {
        try {
            const response = await axiosInstance.post('/api/login', credentials);
            await dispatch(fetchUserData());
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    return rejectWithValue(error.response.data);
                } else if (error.request) {
                    return rejectWithValue({ message: 'No response from server' });
                }
            }
            return rejectWithValue({ message: 'Request failed' });
        }
    }
);