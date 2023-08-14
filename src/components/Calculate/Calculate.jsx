import {
  CircularProgress,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  TextField,
} from "@mui/material";
import React from "react";
import { CURRENCIES } from "../../App";
import { useState } from "react";
import axios from "axios";
import { Money } from "@mui/icons-material";

const API_CALCULATE = (from, to, amount) =>
  `https://v6.exchangerate-api.com/v6/a5f70e54a935de6dfa5b9742/pair/${from}/${to}/${amount}`;

const Calculate = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [state, setState] = useState({
    firstAmount: "",
    firstCurrency: "KGS",
    secondAmount: "",
    secondCurrency: "USD",
  });

  const handleChange = async (event) => {
    const { value, name } = event.target;

    if (name === "firstCurrency") {
      convert("first", value, state.secondCurrency, state.firstAmount);
    } else if (name === "secondCurrency") {
      convert("second", value, state.firstCurrency, state.secondAmount);
    }
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const convert = async (type, from, to, amount) => {
    setIsLoading(true);
    const response = await axios.get(API_CALCULATE(from, to, amount));
    setIsLoading(false);
    setState((prevState) => ({
      ...prevState,
      [type === "first" ? "secondAmount" : "firstAmount"]:
        response.data.conversion_result,
    }));
  };

  return (
    <Paper
      elevation={10}
      sx={{
        display: "flex",
        width: "500px",
        height: "220px",
        padding: "35px",
        justifyContent: "center",
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} sx={{ margin: "0px 30px" }}>
          <TextField
            label="First amount"
            name="firstAmount"
            value={state.firstAmount}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  {isLoading ? (
                    <CircularProgress size={20} />
                  ) : (
                    <Money sx={{ visibility: "static" }} />
                  )}
                </InputAdornment>
              ),
            }}
            onBlur={() =>
              convert(
                "first",
                state.firstCurrency,
                state.secondCurrency,
                state.firstAmount,
              )
            }
          />
          <TextField
            sx={{ margin: "0px 15px" }}
            select
            name="firstCurrency"
            value={state.firstCurrency}
            onChange={handleChange}
          >
            {CURRENCIES.map((currency) => (
              <MenuItem key={currency} value={currency}>
                {currency}
              </MenuItem>
            ))}
          </TextField>
        </Grid>

        <Grid item xs={12} sx={{ margin: "0px 30px" }}>
          <TextField
            label="Second amount"
            name="secondAmount"
            value={state.secondAmount}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  {isLoading ? (
                    <CircularProgress size={20} />
                  ) : (
                    <Money sx={{ visibility: "hidden" }} />
                  )}
                </InputAdornment>
              ),
            }}
            onBlur={() =>
              convert(
                "second",
                state.secondCurrency,
                state.firstCurrency,
                state.secondAmount,
              )
            }
          />
          <TextField
            sx={{ margin: "0px 15px" }}
            select
            name="secondCurrency"
            value={state.secondCurrency}
            onChange={handleChange}
          >
            {CURRENCIES.map((currency) => (
              <MenuItem key={currency} value={currency}>
                {currency}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Calculate;
