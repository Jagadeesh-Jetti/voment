// AddEvent.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { addEvent, updateEvent } from "../../redux/eventSlice";
import "./eventForm.css";

export const AddEvent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const event = state ? state : null;

  const [data, setData] = useState({
    name: event ? event.name : "",
    date: event ? event.date : "",
    location: event ? event.location : "",
    description: event ? event.description : "",
    volunteers: event ? event.volunteers : [{ role: "", number: 0 }],
  });

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedEventData = [...data.volunteers];

    if (name === "role") {
      updatedEventData[index].role = value;
    } else if (name === "number") {
      updatedEventData[index].number = parseInt(value, 10);
    }

    setData({ ...data, volunteers: updatedEventData });
  };

  const addRole = () => {
    setData({
      ...data,
      volunteers: [...data.volunteers, { role: "", number: 0 }],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      name: data.name,
      date: data.date,
      location: data.location,
      description: data.description,
      volunteers: data.volunteers,
    };

    if (event) {
      dispatch(updateEvent({ id: event._id, newData: newEvent }));
    } else {
      dispatch(addEvent(newEvent));
    }

    setData({
      name: "",
      date: "",
      location: "",
      description: "",
      volunteers: [{ role: "", number: 0 }],
    });
    navigate("/events");
  };

  return (
    <div className="add-event-container-custom">
      <h2>Create New Event</h2>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            defaultValue={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            placeholder="Name"
            required
          />
          <input
            type="date"
            name="date"
            defaultValue={data.date}
            onChange={(e) => setData({ ...data, date: e.target.value })}
            required
          />
          <input
            type="text"
            name="location"
            defaultValue={data.location}
            onChange={(e) => setData({ ...data, location: e.target.value })}
            placeholder="Location"
            required
          />
          <input
            name="description"
            defaultValue={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            placeholder="Description"
            required
          />

          {data.volunteers &&
            data.volunteers.map((roleData, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="role"
                  defaultValue={roleData.role}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder="Role"
                  required
                />
                <input
                  type="number"
                  name="number"
                  defaultValue={roleData.number}
                  onChange={(e) => handleInputChange(e, index)}
                  placeholder="Number"
                  required
                />
              </div>
            ))}

          <button type="button" onClick={addRole}>
            Add Role
          </button>
          <button type="submit">{event ? "Update" : "Create"} Event</button>
        </form>
      </div>
    </div>
  );
};
