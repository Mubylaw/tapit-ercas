import { GET_PAYMENT_URL } from "../actionTypes";

const payment = (
  state = {
    url: "",
  },
  action
) => {
  switch (action.type) {
    case GET_PAYMENT_URL:
      return { ...state, url: action.url };
    default:
      return state;
  }
};

export default payment;
