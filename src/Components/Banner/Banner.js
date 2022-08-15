import React from "react";
import styled from "styled-components";
import homeBanner from "../../img/home_banner.jpg";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <HomeBanner>
      <BannerContent>
        <Text>
          <h1>Crypto Verse</h1>
          <p>Get All The Info Regarding Your Favorite Crypto Currency</p>
        </Text>
        <Carousel />
      </BannerContent>
    </HomeBanner>
  );
};

const HomeBanner = styled.main`
  height: 62vh;
  background: url(${homeBanner});
  background-size: cover;
  background-repeat: no-repeat;

  color: #fff;
`;

const BannerContent = styled.div`
  padding: 25px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 100%;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 50px;
    line-height: 1.2;
    margin-bottom: 10px;
  }

  p {
    text-align: center;
    line-height: 1.6;
    letter-spacing: 1px;
  }
`;

export default Banner;
