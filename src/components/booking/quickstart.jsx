import React, { useState, useEffect, useContext } from "react";
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
import { DateEnv } from "fullcalendar";

export const Quickstart = () => {
  const SCOPES =
    "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.events";
  const CLIENT_ID =
    "774541693087-bvae5jevhit1gcf8irikmeii9fragatv.apps.googleusercontent.com";
  const API_KEY = "AIzaSyBWYOz7yQynF0NnkhgzGv8B1BKlJWI0JkU";
  const CALENDAR_ID = "ku77essnlhbq1afvib3jcsqmk8@group.calendar.google.com";
  const DISCOVERY_DOCS =
    "https://googleapis.com/discovery/v1/apis/calendar/v3/rest";
  const [events, setEvents] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [treatment, setTreatment] = useState("");
  const { userInfo, dispatch } = useContext(BookingContext);

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

  // const handleClientLoad = () => {
  //   window.gapi.load("client:auth2", initClient);
  // };

  const handleClientLoad = () => {
    window.gapi.load("client:auth2", () => {
      console.log("client loaded");
      window.gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES,
      });

      window.gapi.client.load("caledar", "v3", () => console.log("bam!"));

      window.gapi.auth2
        .getAuthInstance()
        .signIn()
        .then(
          (res) =>
            fetch(
              `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&orderBy=startTime&singleEvents=true`,
              {
                headers: {
                  Authorization: res,
                },
              }
            )
              .then((res) => {
                return res.json();
              })
              .then((data) => {
                if (data?.items) {
                  setEvents(formatEvents(data.items));
                }
                console.log(data);
              })
          //.then(() => listUpcomingEvents())
        );
    });
  };

  // const openSignInPopup = () => {
  //   window.gapi.auth2.authorize(
  //     { client_id: CLIENT_ID, scope: SCOPES },
  //     (res) => {
  //       if (res) {
  //         if (res.access_token)
  //           localStorage.setItem("access_token", res.access_token);
  //         console.log(res);

  //         // Load calendar events after authentication
  //         window.gapi.client.load("calendar", "v3", listUpcomingEvents);
  //       }
  //     }
  //   );
  // };

  // const initClient = () => {
  //   //If the user is not authenticated, make them sign in.
  //   if (!localStorage.getItem("access_token")) {
  //     openSignInPopup();
  //   } else {
  //     //Get events if access token is found without sign in popup
  //     fetch(
  //       `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&orderBy=startTime&singleEvents=true`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  //         },
  //       }
  //     )
  //       .then((res) => {
  //         // Check if unauthorized status code. If it's unauthorized, open sign in popup
  //         if (res.status !== 401) {
  //           return res.json();
  //         } else {
  //           localStorage.removeItem("access_token");

  //           openSignInPopup();
  //         }
  //       })
  //       .then((data) => {
  //         if (data?.items) {
  //           setEvents(formatEvents(data.items));
  //         }
  //         console.log(data);
  //       })
  //       .then(() => listUpcomingEvents());
  //   }
  // };

  const listUpcomingEvents = () => {
    window.gapi.client.calendar.events
      .list({
        // Fetch events from user's primary calendar
        calendarId: CALENDAR_ID,
        showDeleted: true,
        singleEvents: true,
      })
      .then(function (response) {
        let eventList = response.result.items;

        if (eventList.length > 0) {
          setEvents(formatEvents(eventList));
        }
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
  };

  const handleChange = (event) => {
    setTreatment(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const bookAppointment = () => {
    // Update the event
    var immediate = true;
    var resource = {
      start: { dateTime: selectedEvent.start },
      end: { dateTime: selectedEvent.end },
      attendees: [{ email: userInfo.email }],
    };
    window.gapi.auth.authorize(
      { client_id: CLIENT_ID, scope: SCOPES, immediate: immediate },
      (authResult) => {
        if (authResult && !authResult.error) {
          window.gapi.client.calendar.events
            .update({
              calendarId: CALENDAR_ID,
              eventId: selectedEvent.id,
              resource: resource,
            })
            .then((result) => {
              if (!result.ok) throw result;
              else {
                console.log("Success!");
              }
            })
            .catch((error) => {
              console.log(error);
            });
          handleClose();
        } else {
          console.log(authResult.error);
        }
      }
    );
  };

  const treatments = ["Botox", "Fillers", "Other"];

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
    </div>
  );
};
