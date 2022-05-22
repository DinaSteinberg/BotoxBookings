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
import Alert from "@mui/material/Alert";
import Tooltip from "@mui/material/Tooltip";
import { BookingContext } from "../../context/booking/context";
import { useNavigate } from "react-router-dom";

export const Booking = (props) => {
  const navigate = useNavigate();
  const [events, setEvents] = useState(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [booked, setBooked] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [treatment, setTreatment] = useState("");
  const { userInfo, dispatch } = useContext(BookingContext);
  const treatments = ["Botox", "Fillers", "Other"];
  const CALENDAR_ID = "ku77essnlhbq1afvib3jcsqmk8@group.calendar.google.com";
  const [showError, setShowError] = useState(false);

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
    if (!userInfo.sign) {
      ApiCalendar.onLoad(() => {
        ApiCalendar.handleAuthClick()
          .then(() => {
            console.log("sign in succesful!");
            dispatch({ type: "signUpdate", sign: true });
            loadUpcomingEvents(function (data) {
              console.log("Events: " + data.map((e) => console.log(e)));
              dispatch({ type: "updateEvents", events: data });
            });
          })
          .catch((e) => {
            console.error(`sign in failed ${e}`);
          });
      });
    } else {
      loadUpcomingEvents();
    }
  };

  const loadUpcomingEvents = (_callback) => {
    ApiCalendar.listUpcomingEvents(100, CALENDAR_ID)
      .then((res) => {
        console.log("Listing upcoming events");
        console.log("Res.result: " + res.result);
        return res.result;
      })
      .then((data) => {
        if (data?.items) {
          console.log("formatting events");
          setEvents(formatEvents(data.items));
          _callback(data.items);
        }
      });
  };

  const formatEvents = (list) => {
    return list.map((item) => ({
      id: item.id,
      title: item.summary,
      start: item.start.dateTime || item.start.date,
      end: item.end.dateTime || item.end.date,
      alreadyBooked: item.attendees !== undefined,
    }));
  };

  const handleDateSelect = (clickInfo) => {
    if (!clickInfo.event.extendedProps.alreadyBooked) {
      if (!userInfo.email) {
        setError(true);
      } else {
        setOpen(true);
        setSelectedEvent(clickInfo.event);
        var date = new Date(clickInfo.event.startStr);
        var str =
          calculateMonth(date.getMonth()) +
          " " +
          date.getDate() +
          ", " +
          date.getFullYear();
        setSelectedDate(str);
      }
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
      default:
        return "NotAMonth";
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const bookAppointment = () => {
    if (treatment !== "") {
      ApiCalendar.updateEvent(
        {
          start: { dateTime: selectedEvent.start },
          end: { dateTime: selectedEvent.end },
          attendees: [{ email: userInfo.email, displayName: "Patient" }],
        },
        selectedEvent.id,
        CALENDAR_ID
      )
        .then((result) => {
          if (!result.ok) return result;
          console.log("Successfully updated!!!!!!!!!!!!!!!!!!!!!!! 8D8D8D8D");
        })
        .catch((e) => {
          console.log(e);
        });
      handleClose();
    } else setShowError(true);
  };

  const handleLogin = () => {
    let path = "/signIn";
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
          <Button onClick={setError(false)}>Cancel</Button>
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
        eventClick={handleDateSelect}
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
          {showError && (
            <Alert severity="error">Required fields were left out!</Alert>
          )}
          <TextField
            sx={{ width: 250 }}
            id="select-treatment"
            select
            label="Select the type of treatment:  "
            value={treatment}
            onChange={(event) => setTreatment(event.target.value)}
            variant="standard"
          >
            {treatments.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
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
