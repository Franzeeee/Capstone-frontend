// EventModal.js
import React, { useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";
import customFetch from "../utils/fetchApi";
import { format } from "date-fns";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function NewEventForm({ open, onClose, onAddEvent }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEvent({
      id: Math.random().toString(),
      title,
      description,
      start,
      end,
    });

    const evenData = new FormData();
    evenData.append("title", title);
    evenData.append("description", description);
    evenData.append("start_date", format(new Date(start), "yyyy-MM-dd"));
    evenData.append("start_time", format(new Date(start), "HH:mm"));
    evenData.append("end_date", format(new Date(end), "yyyy-MM-dd"));
    evenData.append("end_time", format(new Date(end), "HH:mm"));

    customFetch("/events/create", {
      method: "POST",
      contentType: "application/json",
      body: evenData,
    })
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.error(err);
    });    

    setTitle("");
    setDescription("");
    setStart("");
    setEnd("");
    onClose(); // Close the modal after submitting
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <span>Add Event</span>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Start Date and Time"
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="End Date and Time"
            type="datetime-local"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add Event
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
