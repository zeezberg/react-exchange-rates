import { List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
// import PropTypes from "prop-types";

import EuroIcon from "@mui/icons-material/Euro";
import CurrencyRubleIcon from "@mui/icons-material/CurrencyRuble";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CurrencyFrancIcon from "@mui/icons-material/CurrencyFranc";
import CurrencyYuanIcon from "@mui/icons-material/CurrencyYuan";

function getIconByCurrency(currency) {
  switch (currency) {
    case "EUR":
      return <EuroIcon />;
    case "USD":
      return <AttachMoneyIcon />;
    case "KGS":
      return <CurrencyFrancIcon />;
    case "KZT":
      return <CurrencyYuanIcon />;
    case "RUB":
      return <CurrencyRubleIcon />;
    default:
      return <AttachMoneyIcon />;
  }
}

const ExchangesList = (props) => {
  const { currencies } = props;
  // console.log("currencies: ", currencies);
  return (
    <List>
      {Object.entries(currencies).map(([key, value]) => (
        <ListItem key={key}>
          <ListItemIcon>{getIconByCurrency(key)}</ListItemIcon>
          <ListItemText
            sx={{
              fontFamily: "Oswald",
            }}
            primary={value.toFixed(2)}
            secondary={key}
          />
        </ListItem>
      ))}
    </List>
  );
};

ExchangesList.propTypes = {};

export default ExchangesList;
