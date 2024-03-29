import React, { useState } from 'react';
import Dropdown from '../dropdown/dropdown';
import '../../styles/EventsPage.css'

// Sample data for demonstration



const EventDetails = ({ event }) => {
  if (!event) return null;

  return (
    <div className="event-details">
      <h2>Event Details</h2>
      <p><strong>Name:</strong> {event.name}</p>
      <p><strong>Email:</strong> {event.email}</p>
      <p><strong>Domain:</strong> {event.domain}</p>
      <p><strong>Phone:</strong> {event.phone}</p>
      <p><strong>Qualification:</strong> {event.qualification}</p>
      <p><strong>Created On:</strong> {event.createdOn}</p>
      <p><strong>Country:</strong> {event.country}</p>
    </div>
  );
};

const EventsPage = (event) => {
  const [selectedEventId, setSelectedEventId] = useState(null);

  return (
    <div className="events-container">
      <EventDetails /* event={selectedEvent} */ />
    </div>
  );
};

export default EventsPage;
