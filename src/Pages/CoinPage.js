import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SingleCoin } from "../config/api";
import styled from "styled-components";
import CoinInfo from "../Components/CoinPageComps/CoinInfo";
import CoinIcon from "../Components/CoinGrid/CoinIcon";
import {
  selectSymbol,
  selectCurrency,
} from "../Redux/Features/Header/headerSlice";
import { useSelector } from "react-redux";
import { numberWithCommas } from "../Components/Banner/Carousel";
// import ClipLoader from "react-spinners/ClipLoader";
import RingLoader from "react-spinners/RingLoader";

const CoinPage = () => {
  const currentSymbol = useSelector(selectSymbol);
  const currency = useSelector(selectCurrency);
  const { id } = useParams();
  const [singleCoin, setSingleCoin] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSingleCoin = async () => {
      setLoading(true);
      const response = await fetch(SingleCoin(id));
      const data = await response.json();
      setSingleCoin(data);
      setLoading(false);
    };

    fetchSingleCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CoinPageContainer>
      <CoinWrapper>
        <Sidebar>
          <IconBox>
            <CoinIcon symbol={singleCoin?.symbol} />
          </IconBox>
          <h1>{singleCoin?.name}</h1>
          <p
            dangerouslySetInnerHTML={{
              __html: !singleCoin.description
                ? ""
                : `${singleCoin?.description.en.split(". ")[0]}.`,
            }}
          />
          <CoinCap>
            <span>
              <h4>Rank:</h4> &nbsp;&nbsp; <h4>{singleCoin?.market_cap_rank}</h4>
            </span>
            <span>
              <h4>Current Price:</h4> &nbsp;&nbsp;{" "}
              <h4>
                {currentSymbol}{" "}
                {!singleCoin.market_data
                  ? ""
                  : `${numberWithCommas(
                      singleCoin?.market_data.current_price[
                        currency.toLowerCase()
                      ]
                    )}`}
              </h4>
            </span>
            <span>
              <h4>Market Cap:</h4> &nbsp;&nbsp;{" "}
              <h4>
                {currentSymbol}{" "}
                {!singleCoin.market_data
                  ? ""
                  : `${numberWithCommas(
                      singleCoin?.market_data.market_cap[currency.toLowerCase()]
                        .toString()
                        .slice(0, -6)
                    )}M`}
              </h4>
            </span>
          </CoinCap>
        </Sidebar>
        {!singleCoin.id ? (
          <RingLoader
            color={"hsl(267, 86%, 49%)"}
            loading={loading}
            size={150}
          />
        ) : (
          <CoinInfo coin={singleCoin} />
        )}
      </CoinWrapper>
    </CoinPageContainer>
  );
};

const CoinPageContainer = styled.section`
  padding: 18px;
  height: 100%;
`;

const CoinWrapper = styled.div`
  /* border: 1px solid blue; */
  color: #fff;
  display: grid;
  grid-template-columns: 1fr 2fr;
  place-items: center;

  @media screen and (max-width: 1280px) {
    grid-template-columns: 1fr;
    place-content: center;
  }
`;

const Sidebar = styled.div`
  padding: 20px;
  height: 100%;
  /* border: 1px solid coral; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    font-weight: 800;
    margin-bottom: 20px;
    font-size: 2.6rem;
    letter-spacing: 1px;
  }

  p {
    text-align: justify;
    line-height: 1.75;
    font-size: 1rem;
    letter-spacing: 1px;
    padding-bottom: 15px;
    margin-bottom: 10px;

    a {
      color: var(--clr-primary);
    }
  }

  @media screen and (min-width: 1280px) {
    border-right: 2px solid grey;
  }
`;

const IconBox = styled.div`
  margin-bottom: 20px;

  img {
    object-fit: cover;
    height: 200px;
  }
`;

const CoinCap = styled.div`
  align-self: center;

  span {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    h4:nth-child(1) {
      font-weight: 800;
      font-size: 1.5rem;
      letter-spacing: 0.45px;
    }

    h4:nth-child(2) {
      font-size: 1.5rem;
      letter-spacing: 0.45px;
    }

    @media screen and (max-width: 900px) {
      justify-content: center;
    }
  }

  @media screen and (min-width: 900px) and (max-width: 1280px) {
    align-self: center;
    width: 100%;
    display: flex;
    gap: 20px;
    justify-content: space-between;
  }
`;

export default CoinPage;
