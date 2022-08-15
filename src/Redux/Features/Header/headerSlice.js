import { createSlice } from "@reduxjs/toolkit";
// $
const initialState = {
  isDdOpen: false,
  currency: "INR",
  symbol: "₹",
};

const headerSlice = createSlice({
  name: "header",
  initialState,

  reducers: {
    setIsOpen: {
      reducer(state, action) {
        state.isDdOpen = action.payload.open;
      },

      prepare(newOpen) {
        return {
          payload: {
            open: newOpen,
          },
        };
      },
    },

    setCurrency: {
      reducer(state, action) {
        state.currency = action.payload.currency;
      },
      prepare(newCurrency) {
        return {
          payload: {
            currency: newCurrency,
          },
        };
      },
    },

    setSymbol: {
      reducer(state, action) {
        state.symbol = action.payload.symbol;
      },

      prepare(newSymbol) {
        return {
          payload: {
            symbol: newSymbol,
          },
        };
      },
    },
  },
});

export const selectDD = (state) => state.header.isDdOpen;
export const selectCurrency = (state) => state.header.currency;
export const selectSymbol = (state) => state.header.symbol;

export const { setIsOpen, setCurrency, setSymbol } = headerSlice.actions;

export default headerSlice.reducer;
