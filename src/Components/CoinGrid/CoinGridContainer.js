import React from "react";
import styled from "styled-components";
import CoinCard from "./CoinCard";
import { useSelector } from "react-redux";
import {
  selectCoinsList,
  selectSearchText,
  selectLoading,
  selectLimit,
} from "../../Redux/Features/Coins/coinSlice";
import HashLoader from "react-spinners/HashLoader";

const CoinGridContainer = () => {
  const coinsList = useSelector(selectCoinsList);
  const search = useSelector(selectSearchText);
  const loading = useSelector(selectLoading);
  const limit = useSelector(selectLimit);

  const handleSearch = () => {
    const limitedList = coinsList.slice(0, limit);

    return search
      ? coinsList.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        )
      : limitedList.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        );
  };

  return (
    <CoinGrid loading={loading}>
      {loading ? (
        <HashLoader color={"hsl(267, 86%, 49%)"} loading={loading} size={150} />
      ) : (
        handleSearch().map((coin) => {
          return <CoinCard coinInfo={coin} key={coin.id} />;
        })
      )}
    </CoinGrid>
  );
};

const CoinGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-auto-rows: 250px;
  gap: 40px;
  margin-bottom: 30px;

  h3 {
    color: #fff;
  }
`;

export default CoinGridContainer;
