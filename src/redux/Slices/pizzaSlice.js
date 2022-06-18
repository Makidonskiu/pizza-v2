import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// бизнес логика
export const fetchPizza = createAsyncThunk('pizza/fetchPizzaStatus', async (params, thunkAPI) => {
  const { order, sortBy, category, search, currentPage } = params;
  const { data } = await axios.get(
    `https://628a9ad77886bbbb37a9e118.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}&${search}`,
  );
  return data;
});

const initialState = {
  items: [],
  status: 'loading', //loading | success | error
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizza.pending]: (state, action) => {
      state.status = 'loading';
      state.items = [];
    },

    [fetchPizza.fulfilled]: (state, action) => {
      state.items= action.payload;
      state.status = 'success';
    },

    [fetchPizza.rejected]: (state, action) => {
      state.status = 'error';
      state.items = [];
    },
  },
});
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
