import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
  return (
    
    < Box sx={{ bgcolor: '#333', color: 'white', mt: 8, pt: 6, pb: 2 }}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>About Us</Typography>
            <Typography variant="body2">We are a team dedicated to bringing you the best products and services. Join us in our journey.</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>Quick Links</Typography>
            <Link href="#" color="inherit" underline="hover">Home</Link><br />
            <Link href="#" color="inherit" underline="hover">About</Link><br />
            <Link href="#" color="inherit" underline="hover">Services</Link><br />
            <Link href="#" color="inherit" underline="hover">Contact</Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>Follow Us</Typography>
            <IconButton color="inherit"><FacebookIcon /></IconButton>
            <IconButton color="inherit"><TwitterIcon /></IconButton>
            <IconButton color="inherit"><InstagramIcon /></IconButton>
          </Grid>
        </Grid>
        <Typography variant="body2" sx={{ mt: 5, textAlign: 'center', borderTop: '1px solid #555', pt: 2 }}>
          © {new Date().getFullYear()} Your Company Name. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};


export default Footer;