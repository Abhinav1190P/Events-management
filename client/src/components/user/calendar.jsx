import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Box, styled } from '@mui/material';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import useAxiosPrivate from "@hooks/useAxiosPrivate";

const localizer = momentLocalizer(moment);



// Updated Custom Styled Box for Calendar with vibrant colors and contrast
const StyledCalendarBox = styled(Box)({
  '& .rbc-calendar': {
    backgroundColor: '#ffffff',
    border: '1px solid #4fc3f7',
    borderRadius: '8px',
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.05)',
  },
  '& .rbc-header': {
    backgroundColor: '#039be5',
    color: '#fff',
    fontWeight: 'bold',
    padding: '10px 0',
    textTransform: 'uppercase',
    letterSpacing: '0.05rem',
  },
  '& .rbc-today': {
    backgroundColor: '#e1f5fe',
  },
  '& .rbc-off-range-bg': {
    backgroundColor: '#f7f7f7',
  },
  '& .rbc-event': {
    backgroundColor: '#4fc3f7',
    color: '#fff',
    borderRadius: '4px',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '4px 8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    transition: 'background-color 0.3s ease, color 0.3s ease',
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#039be5',
    },
  },
  '& .rbc-event-label': {
    fontSize: '0.85em',
    color: '#333',
  },
  '& .rbc-row-segment': {
    padding: '2px 4px',
  },
  '& .rbc-selected': {
    backgroundColor: '#0288d1',
    color: '#fff',
  },
  '& .rbc-show-more': {
    color: '#039be5',
    background: 'transparent',
  },
  '& .rbc-day-slot .rbc-time-slot': {
    borderBottom: 'none',
  },
  '& .rbc-time-header': {
    borderBottom: '1px solid #4fc3f7',
    padding: '10px 0',
  },
  '& .rbc-time-content': {
    '& .rbc-time-gutter, & .rbc-allday-cell': {
      borderRight: '1px solid #4fc3f7',
      background: '#f7f7f7',
    },
  },
});


const MyCalendar = () => {
  const [events, setEvents] = useState([]);
  const api = useAxiosPrivate();

  useEffect(() => {
    api.get("http://localhost:4000/api/user/get-my-registered-events")
      .then(({ data }) => {
        const formattedEvents = data.events.map((event) => {
          const [year, month, day] = event.date.split("T")[0].split("-").map(num => parseInt(num, 10));
          const localDate = new Date(year, month - 1, day);
          return {
            title: event.title || 'Event',
            start: localDate,
            end: localDate,
            allDay: true,
          };
        });

        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error("Error fetching events: ", error);
      });
  }, [api]);
  console.log(events)
  return (
    <StyledCalendarBox>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, width: 900, margin: '20px 0', marginRight: '50px' }}
      />
    </StyledCalendarBox>
  );
};

export default MyCalendar;
