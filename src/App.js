import {
  CssBaseline,
  Grid,
  Paper,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import Header from "./components/Header/Header";
import theme from "./theme";
import { useEffect, useState } from "react";
import ExchangesList from "./components/ExchangesList/ExchangesList";
import Calculate from "./components/Calculate/Calculate";
import axios from "axios";

export const CURRENCIES = ["EUR", "USD", "KGS", "KZT", "RUB"];

const API_WITH_BASE_CURRENCY = (baseCurrency) =>
  `https://v6.exchangerate-api.com/v6/a5f70e54a935de6dfa5b9742/latest/${baseCurrency}`;

function App() {
  const [baseCurrency, setBaseCurrency] = useState("KGS");
  const [allCurrencies, setAllCurrencies] = useState({});

  const handleBaseCurrencyChange = (event) => {
    setBaseCurrency(event.target.value);
  };

  const fetchRates = async (base) => {
    const response = await axios.get(API_WITH_BASE_CURRENCY(base));

    const onlyNeedCurrencies = Object.entries(
      response.data.conversion_rates,
    ).reduce((acc, [key, value]) => {
      // console.log("acc: ", acc);
      // console.log("key: ", key);
      // console.log("value: ", value);
      // console.log("- - - - - - - - - - - - - - - - - - - - - - -");

      if (CURRENCIES.includes(key) && base !== key) {
        return {
          ...acc,
          [key]: value,
        };
      } else return acc;
    }, {});

    setAllCurrencies(onlyNeedCurrencies);
  };

  useEffect(() => {
    fetchRates(baseCurrency);
  }, [baseCurrency]);

  // const handleCalculateChange = (event) => {};

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header
        baseCurrency={baseCurrency}
        onBaseCurrencyChange={handleBaseCurrencyChange}
      />
      <Toolbar />

      <Grid
        sx={{
          marginTop: "150px",
        }}
        container
        justifyContent="space-around"
      >
        <Grid item>
          <Calculate />
        </Grid>
        <Grid item>
          <Paper
            elevation={10}
            sx={{
              display: "flex",
              width: "auto",
              padding: "35px",
            }}
          >
            <ExchangesList currencies={allCurrencies} />
          </Paper>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
