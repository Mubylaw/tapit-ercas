import { apiCall } from "../../services/api";
import { addError, removeError } from "./errors";
import { GET_PAYMENT_URL } from "../actionTypes";

export const getUrl = (url) => ({
  type: GET_PAYMENT_URL,
  url,
});

export const getPaymentUrl = (pay) => {
  return (dispatch) => {
    return apiCall("post", `/api/v1/payment/dummy`, pay)
      .then(({ data }) => {
        console.log(data);
        dispatch(getUrl(data.responseBody.checkoutUrl));
        dispatch(removeError());
      })
      .catch((err) => {
        dispatch(addError(err));
      });
  };
};
