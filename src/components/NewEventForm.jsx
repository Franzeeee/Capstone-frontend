// EventModal.js
import React, { useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";

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
