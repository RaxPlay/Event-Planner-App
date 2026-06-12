import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export const Home = ({ user }) => {
  const navigate = useNavigate();
  const [eventForm, setEventForm] = useState({
    event_name: "",
    description: "",
    event_date: "",
    event_time: "",
  });

  const newEvent = async (e) => {
    e.preventDefault();
    try {
      if (
        eventForm.event_name === "" ||
        eventForm.event_date === "" ||
        eventForm.event_time === ""
      ) {
        return alert("All inputs are required!");
      }

      await axios.post("/event/create-event", eventForm);
      alert(`Event added to your calendar!`);
      navigate("/saved-events");
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
                  placeholder="Description (optional)"
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

              <div className="flex justify-center gap-2 mt-3">
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
        <div className="flex justify-center">
          <div id="container" className="mt-20">
            <h2>
              Please{" "}
              <Link to="/login" className="hover:underline">
                Login
              </Link>{" "}
              or{" "}
              <Link to="/sign-up" className="hover:underline">
                Sign-up
              </Link>{" "}
              First
            </h2>
          </div>
        </div>
      )}
    </div>
  );
};
