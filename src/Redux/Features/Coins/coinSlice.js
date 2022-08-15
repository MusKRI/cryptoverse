import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  trendingCoins: [],
  coinsList: [],
  loading: false,
  searchText: "",
  coinsLimit: 5,
};

const coinSlice = createSlice({
  name: "coins",
  initialState,

  reducers: {
    setTrendingCoins: {
      reducer(state, action) {
        state.trendingCoins = action.payload.trendingCoins;
      },

      prepare(TrendingCoins) {
        return {
          payload: {
            trendingCoins: TrendingCoins,
          },
        };
      },
    },

    setCoinsList: {
      reducer(state, action) {
        state.coinsList = action.payload.coinsList;
      },

      prepare(CoinsList) {
        return {
          payload: {
            coinsList: CoinsList,
          },
        };
      },
    },

    setLoading: {
      reducer(state, action) {
        state.loading = action.payload.loading;
      },
      prepare(newLoading) {
        return {
          payload: {
            loading: newLoading,
          },
        };
      },
    },

    setSearchText: {
      reducer(state, action) {
        state.searchText = action.payload.searchText;
      },

      prepare(newSearchText) {
        return {
          payload: {
            searchText: newSearchText,
          },
        };
      },
    },

    setLimit: {
      reducer(state, action) {
        state.coinsLimit = action.payload.limit;
      },

      prepare(newLimit) {
        return {
          payload: {
            limit: newLimit,
          },
        };
      },
    },
  },
});

export const {
  setTrendingCoins,
  setCoinsList,
  setLoading,
  setSearchText,
  setLimit,
} = coinSlice.actions;

export const selectLoading = (state) => state.coins.loading;
export const selectTrendingCoins = (state) => state.coins.trendingCoins;
export const selectCoinsList = (state) => state.coins.coinsList;
export const selectSearchText = (state) => state.coins.searchText;
export const selectLimit = (state) => state.coins.coinsLimit;

export default coinSlice.reducer;
