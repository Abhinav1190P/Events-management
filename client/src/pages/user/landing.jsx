import React, { useEffect, useState,} from "react";
import { Typography, Container, Grid, Button, Box } from "@mui/material";
import useAxiosPrivate from "@hooks/useAxiosPrivate";
import hero from "../../assets/images/hero.jpg";
import Carousel from '../../components/carousel/carousel';
import Features from '../../components/features/features';
import Testimonials from "../../components/testimonials/testimonials";
import Contact from "../../components/contact/contact";
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const api = useAxiosPrivate();
  const [info, setInfo] = useState(null);
  const nav = useNavigate();

  

  useEffect(() => {
    api
      .get("/api/user/profile")
      .then(({ data }) => {
        setInfo(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container disableGutters>
      <Grid container spacing={2}  sx={{ minHeight: '300px', alignItems: 'center' }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h3" ml={2} gutterBottom sx={{ mb: 1, fontWeight: 500, color: '#000', fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>
            Welcome
          </Typography>
          <Typography variant="h3" ml={2} sx={{ mb: 3, fontWeight: 900, color: 'black', fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' } }}>
            The Tedium is the message
          </Typography>
          <Typography variant="body1" ml={2} sx={{ fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' } }}>
            It would appear that the word "spam" first entered the lexicon of computer engineering by the way of a 1970 Monty Python sketch.
          </Typography>
          <Button variant="contained"  onClick={() => nav('/signup')} sx={{ ml: 2,mt: 2, padding: '10px 20px', borderRadius: '20px', fontWeight: 'bold', fontSize: { xs: '0.75rem', sm: '0.875rem', md: '1rem' } }}>
            Register Now
          </Button>
        </Grid>
        <Grid item xs={12} md={6} sx={{ backgroundImage: `url(${hero})`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '300px' }} />
      </Grid>

      {/* About us section */}
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
          More than just a tool
        </Typography>
        <Typography variant="body1" sx={{ fontWeight: 500, mb: 5 }}>
          Explore what we can do
        </Typography>
      </Box>
      <Carousel />
      <Features />
      <Testimonials />
    </Container>
  );
};

export default Landing;
