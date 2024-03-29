import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button, Box } from '@mui/material';
import one from "../../assets/images/one.jpg"
import two from "../../assets/images/two.jpg"
import three from "../../assets/images/three.jpg"
import four from "../../assets/images/four.jpg"


const clubs = [
  {
    id: 1,
    name: 'Club One',
    participants: 120,
    bannerUrl: one, // Replace with actual path
  },
  {
    id: 2,
    name: 'Club Two',
    participants: 90,
    bannerUrl: two, // Replace with actual path
  },
  {
    id: 3,
    name: 'Club Three',
    participants: 90,
    bannerUrl: three, // Replace with actual path
  },  {
    id: 4,
    name: 'Club Four',
    participants: 90,
    bannerUrl: four, // Replace with actual path
  },

  // Add more clubs as needed
];

const ClubsSection = () => (
  <>
    <Box sx={{ width: '100%', textAlign: 'center', my: 4 }}>
      <Typography variant="h4" component="h2" color="primary">
        Clubs
      </Typography>
    </Box>
    <Grid container spacing={4} sx={{ mt: 2 }}>
      {clubs.map((club) => (
        <Grid item xs={12} sm={6} md={3} key={club.id}>
          <Card sx={{ maxWidth: 345, mx: "auto" }}>
            <CardMedia
              component="img"
              height="140"
              image={club.bannerUrl}
              alt={`${club.name} Banner`}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" textAlign="center">
                {club.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" textAlign="center">
                Participants: {club.participants}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button variant="contained" color="primary">
                  Join
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </>
);

export default ClubsSection;
