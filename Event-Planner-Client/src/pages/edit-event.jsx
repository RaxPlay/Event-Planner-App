import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export const EditEvent = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [oldEventInfo, setOldEventInfo] = useState({});
  const [editEventForm, setEditEventForm] = useState({
    event_name: ``,
    description: ``,
    event_date: ``,
    event_time: ``,
  });

  const editEvent = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `/event/edit-event/${eventId}`,
        editEventForm,
      );

      navigate("/saved-events")
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const getEvent = async () => {
      try {
        const res = await axios.get(`/event/get-event/${eventId}`);

        setEditEventForm(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getEvent();
  }, []);

  return (
    <div id="modal">
      <div id="modal-content" className="text-center">
        <h2>Event Editing Mode</h2>
        <form onSubmit={() => editEvent(eventId)} className="mt-4 mb-3">
          <input
            type="text"
            placeholder="Event Name (optional)"
            value={editEventForm.event_name}
            onChange={(e) => {
              setEditEventForm({
                ...editEventForm,
                event_name: e.target.value,
              });
            }}
          />

          <div className="mt-3">
            <input
              type="text"
              placeholder="Description (optional)"
              value={editEventForm.description}
              onChange={(e) => {
                setEditEventForm({
                  ...editEventForm,
                  description: e.target.value,
                });
              }}
            />
          </div>

          <div className="mt-3">
            <input
              type="date"
              value={editEventForm.event_date}
              onChange={(e) => {
                setEditEventForm({
                  ...editEventForm,
                  event_date: e.target.value,
                });
              }}
            />
          </div>

          <div className="flex justify-center gap-2 mt-3">
            <input
              type="time"
              placeholder="1:30 AM"
              value={editEventForm.event_time}
              onChange={(e) => {
                setEditEventForm({
                  ...editEventForm,
                  event_time: e.target.value,
                });
              }}
              className="time-input"
            />

            <button id="form-button" onClick={editEvent}>
              <i className="fa-solid fa-arrow-up"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
