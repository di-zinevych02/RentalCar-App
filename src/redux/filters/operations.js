import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
export const fetchByFilters = createAsyncThunk(
    "filters/fetchByFilters",
    async (
        { page = 1, limit = 12, brand = "", rentalPrice = "", minMileage = "", maxMileage = "" },
        thunkAPI
    ) => {
        try {
            const response = await axios.get('/cars', {
                params: {
                    page,
                    limit,
                    brand,
                    rentalPrice,
                    minMileage,
                    maxMileage,
                },
            });
            return response.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);