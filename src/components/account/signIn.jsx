import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

import React, { useState, useContext } from "react";
import { BookingContext } from "../../context/booking/context";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(BookingContext);
  const [email, setEmail] = useState("");
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [showError, setShowError] = useState(false);

  const handleSubmit = () => {
    if (email !== "" && fname !== "" && lname !== "") {
      dispatch({
        type: "signIn",
        email: email,
        first_name: fname,
        last_name: lname,
        submitted: true,
      });
      navigate("/myAccount");
    } else setShowError(true);
  };

  return (
    <div>
      {showError && (
        <Alert severity="error">Required fields were left out!</Alert>
      )}
      <TextField
        sx={{ m: 2 }}
        type="email"
        id="standard-basic"
        label="Email"
        variant="standard"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <br />
      <TextField
        sx={{ m: 2 }}
        type="text"
        id="standard-basic"
        label="First Name"
        variant="standard"
        required
        value={fname}
        onChange={(event) => setFName(event.target.value)}
      />
      <br />
      <TextField
        sx={{ m: 2 }}
        type="text"
        id="standard-basic"
        label="Last Name"
        variant="standard"
        required
        value={lname}
        onChange={(event) => setLName(event.target.value)}
      />
      <br />
      <Button variant="contained" onClick={() => handleSubmit()}>
        Submit
      </Button>
    </div>
  );
};
