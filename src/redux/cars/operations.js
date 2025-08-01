import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCars = createAsyncThunk(
  'cars/fetchCars',
  async ({ page = 1 , limit = 12 }, thunkAPI) => {
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

