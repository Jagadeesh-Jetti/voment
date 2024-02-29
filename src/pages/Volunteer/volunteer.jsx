import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchVolunteers } from "../../redux/volunteerSlice";
import "../Volunteer/volunteer.css";

export const Volunteers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { volunteers, status, error } = useSelector(
    (state) => state.volunteers
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchVolunteers());
    }
  }, [status, dispatch]);

  return (
    <div className="volunteers-container">
      <div className="header">
        <h1>Volunteers</h1>
        <div
          className="add-volunteer"
          onClick={() => navigate("/add-volunteer")}
        >
          Add Volunteer
        </div>
      </div>
      {status === "loading" && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="volunteer-display">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Availability</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
            {volunteers?.map((volunteer) => (
              <tr key={volunteer?._id}>
                <td>
                  <Link
                    className="volunteer-link"
                    to={`/volunteer/${volunteer._id}`}
                  >
                    {volunteer.name}
                  </Link>
                </td>
                <td>{volunteer.age}</td>
                <td>{volunteer.gender}</td>
                <td>{volunteer.availability ? "Yes" : "No"}</td>
                <td>{volunteer?.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
