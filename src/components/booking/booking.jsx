import React, { useState, useContext, useEffect } from "react";
import ApiCalendar from "react-google-calendar-api/src/ApiCalendar";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { BookingContext } from "../../context/booking/context";
import { useNavigate } from "react-router-dom";

export const Booking = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [treatment, setTreatment] = useState("");
  const { userInfo, dispatch } = useContext(BookingContext);
  const treatments = ["Botox", "Fillers", "Other"];
  const CALENDAR_ID = "ku77essnlhbq1afvib3jcsqmk8@group.calendar.google.com";

  useEffect(() => {
    //create a script element in the html that will access the google api.
    const script = document.createElement("script");
    script.async = true;
    script.defer = true;
    script.src = "https://apis.google.com/js/api.js";

    document.body.appendChild(script);

    script.addEventListener("load", () => {
      if (window.gapi) handleClientLoad();
    });
  }, []);

  const handleClientLoad = () => {
    //authorize the click
    ApiCalendar.onLoad(() => {
      ApiCalendar.handleAuthClick()
        .then(() => {
          console.log("sign in succesful!");
          dispatch({ type: "signUdate", sign: true });
          ApiCalendar.listUpcomingEvents(100, CALENDAR_ID)
            .then((res) => {
              console.log("Listing upcoming events");
              console.log(res.result);
              return res.result;
            })
            .then((data) => {
              if (data?.items) {
                setEvents(formatEvents(data.items));
              }
              console.log(events);
            });
        })
        .catch((e) => {
          console.error(`sign in failed ${e}`);
        });
    });
  };

  const formatEvents = (list) => {
    return list.map((item) => ({
      id: item.id,
      title: item.summary,
      start: item.start.dateTime || item.start.date,
      end: item.end.dateTime || item.end.date,
    }));
  };

  const handleDateSelect = (clickInfo) => {
    if (!userInfo.email) {
      setError(true);
    } else {
      setOpen(true);
      setSelectedEvent(clickInfo.event);
      var date = new Date(clickInfo.event.startStr);
      var end_date = new Date(clickInfo.event.endStr);
      var str =
        calculateMonth(date.getMonth()) +
        " " +
        date.getDate() +
        ", " +
        date.getFullYear();
      setSelectedDate(str);
      console.log(clickInfo.event);
    }
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
    }
  };

  const handleChange = (event) => {
    setTreatment(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const bookAppointment = () => {
    ApiCalendar.updateEvent(
      { atendees: [{ email: userInfo.email, displayName: "Patient" }] },
      selectedEvent.id
    )
      .then((result) => {
        if (!result.ok) return result;
        console.log("Successfully updated!!!!!!!!!!!!!!!!!!!!!!! 8D8D8D8D");
      })
      .catch((e) => {
        console.error(e);
      });
    handleClose();
  };

  const handleLogin = () => {
    let path = "/myAccount";
    navigate(path);
  };

  const ErrorDialog = () => {
    return (
      <Dialog
        open={error}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          ERROR: User not signed in
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            User must be signed in in order to book an appointment. We would
            love to see you in our office, so please sign in, and then you can
            book an appointment.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleLogin} autoFocus>
            Sign In
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        editable={true}
        selectable={true}
        selectMirror={true}
        //select={this.handleDateSelect}
        //eventContent={renderEventContent} // custom render function
        eventClick={handleDateSelect}
        //eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
      />

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {selectedDate} {selectedEvent.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              sx={{ width: 250 }}
              id="select-treatment"
              select
              label="Select the type of treatment:  "
              value={treatment}
              onChange={handleChange}
              variant="standard"
            >
              {treatments.map((option, index) => (
                <MenuItem key={index} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={bookAppointment} autoFocus>
            Book
          </Button>
        </DialogActions>
      </Dialog>
      <ErrorDialog />
    </div>
  );
};
