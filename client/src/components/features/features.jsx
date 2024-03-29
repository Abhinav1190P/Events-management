import React from 'react';
import { Grid, Card, CardContent, Typography, Box, Button } from '@mui/material';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import ManageHistoryOutlinedIcon from '@mui/icons-material/ManageHistoryOutlined';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import LocalAtmOutlinedIcon from '@mui/icons-material/LocalAtmOutlined';

const features = [
  {
    Icon: TipsAndUpdatesOutlinedIcon,
    title: 'Project Management',
    description: 'GPUs prices are now Dropping: GPUs are now affordable more than before.',
  },
  {
    Icon: ManageHistoryOutlinedIcon,
    title: 'Time Tracking',
    description: 'GPUs prices are now Dropping: GPUs are now affordable more than before.',
  },
  {
    Icon: CalendarMonthOutlinedIcon,
    title: 'Resource Planning',
    description: 'GPUs prices are now Dropping: GPUs are now affordable more than before.',
  },
  {
    Icon: LocalAtmOutlinedIcon,
    title: 'Invoicing',
    description: 'GPUs prices are now Dropping: GPUs are now affordable more than before.',
  },
];

const Features = () => {
  return (
    <Box sx={{ flexGrow: 1, mt: 4, mb: 4 }}>
      <Grid container spacing={2} justifyContent="center">
        {features.map((feature, index) => (
          <Grid item xs={12} sm={6} md={3} key={index} display="flex">
            <Card sx={{ minWidth: 275, textAlign: 'center', p: 2, backgroundColor: '#e0e0e0', color: '#fff', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <feature.Icon sx={{ fontSize: 60, color: 'black' }} />
                <Typography variant="h5" component="div" sx={{ my: 2, color: 'black' }}>
                  {feature.title}
                </Typography>
                <Typography sx={{ mb: 1.5 , textAlign:'left' }} color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ textAlign: 'center', mt:4}}> 
        <Button variant="contained" sx={{backgroundColor: '#000', color: '#fff', '&:hover': {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
            },
         }}>
          View All Features
        </Button>
      </Box>
    </Box>
  );
};

export default Features;
