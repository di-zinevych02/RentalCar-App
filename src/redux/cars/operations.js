import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://car-rental-api.goit.global/';
export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async ({ page=1, limit = 12 }, thunkAPI) => {
    try {
      const response = await axios.get(`/cars?page=${page}&limit=${limit}`);
        return {
            ...response.data,
            page: Number(response.data.page),
        };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchById = createAsyncThunk(
  "cars/fetchById",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/cars/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchByFilters = createAsyncThunk(
    "cars/fetchByFilters",
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

