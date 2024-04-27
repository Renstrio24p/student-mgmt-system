import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "./redux.state";

export const updateUserData = createAsyncThunk(
    'update/updateUserData',
    async ({ _id, updateData }: { _id: string, updateData: any }) => {
        try {
            const response = await axiosInstance.post('/api/update?type=users', { _id, ...updateData });
            return response.data;
        } catch (error) {
            throw new Error('Error updating user data');
        }
    }
);

// Define async thunk to update student data
export const updateStudentData = createAsyncThunk(
    'update/updateStudentData',
    async ({ _id, updateData }: { _id: string, updateData: any }) => {
        try {
            const response = await axiosInstance.post('/api/update?type=student', { _id, ...updateData });
            return response.data;
        } catch (error) {
            throw new Error('Error updating student data');
        }
    }
);