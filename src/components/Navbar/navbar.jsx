import "../Navbar/navbar.css";
import { useNavigate } from "react-router";

export const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <h2 className="title"> Volunteer Management</h2>
      <div className="options_container">
        <h3 onClick={() => navigate("/events")}> Events </h3>
        <h3 onClick={() => navigate("/")}> Volunteers </h3>
      </div>
    </div>
  );
};
