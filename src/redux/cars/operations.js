import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://car-rental-api.goit.global/';
export const fetchCars = createAsyncThunk(

    'cars/fetchCars',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get('/cars');
            return response.data;
        } catch (error) {
            
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchById = createAsyncThunk(
  "/cars/fetchById",
  async (id, thunkAPI) => {
    try {
      const res = await axios.get(`/cars/${id}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


