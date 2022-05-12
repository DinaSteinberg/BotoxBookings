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
  });

  return (
    <BookingContext.Provider
      // context value has the todos state and also the dispatch function
      // so the todos can be updated from any part of the app
      value={{
        userInfo: state,
        dispatch: dispatch,
      }}
    >
      {props.children}
    </BookingContext.Provider>
  );
};
