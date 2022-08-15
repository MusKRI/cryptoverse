import React, { useEffect } from "react";
import { TrendingCoins } from "../../config/api";
import { useSelector, useDispatch } from "react-redux";
import { selectTrendingCoins } from "../../Redux/Features/Coins/coinSlice";
import { setTrendingCoins } from "../../Redux/Features/Coins/coinSlice";
import {
  selectCurrency,
  selectSymbol,
} from "../../Redux/Features/Header/headerSlice";
import AliceCarousel from "react-alice-carousel";
import styled from "styled-components";
import { Link } from "react-router-dom";
import CoinIconsList from "../../img/cryptocurrency-icons-master/CoinIconsList";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const currency = useSelector(selectCurrency);
  const currencySymbol = useSelector(selectSymbol);
  const trendingCoins = useSelector(selectTrendingCoins);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      const Response = await fetch(TrendingCoins(currency));
      const data = await Response.json();
      // console.log(data);
      dispatch(setTrendingCoins(data));
    };

    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const items = trendingCoins.map((coin) => {
    let profit = coin.price_change_percentage_24h >= 0;

    return (
      <CarouselItem to={`/coins/${coin.id}`}>
        <img
          src={CoinIconsList[coin.symbol]}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />

        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? "rgb(14, 203, 129)" : "red",
              fontWeight: 500,
            }}
          >
            {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>

        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {currencySymbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </CarouselItem>
    );
  });

  const responsive = {
    0: {
      items: 2,
    },

    512: {
      items: 4,
    },
  };

  return (
    <CarouselContainer>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
      />
    </CarouselContainer>
  );
};

const CarouselContainer = styled.div`
  height: 50%;
  display: flex;
  align-items: center;
  /* border: 1px solid red; */
`;

const CarouselItem = styled(Link)`
  /* border: 1px solid red; */
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  text-transform: uppercase;
  color: #fff;
`;

export default Carousel;
