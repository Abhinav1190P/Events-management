import React from 'react';
import { Button, Grid, TextField, Typography, IconButton, useTheme } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
  display: 'none',
});

// Custom component for photo upload
const PhotoUploadButton = ({ onChange }) => {
  const theme = useTheme(); // Using theme for consistent styling (optional)

  return (
    <>
      <Input accept="image/*" id="icon-button-file" type="file" onChange={onChange} />
      <label htmlFor="icon-button-file">
        <IconButton color="primary" aria-label="upload picture" component="span">
          <PhotoCamera />
        </IconButton>
      </label>
    </>
  );
};

const Settings = () => {
  // Use the theme for consistent padding, margins, and colors (optional)
  const theme = useTheme();

  return (
    <Grid container spacing={2} sx={{ width: '100%', margin: '0 auto', padding: theme.spacing(3) }}> {/* Increased padding */}
      <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: theme.spacing(1) }}>
        <Typography variant="h6">Upload Photo</Typography> {/* Changed typography for better visual hierarchy */}
        <PhotoUploadButton onChange={(e) => console.log(e.target.files)} />
      </Grid>
      {/* Fields with adjusted margins for visual separation */}
      {["Name", "Email", "Contact", "President", "Current Password", "New Password", "Confirm Password", "Faculty Incharge", "Link 1", "Link 2"].map((label, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <TextField label={label} type={label.includes("Password") ? "password" : "text"} fullWidth variant="outlined" margin="dense" /> {/* Added margin and variant */}
        </Grid>
      ))}
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(2) }}>
        <Button variant="contained" color="primary" sx={{ textTransform: 'none', fontWeight: 'bold', padding: theme.spacing(1, 4) }}> {/* Customized button */}
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default Settings;
