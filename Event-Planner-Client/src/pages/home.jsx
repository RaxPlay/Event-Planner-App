import axios from "axios";
import React, { useState } from "react";

export const Home = ({ user }) => {
  const [eventForm, setEventForm] = useState({
    event_name: "",
    description: "",
    event_date: "",
    event_time: "",
  });
  const [displayEvent, setDisplayEvent] = useState([]);

  const newEvent = async (e) => {
    e.preventDefault();
    try {
      if (
        eventForm.event_name === "" ||
        eventForm.description === "" ||
        eventForm.event_date === "" ||
        eventForm.event_time === ""
      ) {
        return alert("All inputs are required!");
      }

      const res = await axios.post("/event/create-event", eventForm);
      setDisplayEvent(res.data);
      alert(`Event added to your calendar!`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {user ? (
        <div className="flex justify-center text-center mt-20">
          <div>
            <h1>
              Welcome <span className="underline">{user.username}</span>
            </h1>

            <form id="container" className="mt-10">
              <h2 className="mb-5">
                Add <span className="underline">New Event</span>
              </h2>

              <input
                type="text"
                placeholder="Event Name"
                value={eventForm.event_name}
                onChange={(e) => {
                  setEventForm({ ...eventForm, event_name: e.target.value });
                }}
                required
              />

              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Event Description"
                  value={eventForm.description}
                  onChange={(e) => {
                    setEventForm({ ...eventForm, description: e.target.value });
                  }}
                  required
                />
              </div>

              <div className="mt-3">
                <input
                  type="date"
                  value={eventForm.event_date}
                  onChange={(e) => {
                    setEventForm({ ...eventForm, event_date: e.target.value });
                  }}
                  required
                />
              </div>

              <div className="flex justify-center gap-1 mt-3">
                <input
                  type="time"
                  placeholder="1:30 AM"
                  value={eventForm.event_time}
                  onChange={(e) => {
                    setEventForm({ ...eventForm, event_time: e.target.value });
                  }}
                  required
                  className="time-input"
                />

                <button id="form-button" onClick={newEvent}>
                  <i className="fa-solid fa-arrow-up"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
