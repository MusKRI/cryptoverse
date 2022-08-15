import React from "react";
import CoinIconsList from "../../img/cryptocurrency-icons-master/CoinIconsList";

const CoinIcon = ({ symbol }) => {
  return <img src={CoinIconsList[symbol]} alt={CoinIconsList["name"]} />;
};

export default CoinIcon;
