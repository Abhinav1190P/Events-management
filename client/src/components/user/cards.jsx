import React, { useState, useEffect } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button, Box, Modal } from '@mui/material';
import useAxiosPrivate from "@hooks/useAxiosPrivate";

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [openModal, setOpenModal] = useState(false); // State for modal open/close
  const [selectedEvent, setSelectedEvent] = useState(null); // State to store the selected event
  const api = useAxiosPrivate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.get('/api/user/get-events');
        setEvents(response.data?.events);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleRegisterClick = (event) => {
    console.log(event)
    setSelectedEvent(event);
    setOpenModal(true);
  };

  const handleConfirmRegistration = async () => {
    try {
      const event_id = selectedEvent._id;
  
      const { _id, ...registrationData } = selectedEvent;
  
      const response = await api.post('/api/user/create-registration', {
        ...registrationData, 
        event_id 
      });
      
      console.log('Registration created:', response.data);
      setOpenModal(false);
    } catch (error) {
      console.error('Error creating registration:', error);
    }
  };
  
  
  return (
    <>
      <Box sx={{ width: '100%', textAlign: 'center', my: 4 }}>
        <Typography variant="h4" component="h2" color="primary">
          Events
        </Typography>
      </Box>
      <Grid container spacing={4} sx={{ mt: 2, justifyContent: "center" }}>
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
                <Box sx={{ width: '60px', height: '4px', background: 'primary.main', margin: '0 auto 10px', borderRadius: '2px' }}></Box>
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
                  <Button variant="contained" size="small" color="primary" sx={{ mt: 2 }} onClick={() => handleRegisterClick(event)}>Register</Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you available on {selectedEvent && selectedEvent.createdAt.split('T')[0]}? For {selectedEvent && selectedEvent.name}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {/* Add your registration form here */}
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Button style={{ width: 'max-content' }} variant="contained" color="primary" fullWidth onClick={handleConfirmRegistration}>
                Confirm Registration
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button variant="contained" style={{ background: '#e3e3e3', marginLeft: 2 }} fullWidth onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
            </Grid>
          </Grid>

        </Box>
      </Modal>
    </>
  );
};

export default EventsSection;
