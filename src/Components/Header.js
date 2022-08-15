import React, { useEffect } from "react";
import styled from "styled-components";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectDD, selectCurrency } from "../Redux/Features/Header/headerSlice";
import { setSearchText } from "../Redux/Features/Coins/coinSlice";
import {
  setIsOpen,
  setCurrency,
  setSymbol,
} from "../Redux/Features/Header/headerSlice";

const Header = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectDD);
  const currency = useSelector(selectCurrency);

  const navigate = useNavigate();

  const handleDropdown = () => {
    dispatch(setIsOpen(!isOpen));
  };

  useEffect(() => {
    const fn = (e) => {
      if (!e.target.classList.contains("currency")) {
        dispatch(setIsOpen(false));
      }
    };

    window.addEventListener("click", fn);

    return () => {
      window.removeEventListener("click", fn);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCurrency = (e) => {
    dispatch(setSymbol(e.target.title === "INR" ? "₹" : "$"));
    dispatch(setCurrency(e.target.title));
    dispatch(setIsOpen(false));
  };

  const handleNavigation = () => {
    navigate("/");
    dispatch(setSearchText(""));
  };

  return (
    <HeadNav>
      <Wrap>
        <HeaderLogo onClick={handleNavigation}>CryptoVerse</HeaderLogo>
        <Currency onClick={handleDropdown} className="currency">
          <span onClick={handleDropdown} style={{ pointerEvents: "none" }}>
            {currency}
          </span>
          <Dropdown style={{ display: isOpen ? "flex" : "none" }}>
            <span onClick={handleCurrency} title="INR">
              INR
            </span>
            <span onClick={handleCurrency} title="USD">
              USD
            </span>
          </Dropdown>
          {isOpen ? (
            <AiFillCaretUp style={{ pointerEvents: "none" }} />
          ) : (
            <AiFillCaretDown style={{ pointerEvents: "none" }} />
          )}
        </Currency>
        <Login href="#">Login</Login>
      </Wrap>
    </HeadNav>
  );
};

const HeadNav = styled.header`
  padding: var(--padding);
  background-color: var(--clr-bg);
  color: #fff;
  box-shadow: 0px 2px 4px -1px rgb(0 0 0 / 20%),
    0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%);
`;

const Wrap = styled.div`
  display: flex;
  align-items: center;
  max-width: var(--container-width);
  margin: 0 auto;
`;

const HeaderLogo = styled.h2`
  color: var(--clr-primary);
  cursor: pointer;
  margin-right: 10px;

  @media screen and (min-width: 992px) {
    font-size: 30px;
  }
`;

const Currency = styled.div`
  margin-left: auto;
  border: 1px solid #b5b6b7;
  border-radius: 4px;
  margin-right: 15px;
  display: flex;
  align-items: center;
  position: relative;
  padding: var(--btn-padding);
  gap: 4px;
  cursor: pointer;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  width: 100%;
  color: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  background-color: #424242;

  span {
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;

    &:hover {
      background-color: #515151;
    }
  }
`;

const Login = styled.a`
  padding: var(--btn-padding);
  border: 1px solid transparent;
  background-color: var(--clr-primary);
  border-radius: 4px;
  transition: all 200ms ease-in;

  &:hover {
    background-color: var(--clr-primary-50);
    color: #fff;
  }
`;

export default Header;
