import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "./redux.state";

export const deleteUserData = createAsyncThunk(
    'delete/deleteUserData',
    async ({ _id }: { _id: string }) => {
        try {
            const response = await axiosInstance.post('/api/delete?type=users', { _id });
            return response.data;
        } catch (error) {
            throw new Error('Error deleting user data');
        }
    }
);

// Define async thunk to delete student data
export const deleteStudentData = createAsyncThunk(
    'delete/deleteStudentData',
    async ({ _id }: { _id: string }) => {
        try {
            const response = await axiosInstance.post('/api/delete?type=student', { _id });
            return response.data;
        } catch (error) {
            throw new Error('Error deleting student data');
        }
    }
);