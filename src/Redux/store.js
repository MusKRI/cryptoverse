import { configureStore } from "@reduxjs/toolkit";
import headerReducer from "./Features/Header/headerSlice";
import coinsReducer from "./Features/Coins/coinSlice";

const store = configureStore({
  reducer: {
    header: headerReducer,
    coins: coinsReducer,
  },
});

export default store;
