import React, { useContext, useState } from "react";
import { BookingContext } from "../../context/booking/context";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

export const MyAccount = () => {
  const { userInfo, dispatch } = useContext(BookingContext);

  const [open, setOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  console.log(userInfo.events);
  const userAppointments = userInfo.events?.map((event) => {
    console.log(event);
    if (event.alreadyBooked) {
      if (event.patient === userInfo.email) {
        return event;
      }
    }
  });

  const handleClick = (event) => {};

  const handleClose = (event) => {};

  const PastAppointments = () => {
    if (userAppointments !== undefined) {
      return (
        <div>
          <List>
            {userAppointments?.map((event) => {
              <ListItem disablePadding>
                <ListItemButton
                  onClick={(e) => {
                    handleClick(e);
                  }}
                >
                  <ListItemText
                    primary={event.title + " " + event.start.toLocaleString()}
                  />
                </ListItemButton>
              </ListItem>;
            })}
          </List>
        </div>
      );
    } else {
      return <h2>No appointments booked yet</h2>;
    }
  };

  const RebookDialog = () => {
    return (
      <Dialog
        open={open}
        onClose={setOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to rebook this appointment?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Yes</Button>
          <Button onClick={setOpen(false)} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  //This page will be where the user's old appointments are shown.
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Past Appointments: </h1>
      <br />
      <PastAppointments />
      <RebookDialog />
    </div>
  );
};
