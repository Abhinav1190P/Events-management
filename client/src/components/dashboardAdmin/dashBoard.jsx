import React, { useState, useEffect } from 'react';
import { Box, Button, Card, CardContent, Typography, Grid, styled, keyframes } from '@mui/material';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PeopleIcon from '@mui/icons-material/People';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CreateEventSection from '../createEvent/createEvent';
import useAxiosPrivate from "@hooks/useAxiosPrivate";
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;


const CustomCard = styled(Card)(({ theme }) => ({
  minWidth: 275,
  background: 'linear-gradient(145deg, #ffffff, #e6e6e6)',
  borderColor: '#4fc3f7',
  borderWidth: 2,
  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
  '&:hover': {
    boxShadow: '0px 8px 30px rgba(0, 0, 0, 0.3)',
    transform: 'scale(1.05)',
  },
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  animation: `${fadeIn} 1s ease-out`,
  borderRadius: theme.shape.borderRadius * 2,
}));

const DashboardPage = ({ dashboardData = { totalMembers: 0, programs: 0, totalEventscontucted: 0 } }) => {
  const [showCreateEvent, setShowCreateEvent] = useState(false); // State to manage CreateEventSection visibility
  const [stats, setAdminStats] = useState({})
  const api = useAxiosPrivate()

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/api/admin/get-stats');
        setAdminStats(response?.data?.stats)
      } catch (error) {
        toast.error('Failed to fetch stats');
        console.error('Error creating registration:', error);
      }
    }
    fetchStats()
  }, [])
  console.log(stats)

  const handleToggleCreateEvent = () => { // Toggle function
    setShowCreateEvent(!showCreateEvent);
  };
  return (
    <Box sx={{ flexGrow: 1, p: 3, animation: `${fadeIn} 1s ease-out` }}>
      <Typography variant="h4" sx={{ mb: 4, color: 'black', fontWeight: 'bold' }}>
        Dashboard
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <Button
          onClick={handleToggleCreateEvent}
          variant="contained"
          startIcon={<AddCircleOutlineIcon />}
          sx={{
            backgroundColor: '#4fc3f7',
            '&:hover': { backgroundColor: '#039be5' },
            color: 'white',
            fontWeight: 'bold',
            textTransform: 'none',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          }}
        >
          Create Event
        </Button>

      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3} >
          <CustomCard >
            <CardContent sx={{ backgroundColor: "#FFd700" }}>
              <Typography sx={{ fontSize: 14, color: 'white', fontWeight: 'medium' }} gutterBottom>
                Total Members Joined
              </Typography>
              <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center', color: '#123152', fontWeight: 'bold' }}>
                <PeopleIcon sx={{ mr: 1, color: 'white' }} />
                {stats ? stats.registrations : null}
              </Typography>
            </CardContent>
          </CustomCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3} >
          <CustomCard >
            <CardContent sx={{ backgroundColor: "#FF9912" }}>
              <Typography sx={{ fontSize: 14, color: 'white', fontWeight: 'medium' }} gutterBottom>
                Upcoming programs
              </Typography>
              <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center', color: '#123152', fontWeight: 'bold' }}>
                <PeopleIcon sx={{ mr: 1, color: 'white' }} />
                {stats ? stats.upcomingEvents : null}
              </Typography>
            </CardContent>
          </CustomCard>
        </Grid>
        <Grid item xs={12} sm={6} md={3} >
          <CustomCard>
            <CardContent sx={{ backgroundColor: "#03A89E" }}>
              <Typography sx={{ fontSize: 14, color: 'white', fontWeight: 'medium' }} gutterBottom>
                Total Events Conducted
              </Typography>
              <Typography variant="h5" component="div" sx={{ display: 'flex', alignItems: 'center', color: '#123152', fontWeight: 'bold' }}>
                <EventAvailableIcon sx={{ mr: 1, color: 'white' }} />
                {stats ? stats.doneEvents : null}
              </Typography>
            </CardContent>
          </CustomCard>
        </Grid>
      </Grid>
      {showCreateEvent && <CreateEventSection />}
    </Box>
  );
};

export default DashboardPage;
