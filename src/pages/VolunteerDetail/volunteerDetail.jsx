import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { deleteVolunteer } from "../../redux/volunteerSlice";
import "../VolunteerDetail/volunteerDetail.css";

export const VolunteerDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const volunteer = useSelector((state) =>
    state.volunteers.volunteers.find((volunteer) => volunteer._id === id)
  );

  const deleteVolunteerItem = (id) => {
    dispatch(deleteVolunteer(id));
    navigate("/");
  };

  return (
    <div className="volunteer-detail">
      <h2>Volunteer Details</h2>
      <p>Name: {volunteer?.name}</p>
      <p>Age: {volunteer?.age}</p>
      <p>Gender: {volunteer?.gender}</p>
      <p>
        Skills:{" "}
        {volunteer?.skills?.map((s, i) => (
          <span key={i}> {s} </span>
        ))}
      </p>
      <p>Contact Details: {volunteer?.contact}</p>
      <p>Availability: {volunteer?.availability ? "Yes" : "No"}</p>
      <p>
        Area Of Interest:{" "}
        {volunteer?.areaOfInterest?.map((a, i) => (
          <span key={i}> {a} </span>
        ))}
      </p>
      <button>
        <Link to={`/volunteer/edit/${volunteer?._id}`} state={volunteer}>
          Edit
        </Link>
      </button>
      <button onClick={() => deleteVolunteerItem(volunteer?._id)}>
        Delete
      </button>
    </div>
  );
};
