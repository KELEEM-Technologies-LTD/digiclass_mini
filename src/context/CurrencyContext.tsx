import React, { createContext, useEffect, useState } from "react";
import fx from "money";
import { formatCedis } from "../components/helpers";

//currency context
export const CurrencyContext = createContext<{
  exchangeCurrency: string;
  setExchangeCurrency: React.Dispatch<React.SetStateAction<string>>;
  convertValue: (value: number) => string;
  convertOldValue: (value: number) => string;
}>({
  exchangeCurrency: "",
  setExchangeCurrency: () => {},
  convertValue: () => "",
  convertOldValue: () => "",
});

export const CurrencyProvider = (props: { children: React.ReactNode }) => {
  const [exchangeCurrency, setExchangeCurrency] = useState<string>("GHS");
  const baseUrl =
    "https://data.fixer.io/api/convert?access_key=3de04c982c0d33bfae452782e2d711a3&from=GHS";

  // useEffect(() => {
  //   fetchCur(4000);
  // }, []);

  const fetchCur = async (value: number) => {
    try {
      const res = await fetch(
        baseUrl + `&to=${exchangeCurrency}&amount=${value}`
      );

      console.log(await res.json());
    } catch (err) {
      console.log(err);
    }
  };

  const convertValue = (value: number) => {
    if (exchangeCurrency === "GHS") {
      return formatCedis(value, "GHS");
    }

    //
    const convertedValue = fx.convert(value);
    const formattedValue = parseFloat(convertedValue.toFixed(2));
    return formatCedis(formattedValue, exchangeCurrency);
  };

  const convertOldValue = (value: number) => {
    if (exchangeCurrency === "") {
      return formatCedis(value, exchangeCurrency);
    }
    const convertedValue = fx.convert(value);
    const formattedValue = parseFloat(convertedValue.toFixed(2));
    return formatCedis(formattedValue * 1.35, exchangeCurrency);
  };

  const contextValue = {
    exchangeCurrency,
    setExchangeCurrency,
    convertValue,
    convertOldValue,
  };

  return (
    <CurrencyContext.Provider value={contextValue}>
      {props.children}
    </CurrencyContext.Provider>
  );
};
