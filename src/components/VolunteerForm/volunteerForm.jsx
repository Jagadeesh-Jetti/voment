// AddVolunteer.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { addVolunteer, updateVolunteer } from "../../redux/volunteerSlice";
import "../VolunteerForm/volunteerForm.css";

export const AddVolunteer = () => {
  let { state } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const volunteer = state ? state : null;

  const [data, setData] = useState({
    name: volunteer ? volunteer.name : "",
    age: volunteer ? volunteer.age : "",
    gender: volunteer ? volunteer.gender : "",
    skills: volunteer ? volunteer.skills.join(" ") : "",
    contact: volunteer ? volunteer.phoneNumber : "",
    availability: volunteer ? volunteer.availability : null,
    areaOfInterest: volunteer ? volunteer.interests.join(" ") : "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === "skills" || name === "areaOfInterest") {
      setData({ ...data, [name]: value.trim().split(" ") });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newVolunteer = {
      name: data.name,
      age: data.age,
      gender: data.gender,
      skills: data.skills,
      phoneNumber: data.contact,
      availability: data.availability,
      interests: data.areaOfInterest,
    };

    if (volunteer) {
      dispatch(updateVolunteer({ id: volunteer._id, newData: newVolunteer }));
    } else {
      dispatch(addVolunteer(newVolunteer));
    }

    setData({
      name: "",
      age: "",
      gender: "",
      skills: "",
      contact: "",
      availability: null,
      areaOfInterest: "",
    });
    navigate("/volunteers");
  };

  return (
    <div className="form-div">
      <h2>{volunteer ? "Edit Volunteer" : "Add Volunteer"}</h2>
      <div className="form-div-child">
        <input
          name="name"
          defaultValue={data?.name}
          onChange={handleInput}
          placeholder="Name"
          type="text"
        />
        <input
          name="age"
          defaultValue={data?.age}
          onChange={handleInput}
          placeholder="Age"
          type="number"
        />
        <input
          name="gender"
          defaultValue={data?.gender}
          onChange={handleInput}
          placeholder="Gender"
          type="text"
        />
        <input
          name="skills"
          defaultValue={data?.skills}
          onChange={handleInput}
          placeholder="Skills"
          type="text"
        />
        <select
          name="availability"
          defaultValue={data?.availability}
          onChange={handleInput}
        >
          <option>Availability</option>
          <option value={true}>Yes</option>
          <option value={false}>No</option>
        </select>
        <input
          name="contact"
          defaultValue={data?.contact}
          onChange={handleInput}
          placeholder="Contact"
          type="number"
        />
        <input
          name="areaOfInterest"
          defaultValue={data?.areaOfInterest}
          onChange={handleInput}
          placeholder="Area Of Interest"
          type="text"
        />
      </div>
      <button onClick={handleSubmit}>{volunteer ? "Update" : "Add"}</button>
    </div>
  );
};
