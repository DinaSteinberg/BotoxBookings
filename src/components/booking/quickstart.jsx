import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export const Quickstart = () => {
  const SCOPES =
    "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar.events";
  const CLIENT_ID =
    "774541693087-bvae5jevhit1gcf8irikmeii9fragatv.apps.googleusercontent.com";
  const API_KEY = "AIzaSyBWYOz7yQynF0NnkhgzGv8B1BKlJWI0JkU";
  const CALENDAR_ID = "ku77essnlhbq1afvib3jcsqmk8@group.calendar.google.com";
  const [events, setEvents] = useState(null);

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
    window.gapi.load("client:auth2", initClient);
  };

  const openSignInPopup = () => {
    window.gapi.auth2.authorize(
      { client_id: CLIENT_ID, scope: SCOPES },
      (res) => {
        if (res) {
          if (res.access_token)
            localStorage.setItem("access_token", res.access_token);
          console.log(res);

          // Load calendar events after authentication
          window.gapi.client.load("calendar", "v3", listUpcomingEvents);
        }
      }
    );
  };

  const initClient = () => {
    //If the user is not authenticated, make them sign in.
    if (!localStorage.getItem("access_token")) {
      openSignInPopup();
    } else {
      //Get events if access token is found without sign in popup
      fetch(
        `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}&orderBy=startTime&singleEvents=true`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      )
        .then((res) => {
          // Check if unauthorized status code. If it's unauthorized, open sign in popup
          if (res.status !== 401) {
            return res.json();
          } else {
            localStorage.removeItem("access_token");

            openSignInPopup();
          }
        })
        .then((data) => {
          if (data?.items) {
            setEvents(formatEvents(data.items));
          }
        });
      listUpcomingEvents();
    }
  };

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

  const handleDateSelect = () => {};

  const formatEvents = (list) => {
    return list.map((item) => ({
      title: item.summary,
      start: item.start.dateTime || item.start.date,
      end: item.end.dateTime || item.end.date,
    }));
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      editable={true}
      selectable={true}
      selectMirror={true}
      //select={this.handleDateSelect}
      //eventContent={renderEventContent} // custom render function
      //eventClick={this.handleEventClick}
      //eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
    />
  );
};
