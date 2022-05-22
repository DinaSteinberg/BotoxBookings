import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import { BookingContext } from "../../context/booking/context";
import { useNavigate } from "react-router-dom";

export const CreateAccount = () => {
  const navigate = useNavigate();
  const { userInfo, dispatch } = useContext(BookingContext);
  const [reference, setReference] = useState("friend");
  const [first_name, setFirstName] = useState(userInfo.first_name);
  const [last_name, setLastName] = useState(userInfo.last_name);
  const [email, setEmail] = useState(userInfo.email);
  const [showError, setShowError] = useState(false);

  var references = [
    {
      value: "friend",
      label: "Word of mouth",
    },
    {
      value: "paper_ad",
      label: "Ad in the paper",
    },
    {
      value: "magazine_ad",
      label: "Ad in a magazine",
    },
    {
      value: "other",
      label: "Other",
    },
  ];

  function handleChange(event) {
    setReference(event.target.value);
  }

  function handleSubmit(event) {
    if (first_name === "" || last_name === "" || email === "") {
      setShowError(true);
    } else {
      dispatch({
        type: "submit",
        first_name: first_name,
        last_name: last_name,
        email: email,
        reference: reference,
        submitted: true,
      });
      navigate("/booking");
    }
  }
  const signInPage = () => {
    navigate("/signIn");
  };

  const formPage = (
    <div>
      <h1 text-align="center">Create Account</h1>

      <TextField
        sx={{ m: 2 }}
        id="standard-basic"
        label="First Name"
        variant="standard"
        required
        value={first_name}
        onChange={(event) => setFirstName(event.target.value)}
      />
      <TextField
        sx={{ m: 2 }}
        id="standard-basic"
        label="Last Name"
        variant="standard"
        required
        value={last_name}
        onChange={(event) => setLastName(event.target.value)}
      />
      <br />
      <TextField
        sx={{ m: 2 }}
        id="standard-basic"
        label="Email"
        variant="standard"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Box
        //component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="select-reference"
          select
          label="How did you hear about us?"
          value={reference}
          onChange={handleChange}
          variant="standard"
        >
          {references.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <br />
        <Button variant="contained" onClick={() => handleSubmit()}>
          Submit
        </Button>
        <br />
        {showError && (
          <Alert severity="error">Required fields were left out!</Alert>
        )}
        <br />
        Already have an account?
        <Button sx={{ m: 2 }} variant="contained" onClick={() => signInPage()}>
          Sign In
        </Button>
      </Box>
    </div>
  );

  const responsePage = (
    <Alert sx={{ m: 7 }} severity="success">
      Account Successfully created!
    </Alert>
  );

  return userInfo.submitted ? responsePage : formPage;
};
