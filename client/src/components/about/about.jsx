import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { Box, Paper, Typography, Grid } from '@mui/material';
import about1 from "../../assets/images/about1.jpg";
import about2 from "../../assets/images/about2.jpg";
import about3 from "../../assets/images/about3.jpg";
import about4 from "../../assets/images/about4.jpg";
import about5 from "../../assets/images/about5.jpg";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const About = () => {
  // Slider settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  // NextArrow component
  function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <ArrowForwardIosIcon
        className={className}
        style={{ ...style, color: 'black', zIndex: 1 }}
        onClick={onClick}
      />
    );
  }

  // PrevArrow component
  function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <ArrowBackIosNewIcon
        className={className}
        style={{ ...style, color: 'black', zIndex: 1 }}
        onClick={onClick}
      />
    );
  }

  const founders = [
    { name: 'Emily Stone', role: 'Founder & CEO' },
    { name: 'Michael Reed', role: 'Co-Founder & CTO' },
  ];

  const images = [about1, about2, about3, about4, about5]

return (
  <Box sx={{ maxWidth: 900, mx: 'auto', p: 2, overflow: 'hidden' }}> {/* Ensure overflow is handled */}
    <Slider {...settings}>
      {images.map((image, index) => (
        <Paper key={index} elevation={3} component="div" sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 500 }}>
          <img src={image} alt={`Slide ${index + 1}`} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
        </Paper>
      ))}
    </Slider>
    <Typography variant="body1" sx={{ mt: 4, color: 'black', wordWrap: 'break-word' }}>
      The Event Horizon Club is a dynamic, community-driven organization that specializes in curating and managing a wide array of events. At the heart of its mission lies the commitment to bring people together, fostering connections and creating memorable experiences through meticulously organized gatherings. From vibrant cultural festivals and educational workshops to corporate conferences and intimate social gatherings, the Event Horizon Club prides itself on its ability to craft events that not only entertain but also enrich participants. With a keen eye for detail and a passion for innovation, the club's dedicated team works tirelessly to ensure each event is a seamless blend of creativity and efficiency. Leveraging the latest in event management technology alongside traditional hospitality values, the Event Horizon Club has established itself as a beacon of excellence in the realm of event planning and execution, continually setting new standards for what it means to bring communities together.
    </Typography>
    <Grid container spacing={2} sx={{ mt: 2, justifyContent: 'center' }}>
        {founders.map((founder, index) => (
          <Grid item xs={12} sm={6} key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '4px', color: 'white' }}>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {founder.name}
            </Typography>
            <Typography variant="body2" sx={{ fontStyle: 'italic' }}>
              {founder.role}
            </Typography>
          </Grid>
        ))}
      </Grid>
  </Box>
);


};
export default About;
