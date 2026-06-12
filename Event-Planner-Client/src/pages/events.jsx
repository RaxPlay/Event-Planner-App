import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Events = ({ user }) => {
  const [eventDisplay, setEventDisplay] = useState([]);

  useEffect(() => {
    const getUserEvents = async () => {
      try {
        const res = await axios.get("/event/get-events");
        setEventDisplay(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    getUserEvents();
  }, []);

  const deleteEvent = async (event_id) => {
    setEventDisplay(
      eventDisplay.filter((event) => event.event_id !== event_id),
    );
    try {
      await axios.delete(`/event/delete-event/${event_id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center">
      <div id="events-container" className="mt-15">
        {eventDisplay.map((event) => (
          <div id="event" key={event.event_id} className="text-center mt-10">
            <h2>{event.event_name}</h2>
            <p className="mt-1">{event.description}</p>
            <p className="mt-1">
              {event.event_date.substr(0, 10)}, {event.event_time.substr(0, 5)}
            </p>
            <div id="event-buttons-container" className="mt-5">
              <button
                onClick={() => deleteEvent(event.event_id)}
                className="delete-button"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
