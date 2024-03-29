import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Contact = () => {
    return (
      <Box sx={{ bgcolor: '#f5f5f5', p: 4, mt: 8 }}> {/* Adjust background color, padding, and margin as needed */}
        <Container>
          <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 'bold', color: '#333', mb: 4 }}>
            How can we help?
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={4} textAlign="center">
              <PhoneIcon fontSize="large" sx={{ color: '#1976d2' }} />
              <Typography variant="h6" sx={{ mt: 2 }}>Contact Number</Typography>
              <Typography>+123 456 7890</Typography>
              <Typography>+123 456 7890</Typography>
            </Grid>
            <Grid item xs={12} sm={4} textAlign="center">
              <EmailIcon fontSize="large" sx={{ color: '#1976d2' }} />
              <Typography variant="h6" sx={{ mt: 2 }}>Email</Typography>
              <Typography>contact@example.com</Typography>
              <Typography>contact@example.com</Typography>
            </Grid>
            <Grid item xs={12} sm={4} textAlign="center">
              <LocationOnIcon fontSize="large" sx={{ color: '#1976d2' }} />
              <Typography variant="h6" sx={{ mt: 2 }}>Address</Typography>
              <Typography>123 Example Street, City</Typography>
              <Typography>123 Example Street, City</Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  };
  
  export default Contact;