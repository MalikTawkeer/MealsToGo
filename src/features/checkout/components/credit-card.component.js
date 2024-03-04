import React from "react";
import { LiteCreditCardInput } from "react-native-credit-card-input";

import { cardTokenRequest } from "../../../services/checkout/checkout.service";

export const CreditCardInput = ({ name, onSuccess }) => {
  const onchange = async (formData) => {
    const { values, status } = formData;
    const isIncomplete = Object.values(status).includes("incomplete");

    const expiry = values.expiry.split("/");
    const card = {
      number: values.number,
      exp_month: expiry[0],
      cvc: values.cvc,
      exp_year: expiry[1],
      name: name,
    };
    if (!isIncomplete) {
      const info = await cardTokenRequest(card);
      onSuccess(info);
    }
  };
  return <LiteCreditCardInput validColor="blue" onChange={onchange} />;
};
