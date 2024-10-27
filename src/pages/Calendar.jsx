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

export default function Calendar() {
  const userData = localStorage.getItem("userData");
  const [user, setUser] = useState(
    JSON.parse(
      CryptoJS.AES.decrypt(userData, "capstone").toString(CryptoJS.enc.Utf8)
    )
  );

  const plugins = [
    createEventsServicePlugin(),
    createDragAndDropPlugin(),
    createEventModalPlugin(),
  ];

  const calendar = useCalendarApp(
    {
      views: [
        createViewDay(),
        createViewWeek(),
        createViewMonthGrid(),
        createViewMonthAgenda(),
      ],
      events: [],
    },
    plugins
  );

  useEffect(() => {
    calendar.eventsService.getAll();
  }, []);

  const [openModal, setOpenModal] = useState(false);

  const handleAddEvent = (event) => {
    calendar.eventsService.add(event);
  };

  return (
    <HomeTemplate>
      <div className={`${styles.container}`}>
        <div className={`${styles.contentContainer}`}>
          <div className={`${styles.header}`}>
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
        <div className={`${styles.profileContainer}`}>
          <ProfileSide info={user} />
        </div>
      </div>
    </HomeTemplate>
  );
}
