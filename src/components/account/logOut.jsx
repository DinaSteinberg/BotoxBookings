import React, { useContext } from "react";
import { BookingContext } from "../../context/booking/context";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export const LogOut = () => {
  const navigate = useNavigate();
  const { userInfo, dispatch } = useContext(BookingContext);
  const name = userInfo.first_name;

  const logOut = () => {
    dispatch({ type: "log_out" });
    navigate("/");
  };

  const forgetIt = () => {
    navigate("/myAccount");
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>
        Are you sure you want to sign out, {name}?
      </h1>
      <br />
      <Button sx={{ m: 2 }} variant="contained" onClick={logOut}>
        Yes, Goodbye
      </Button>
      <Button sx={{ m: 2 }} variant="contained" onClick={forgetIt}>
        No, I changed my mind
      </Button>
    </div>
  );
};
