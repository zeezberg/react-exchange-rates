import {
  AppBar,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const Header = (props) => {
  const { baseCurrency, onBaseCurrencyChange } = props;
  return (
    <AppBar>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography fontFamily={"Oswald"} letterSpacing={2} variant="h3">
          ADA RATES
        </Typography>
        <TextField
          margin="dense"
          label="Основная валюта"
          value={baseCurrency}
          sx={{
            minWidth: 120,
          }}
          focused
          color="secondary"
          variant="outlined"
          onChange={onBaseCurrencyChange}
          select
        >
          <MenuItem value="USD">USD</MenuItem>
          <MenuItem value="KGS">KGS</MenuItem>
          <MenuItem value="KZT">KZT</MenuItem>
          <MenuItem value="EUR">EUR</MenuItem>
          <MenuItem value="RUB">RUB</MenuItem>
        </TextField>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  baseCurrency: PropTypes.string.isRequired,
  onBaseCurrencyChange: PropTypes.func.isRequired,
};

export default Header;
