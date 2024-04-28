import * as jwtDecode from 'jwt-decode';
import { Common } from 'redux/redux.types';

const decodeToken = (token: string): any => {
    try {
        return jwtDecode.jwtDecode(token) as any;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

export const isAuthenticated = (card: Common['user'][number]) => {
    const token = localStorage.getItem('token');
    if (!token) {
        return false; // No token found, user is not authenticated
    }
    try {
        const decodedToken = decodeToken(token); // Decode the JWT token
        // Check if decoding was successful and user role is either 'teacher' or 'superadmin'
        return decodedToken && (card.role === 'teacher' || card.role === 'superadmin');
    } catch (error) {
        console.error('Error decoding token:', error);
        return false; // Decoding failed, user is not authenticated
    }
};