import * as React from 'react';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Grid, Paper } from '@mui/material';
import dayjs from 'dayjs'; // Import dayjs

export default function CalendarComponent() {
  const [value, setValue] = React.useState(dayjs()); // Initialize with a Day.js object

  // Mock list of upcoming events
  const events = [
    { date: '2024-03-10', title: 'Event 1' },
    { date: '2024-03-15', title: 'Event 2' },
    { date: '2024-03-20', title: 'Event 3' },
  ];

  // Define colors and styles for a sleek look
  const paperStyle = {
    backgroundColor: '#ffffff', // Light background for contrast
    color: '#333333', // Dark text for readability
    p: 2, // Padding around the content
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Soft shadow for depth
  };

  const listStyle = {
    maxHeight: 500,
    overflow: 'auto',
    backgroundColor: '#f7f7f7', // Slightly off-white for the list background
    p: 2,
    borderRadius: '4px', // Rounded corners for the list
  };

  const datePickerStyle = {
    '.MuiCalendarPicker-root': {
      backgroundColor: '#f0f0f0', // Light gray background for the calendar
    },
    '.MuiPickersDay-dayWithMargin': {
      color: 'black', // Highlight color for the days
    },
    '.MuiPickersDay-today': {
      border: '1px solid #1976d2', // Border for today
    },
    width: '100%',
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={2} sx={{ width: 'auto', margin: 'auto',mt:4 }}>
        <Grid item xs={12} md={8} lg={6}>
          <Paper elevation={3} sx={paperStyle}>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              openTo="day"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
              sx={datePickerStyle}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={6}>
          <Paper elevation={3} sx={listStyle}>
            <List>
              {events.map((event, index) => (
                <ListItem key={index}>
                  <ListItemText primary={event.title} secondary={event.date} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </LocalizationProvider>
  );
}
