import { useState } from "react";

import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  ListItemIcon,
  Collapse,
} from "@mui/material";



const EventsPage = ({ event }) => {
  const [selectedEventId, setSelectedEventId] = useState(null);
  console.log(event)

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>
        {event && event.name} {/* Access event properties directly */}
      </Typography>
      <img src={event && event.banner} alt={event && event.name} style={{ maxWidth: '100%', marginBottom: 20 }} />
      <Typography variant="subtitle1">
        Club: {event && event.club}
      </Typography>
      <Typography variant="subtitle1">
        Date: {event && new Date(event.date).toLocaleDateString()}
      </Typography>
      <Typography variant="subtitle1">
        Time: {event && event.time}
      </Typography>
      <Typography variant="subtitle1">
        Venue: {event && event.venue}
      </Typography>
      <Typography variant="subtitle1">
        Description: {event && event.description}
      </Typography>
      <Drawer
        anchor="right"
        open={selectedEventId !== null}
        onClose={() => setSelectedEventId(null)}
      >
        <List>
          {/* You can add additional details or actions here */}
          <ListItem button>
            <ListItemText primary="Example Action" />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default EventsPage;
