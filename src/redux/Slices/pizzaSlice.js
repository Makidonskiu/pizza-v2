import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 1,
}

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    pizzas(){

    }
  },
})
export const { pizzas } = pizzaSlice.actions

export default pizzaSlice.reducer