import React from 'react';
import { Card, CardContent, Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: 'auto',
  marginTop: theme.spacing(5),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: 'auto',
  width: theme.spacing(10),
  height: theme.spacing(10),
}));

const Content = styled('div')(({ theme }) => ({
  textAlign: 'center',
}));

const AdminProfile = ({ admin }) => {
  return (
    <StyledCard>
      <CardContent>
        <StyledAvatar alt={admin.name} src={admin.avatar} />
        <Content>
          <Typography gutterBottom variant="h5" component="div">
            {admin.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {admin.email}
          </Typography>
          <Typography variant="body1" component="p">
            {admin.description}
          </Typography>
        </Content>
      </CardContent>
    </StyledCard>
  );
};

export default AdminProfile;
