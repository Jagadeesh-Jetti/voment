import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { deleteEvent } from "../../redux/eventSlice";
import "../EventDetail/eventDetail.css";

export const EventDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const event = useSelector((state) =>
    state.events.events.find((event) => event._id === id)
  );

  const deleteEventItem = (id) => {
    dispatch(deleteEvent(id));
    navigate("/events");
  };

  return (
    <div className="event-detail">
      <h2>Event Details</h2>
      <p>Name: {event?.name}</p>
      <p>Date: {event?.date}</p>
      <p>Location: {event?.location}</p>
      <p>Description: {event?.description}</p>
      <>
        Role & Required Volunteers:{" "}
        {event?.volunteers?.map((r, index) => (
          <div className="roles" key={index}>
            Role: {r.role} Required Volunteers: {r.number}
          </div>
        ))}
      </>

      <button>
        <Link to={`/event/edit/${event?._id}`} state={event}>
          Edit
        </Link>
      </button>
      <button onClick={() => deleteEventItem(event?._id)}>Delete</button>
    </div>
  );
};
