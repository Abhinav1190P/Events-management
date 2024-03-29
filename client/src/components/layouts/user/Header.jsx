import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Menu, MenuItem, Container, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import logo from '@assets/images/logo.jpg';
import useAuth from "@hooks/useAuth";

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { logout } = useAuth();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  return (
    <AppBar position="static" sx={{ mb: 4, color: 'black', backgroundColor: '#e0e0e0' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src={logo} alt="logo" style={{ maxWidth: "100px", maxHeight: "50px" }} />
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', flexGrow: 1, justifyContent: 'flex-end' }}>
            <Button color="inherit" component={Link} to="/">Registered Events</Button>
            <Button color="inherit" component={Link} to="/about">Posts</Button>
            <Button color="inherit" component={Link} to="/features">Whats new</Button>
            <Button color="inherit" component={Link} to="/testimonials">Join Club/Society</Button>
            <Button color="inherit" component={Link} to="/contact">Review</Button>
            <Button
               color="inherit"
               sx={{
                 minWidth: "auto",
                 p: 0,
                 fontWeight: "normal",
                 ml: 2, 
              '&:hover': {

                 backgroundColor: 'rgba(255, 255, 255, 0.08)', 
              },
             }}
             onClick={logout}
             >
             Logout
           </Button>
          </Box>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="menu"
            sx={{ ml: 2, display: { xs: 'flex', md: 'none' } }}
            onClick={handleMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose} component={Link} to="/">Home</MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/about">About</MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/features">Features</MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/testimonials">Testimonials</MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/contact">Contact</MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/signin">Sign In</MenuItem>
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
