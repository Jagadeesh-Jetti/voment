import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchEvents } from "../../redux/eventSlice";
import "../Event/event.css";

export const Events = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { events, status, error } = useSelector((state) => state.events);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchEvents());
    }
  }, [status, dispatch]);

  return (
    <div className="events-container">
      <div className="header">
        <div className="title">Events</div>
        <div
          className="add-event-button"
          onClick={() => navigate("/add-event")}
        >
          Add Event
        </div>
      </div>
      {status === "loading" && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="events-display">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Location</th>
              <th>Description</th>
              <th>Role & Required Volunteers</th>
            </tr>
          </thead>
          <tbody>
            {events?.map((event) => (
              <tr key={event._id}>
                <td>
                  <Link className="event-link" to={`/event/${event._id}`}>
                    {event.name}
                  </Link>
                </td>
                <td>{new Date(event.date).toLocaleDateString()}</td>
                <td>{event.location}</td>
                <td>{event.description}</td>
                <td>
                  {event?.volunteers?.map((volunteer, index) => (
                    <div className="roles" key={index}>
                      Role: {volunteer.role} - Required Volunteers:{" "}
                      {volunteer.number}
                    </div>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
