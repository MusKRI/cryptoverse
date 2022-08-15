import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import {
  selectLimit,
  selectSearchText,
} from "../../Redux/Features/Coins/coinSlice";
import {
  setCoinsList,
  setLoading,
  setSearchText,
  setLimit,
} from "../../Redux/Features/Coins/coinSlice";
import { CoinList } from "../../config/api";
import { selectCurrency } from "../../Redux/Features/Header/headerSlice";
import CoinGridContainer from "./CoinGridContainer";

const CoinsGrid = () => {
  const dispatch = useDispatch();
  const currency = useSelector(selectCurrency);
  const limit = useSelector(selectLimit);
  const search = useSelector(selectSearchText);

  useEffect(() => {
    const fetchCoinsList = async () => {
      dispatch(setLoading(true));
      const response = await fetch(CoinList(currency));
      const data = await response.json();
      dispatch(setCoinsList(data));
      // console.log(data);

      dispatch(setLoading(false));
    };

    fetchCoinsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, limit]);

  return (
    <CoinsCardsContainer>
      <Heading>Cryptocurrency Prices by Market Cap</Heading>
      <SearchContainer>
        <input
          type="text"
          id="search-movie"
          className="input"
          placeholder=" "
          onChange={(e) => dispatch(setSearchText(e.target.value))}
        />
        <label htmlFor="search-movie" className="input-label">
          <span className="label-text">Search for a crypto currency</span>
        </label>
      </SearchContainer>
      <CoinGridContainer />
      {!search ? (
        <LoadMoreBtn>
          <button type="button" onClick={() => dispatch(setLimit(limit + 5))}>
            Find More
          </button>
        </LoadMoreBtn>
      ) : (
        ""
      )}
    </CoinsCardsContainer>
  );
};

const CoinsCardsContainer = styled.main`
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
  margin-bottom: 20px;

  @media screen and (min-width: 600px) {
    padding-left: 24px;
    padding-right: 24px;
  }

  @media screen and (min-width: 1280px) {
    max-width: 1280px;
  }
`;

const Heading = styled.h4`
  color: #fff;
  margin: 1.125rem;
  font-size: 1.3rem;
  text-align: center;
  letter-spacing: 0.02125rem;
  line-height: 1.235;

  @media screen and (min-width: 600px) {
    font-size: 1.8rem;
  }

  @media screen and (min-width: 1280px) {
    font-size: 2.3rem;
  }
`;

const SearchContainer = styled.div`
  margin-bottom: 1.25rem;
  width: 100%;
  position: relative;

  .input {
    color: #fff;
    width: 100%;
    padding: 18px 14px;
    font-family: "Roboto", sans-serif;
    font-size: 1.1rem;
    border-radius: 4px;
    border: 2px solid #b5b6b7;
    background: transparent;
    outline: none;
  }

  .input-label {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    pointer-events: none;

    .label-text {
      padding-left: 10px;
      pointer-events: none;
      padding-right: 5px;
      font-size: 17px;
      color: #b5b6b7;
      transition: all 200ms ease;
    }
  }

  .input:focus,
  .input:not(:placeholder-shown) {
    border: 2px solid #fff;
  }

  .input:focus + .input-label .label-text,
  .input:not(:placeholder-shown) + .input-label .label-text {
    background-color: var(--clr-bg);
    transform: translate(6px, -30px);
    font-size: 13px;
    color: #fff;
  }
`;

const LoadMoreBtn = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    padding: var(--btn-padding);
    border: 1px solid transparent;
    background-color: var(--clr-primary);
    border-radius: 4px;
    transition: all 200ms ease-in;
    color: #fff;
    cursor: pointer;
    font-family: "Roboto", sans-serif;
    font-size: 1.2rem;

    &:hover {
      background-color: var(--clr-primary-50);
    }
  }
`;

export default CoinsGrid;
