import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(){
      
    }
  },
})
export const { setCart } = cartSlice.actions

export default cartSlice.reducer