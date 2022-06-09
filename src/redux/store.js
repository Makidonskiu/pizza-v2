import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './Slices/cartSlice'
import filterSlice from './Slices/filterSlice'
import pizzaSlice from './Slices/pizzaSlice'

export const store = configureStore({
  reducer: {
      cart: cartSlice,
      filter: filterSlice,
      pizza: pizzaSlice,
  },
})