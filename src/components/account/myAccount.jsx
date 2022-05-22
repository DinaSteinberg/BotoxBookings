import React, { useContext, useState } from "react";
import { BookingContext } from "../../context/booking/context";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

export const MyAccount = () => {
  const { userInfo } = useContext(BookingContext);
  const userAppointments = userInfo.events
    ?.filter((event) => event.attendees !== undefined)
    .filter((event) => event.attendees[0].email === userInfo.email);

  const toString = (event) => {
    var date = new Date(event);
    return (
      calculateMonth(date.getMonth()) +
      " " +
      date.getDate() +
      ", " +
      date.getFullYear()
    );
  };

  const calculateMonth = (monthNum) => {
    switch (monthNum) {
      case 0:
        return "January";
      case 1:
        return "February";
      case 2:
        return "March";
      case 3:
        return "April";
      case 4:
        return "May";
      case 5:
        return "June";
      case 6:
        return "July";
      case 7:
        return "August";
      case 8:
        return "September";
      case 9:
        return "October";
      case 10:
        return "November";
      case 11:
        return "December";
      default:
        return "NotAMonth";
    }
  };

  const PastAppointments = () => {
    if (userAppointments?.length !== 0) {
      console.log("User appointments: " + userAppointments.length);

      return (
        <div>
          <List>
            <ListItem>
              <ListItemText>These are the appointments:</ListItemText>
            </ListItem>
            {userAppointments.map((event) => (
              <ListItem disablePadding>
                <ListItemText
                  primary={
                    toString(event.start.dateTime) + ", " + event.summary
                  }
                />
              </ListItem>
            ))}
          </List>
        </div>
      );
    } else {
      return <h2>No appointments booked yet</h2>;
    }
  };

  //This page will be where the user's old appointments are shown.
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>Past Appointments: </h1>
      <br />
      <PastAppointments />
    </div>
  );
};
