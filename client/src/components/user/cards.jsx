import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import useAxiosPrivate from "@hooks/useAxiosPrivate";
import {useState,useEffect} from 'react';

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const api = useAxiosPrivate()
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('http://localhost:4000/api/user/get-events');
        setEvents(response.data?.events);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, []);
  console.log(events);
  return (
    <>
    <Box sx={{ width: '100%', textAlign: 'center', my: 4 }}>
      <Typography variant="h4" component="h2" color="primary">
        Events
      </Typography>
    </Box>
    <Grid container spacing={4} sx={{ mt: 2 , justifyContent:"center"}}>
      {events.map((event) => (
        <Grid item xs={12} sm={6} md={3} key={event.id}>
          <Card sx={{
            position: 'relative',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'scale(1.03)',
            },
            '&:hover .moreInfo': {
              opacity: 1,
              marginTop: '0',
            },
            background: '#f9f9f9', 
          }}>
            <CardMedia
              component="img"
              image={event.banner}
              alt={event.title}
              sx={{
                height: 140,
              }}
            />
            <CardContent sx={{
                minHeight: 140, 
                textAlign: 'center', 
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center', 
              }}>
              <Typography gutterBottom variant="h5" component="div" color="secondary">
                {event.title}
              </Typography>
              <Box sx={{ width: '60px', height: '4px', background: 'primary.main', margin: '0 auto 10px', borderRadius: '2px' }}></Box> {/* Small line below the title */}
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}> 
                 {event.club} 
              </Typography>
              <Typography variant="body2" color="text.secondary">
                  {new Date(event.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                 })}
               </Typography>
              <Box className="moreInfo" sx={{
                opacity: 0,
                transition: 'opacity 0.3s ease, margin-top 0.3s ease',
                marginTop: '-20px',
                textAlign: 'center', 
              }}>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Time: {event.time}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Venue: {event.venue}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.description}
                </Typography>
                <Button variant="contained" size="small" color="primary" sx={{ mt: 2 }}>Register</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </>
  );
};


export default EventsSection; 