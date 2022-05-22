import React, { useReducer } from "react";
import { UserReducer } from "./reducer";

export const BookingContext = React.createContext();

export const BookingProvider = (props) => {
  const [state, dispatch] = useReducer(UserReducer, {
    first_name: "",
    last_name: "",
    email: "",
    reference: "",
    submitted: false,
    sign: false,
    events: [],
  });

  return (
    <BookingContext.Provider
      value={{
        userInfo: state,
        dispatch: dispatch,
      }}
    >
      {props.children}
    </BookingContext.Provider>
  );
};
