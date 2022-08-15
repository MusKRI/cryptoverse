import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import CoinPage from "./Pages/CoinPage";

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins/:id" element={<CoinPage />} />
      </Routes>
    </div>
  );
};

export default App;
