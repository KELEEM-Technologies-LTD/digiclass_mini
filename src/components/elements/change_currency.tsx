import React, { useContext, useEffect, useState } from "react";
import Select, { SingleValue } from "react-select";
import ghc from "../../assets/img/gh.png";
import usd from "../../assets/img/usa.png";
import eur from "../../assets/img/eur.png";
import { CurrencyContext } from "../../context/CurrencyContext";

interface Cur {
  label: string;
  flag?: string;
  value: string;
}
export default function ChangeCurrency() {
  const { exchangeCurrency, setExchangeCurrency } = useContext(CurrencyContext);

  const cts: Cur[] = [
    {
      label: "GHS",
      flag: ghc,
      value: "GHS",
    },
    {
      label: "USD",
      flag: usd,
      value: "USD",
    },
    // {
    //   label: "EUR",
    //   flag: eur,
    //   value: "EUR",
    // },
  ];

  const handleCurrencyChange = (selectedOption: SingleValue<Cur>) => {
    if (selectedOption) {
      const { value } = selectedOption;
      setExchangeCurrency(value);
    }
  };

  return (
    <Select
      className="w-[123px]"
      onChange={handleCurrencyChange}
      value={cts.find((cty) => cty.value === exchangeCurrency)}
      options={cts}
      formatOptionLabel={(cty) => (
        <div className="country-option flex justify-between items-center">
          <span>{cty.label}</span>
          <img
            src={cty.flag}
            alt="country-image mx-1"
            style={{ width: "20px", height: "15px" }}
          />
        </div>
      )}
      isSearchable={false}
    />
  );
}
