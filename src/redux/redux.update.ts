import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "./redux.state";
import { UserType } from "components/types/Users";
import { StudentType } from "components/types/Student";

export const updateUserData = createAsyncThunk(
    'update/updateUserData',
    async ({ _id, updateData }: { _id: string, updateData: UserType[number] }) => {
        try {
            const res = await axiosInstance.post('/api/update?type=users', { _id, ...updateData });
            alert(`${res.statusText = `${res.data.name} updated successfully..`}`);
            window.location.href = '/dashboard/users/';
            return res.data;
        } catch (error) {
            throw new Error('Error updating user data');
        }
    }
);

// Define async thunk to update student data
export const updateStudentData = createAsyncThunk(
    'update/updateStudentData',
    async ({ _id, updateData }: { _id: string, updateData: StudentType[number] }) => {
        try {
            const res = await axiosInstance.post('/api/update?type=student', { _id, ...updateData });
            alert(`${res.statusText = `${res.data.name} updated successfully..`}`);
            window.location.href = '/dashboard/students/';
            return res.data;
        } catch (error) {
            throw new Error('Error updating student data');
        }
    }
);
