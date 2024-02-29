import "./App.css";
import { Navbar } from "./components/Navbar/navbar";
import { Routes, Route } from "react-router-dom";
import { Events } from "./pages/Event/event";
import { Volunteers } from "./pages/Volunteer/volunteer";
import { VolunteerDetail } from "./pages/VolunteerDetail/volunteerDetail";
import { EventDetail } from "./pages/EventDetail/eventDetail";
import { AddEvent } from "./components/EventForm/eventForm";
import { AddVolunteer } from "./components/VolunteerForm/volunteerForm";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Volunteers />} />
        <Route path="/events" element={<Events />} />

        <Route path="/volunteer/:id" element={<VolunteerDetail />} />
        <Route path="/event/:id" element={<EventDetail />} />

        <Route path="/add-event" element={<AddEvent />} />
        <Route path="/add-volunteer" element={<AddVolunteer />} />

        <Route path="/event/edit/:id" element={<AddEvent />} />
        <Route path="/volunteer/edit/:id" element={<AddVolunteer />} />
      </Routes>
    </div>
  );
}

export default App;
