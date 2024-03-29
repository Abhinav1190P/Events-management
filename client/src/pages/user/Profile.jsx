// ProfilePage.jsx
import React from 'react';
import CalendarComponent from '../../components/user/calendar'; 
import EventCard from '../../components/user/cards';
import ClubsSection from '../../components/user/clubs';
const ProfilePage = () => {
  return (
    <div>
      <h2>My Profile</h2>
      {/* Other profile information */}
      <CalendarComponent />
      <EventCard/>
      <ClubsSection/>
    </div>
  );
};

export default ProfilePage;
