import React, { useState, useEffect } from "react";
import { selectCurrency } from "../../Redux/Features/Header/headerSlice";
import { useSelector } from "react-redux";
import { HistoricalChart } from "../../config/api";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import Chart from "chart.js/auto";
import { chartDays } from "../../config/data";
import SelectButton from "../../Components/CoinPageComps/SelectButton";

Chart.register(CategoryScale);

const CoinInfo = ({ coin }) => {
  const currency = useSelector(selectCurrency);

  const [historicalData, setHistoricalData] = useState();
  const [days, setDays] = useState(1);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      const response = await fetch(HistoricalChart(coin?.id, days, currency));
      const data = await response.json();
      setHistoricalData(data.prices);
    };

    fetchHistoricalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, days]);

  console.log(historicalData);
  return (
    <CoinCharInfo>
      {!historicalData ? (
        <ClimbingBoxLoader
          color={"hsl(267, 86%, 49%)"}
          loading={historicalData ? false : true}
          size={40}
        />
      ) : (
        <>
          <Line
            data={{
              labels: historicalData.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12
                    ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                    : `${date.getHours()}:${date.getMinutes()} AM`;
                return days === 1 ? time : date.toLocaleDateString();
              }),

              datasets: [
                {
                  data: historicalData.map((coin) => coin[1]),
                  label: `Price (Past ${days} Days ) in ${currency}`,
                  borderColor: "hsl(267, 86%, 49%)",
                },
              ],
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}
          />
          <div className="btns">
            {chartDays.map((day) => (
              <SelectButton
                key={day.value}
                onClick={() => setDays(day.value)}
                selected={day.value === days}
              >
                {day.label}
              </SelectButton>
            ))}
          </div>
        </>
      )}
    </CoinCharInfo>
  );
};

const CoinCharInfo = styled.div`
  padding: 40px;
  justify-self: flex-start;
  align-self: flex-start;
  width: 73vw;

  @media screen and (max-width: 1280px) {
    width: 100vw;
    padding: 15px;
  }

  .btns {
    /* border: 1px solid red; */
    margin-top: 20px;
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    flex-wrap: wrap;
    gap: 20px;
  }
`;

export default CoinInfo;
