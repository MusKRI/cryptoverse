import React from "react";
import styled from "styled-components";
import CoinIcon from "./CoinIcon";
import { selectSymbol } from "../../Redux/Features/Header/headerSlice";
import { useSelector } from "react-redux";
import { numberWithCommas } from "../Banner/Carousel";
import { useNavigate } from "react-router-dom";
import CoinIconsList from "../../img/cryptocurrency-icons-master/CoinIconsList";

const CoinCard = ({ coinInfo }) => {
  const navigate = useNavigate();
  const currencySymbol = useSelector(selectSymbol);
  let profit = coinInfo.price_change_percentage_24h >= 0;

  return (
    <Card
      onClick={() => navigate(`/coins/${coinInfo.id}`)}
      Img={CoinIconsList[`${coinInfo.symbol}`]}
    >
      <Wrap>
        <IconBox>
          <CoinIcon symbol={coinInfo.symbol} />
        </IconBox>
        <CoinName>{coinInfo.name}</CoinName>
        <CurrentPrice>
          {currencySymbol}{" "}
          {numberWithCommas(coinInfo?.current_price.toFixed(2))}
        </CurrentPrice>
        <Profit
          style={{
            color: profit > 0 ? "rgb(14, 203, 129)" : "red",
            fontWeight: 500,
          }}
        >
          {profit && "+"} {coinInfo?.price_change_percentage_24h?.toFixed(2)}%
        </Profit>
        <MarketCap>
          {currencySymbol}
          {numberWithCommas(coinInfo?.market_cap.toString())}
        </MarketCap>
      </Wrap>
    </Card>
  );
};

const Card = styled.div`
  background-color: #1c1f26;
  border: 2px solid #b5b6b7;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 200ms ease;
  color: #fff;
  backdrop-filter: blur(10px);
  position: relative;
  z-index: 2;
  animation: showUp 400ms ease;

  &:hover {
    border: 2px solid var(--clr-primary);
    transform: scale(1.04);
    box-shadow: 1px 1px 12px #2e3241;
  }
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  justify-content: space-evenly;
`;

const IconBox = styled.div`
  img {
    object-fit: cover;
    height: 80px;
  }
`;

const CoinName = styled.h3`
  letter-spacing: 1px;
`;

const CurrentPrice = styled.p``;

const Profit = styled.p``;

const MarketCap = styled.p``;

export default CoinCard;
