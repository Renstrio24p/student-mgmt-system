import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "./redux.state";

// Define async thunk to delete user data
export const deleteUserData = createAsyncThunk(
    'delete/deleteUserData',
    async ({ _id }: { _id: string }) => {
        try {
            const res = await axiosInstance.post('/api/delete?type=users', { _id });
            alert(`${res.data.name} deleted successfully`)
            window.location.reload()
            return res.data;
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
            const res = await axiosInstance.post('/api/delete?type=student', { _id });
            alert(` ${res.data.name} student deleted successfully`)
            window.location.reload()
            return res.data;
        } catch (error) {
            throw new Error('Error deleting student data');
        }
    }
);