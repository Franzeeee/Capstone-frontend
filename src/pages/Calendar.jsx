import React, { useState, useEffect } from "react";
import styles from "../assets/css/pages/announcement.module.css";
import CryptoJS from "crypto-js";
import HomeTemplate from "../templates/HomeTemplate";
import ProfileSide from "../components/ProfileSide";
import { useCalendarApp, ScheduleXCalendar } from "@schedule-x/react";
import {
  createViewDay,
  createViewMonthAgenda,
  createViewMonthGrid,
  createViewWeek,
} from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import "@schedule-x/theme-default/dist/index.css";
import { createDragAndDropPlugin } from "@schedule-x/drag-and-drop";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import NewEventForm from "../components/NewEventForm";
import { Button } from "@mui/material";
import { format } from "date-fns";
import customFetch from "../utils/fetchApi";

export default function Calendar() {
  const userData = localStorage.getItem("userData");
  const [user, setUser] = useState(
    JSON.parse(
      CryptoJS.AES.decrypt(userData, "capstone").toString(CryptoJS.enc.Utf8)
    )
  );

  const plugins = [
    createEventsServicePlugin(),
    createEventModalPlugin(),
  ];

  const calendar = useCalendarApp(
    {
      defaultView: createViewMonthGrid(),
      views: [
        createViewMonthGrid(),
        createViewDay(),
        createViewWeek(),
        createViewMonthAgenda(),
      ],
      events: [],
    },
    plugins
  );

  useEffect(() => {
    customFetch('/events/fetch')
      .then(data => {

        const formattedEvents = data.map(event => {
          const startDateTime = `${event.start_date}T${event.start_time}`;
          const endDateTime = `${event.end_date}T${event.end_time}`;

          return {
            id: event.id.toString(),
            title: event.title,
            description: event.description,
            start: format(new Date(startDateTime), "yyyy-MM-dd HH:mm"),
            end: format(new Date(endDateTime), "yyyy-MM-dd HH:mm"),
          };
        });

        // Add each event to the calendar
        formattedEvents.forEach(event => calendar.eventsService.add(event));
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
  }, [calendar.eventsService]);

  
  const [openModal, setOpenModal] = useState(false);

  const handleAddEvent = (event) => {
    const formattedEvent = {
      ...event,
      start: format(new Date(event.start), "yyyy-MM-dd HH:mm"),
      end: format(new Date(event.end), "yyyy-MM-dd HH:mm"),
    };
    calendar.eventsService.add(formattedEvent);
  };

  return (
    <HomeTemplate>
      <div
        className={`${styles.container}`}
        style={{ gridTemplateColumns: "1fr" }}
      >
        <div className={`${styles.contentContainer}`}>
          <div className={`${styles.header}`} style={{display: "flex", flexDirection: 'column'}}>
            <div className={`${styles.create}`}>
              <p>Calendar</p>
              <Button
                variant="contained"
                color="primary"
                onClick={() => setOpenModal(true)}
              >
                Add Event
              </Button>
            </div>
            <ScheduleXCalendar calendarApp={calendar} />
          </div>
        </div>
        <NewEventForm
          open={openModal}
          onClose={() => setOpenModal(false)}
          onAddEvent={handleAddEvent}
        />
      </div>
    </HomeTemplate>
  );
}
