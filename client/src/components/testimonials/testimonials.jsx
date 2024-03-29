import React from 'react';
import { Box, Typography, Rating, Grid } from '@mui/material';

const reviews = [
  {
    title: "Clear Cache on Twitter App",
    description: "The service was fantastic! Our needs were met beyond expectations.The service was fantastic! Our needs were met beyond expectations.",
    rating: 5,
    user: '~Ayushmaan Pandey',
    time: '5 Days ago'
  },
  {
    title: "Clear Cache on Twitter App",
    description: "I am very satisfied with the product. It works exactly as described.I am very satisfied with the product. It works exactly as described.",
    rating: 4,
    user: '~Ayushmaan Pandey',
    time: '5 Days ago'
  },
  {
    title: "Clear Cache on Twitter App",
    description: "Overall, good experience. However, there were a few issues with shipping.Overall, good experience. However, there were a few issues with shipping.",
    rating: 4,
    user: '~Ayushmaan Pandey',
    time: '5 Days ago'
  },
  // Add more reviews as needed
];

const TestimonialColumns = () => {
  return (
    <Box sx={{ mt: 8, py: 4, backgroundColor: '#f5f5f5' }}> {/* Adjust the background color as needed */}
      {/* Introductory text */}
      <Typography variant="h5" gutterBottom sx={{ textAlign: 'center', mb: 4, fontWeight: 'bold' }}>
        What our customers are saying?
      </Typography>
      {/* Reviews grid */}
      <Grid container spacing={4} justifyContent="center">
        {reviews.map((review, index) => (
          <Grid item xs={12} sm={4} key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              {review.title}
            </Typography>
            <Rating name="read-only" value={review.rating} readOnly />
            <Typography variant="body2" sx={{ mt: 1 }}>
              {review.description}
            </Typography>
            <Typography variant="caption" sx={{mt:1, textAlign:'left'}}>
                {review.user}
            </Typography>
            <Typography variant="caption" sx={{mt:1, textAlign:'left'}}>
                {review.time}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TestimonialColumns;
