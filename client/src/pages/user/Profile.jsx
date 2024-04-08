// ProfilePage.jsx
import React, { useState, useEffect } from 'react';
import MyCalender from '../../components/user/calendar';
import EventCard from '../../components/user/cards';
import ClubsSection from '../../components/user/clubs';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Registrations from './RegisteredEvents';
const ProfilePage = () => {
  const api = useAxiosPrivate()
  const [info, setInfo] = useState({})


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
    <div>
      <h2>My Profile</h2>
      <h3>CS hours: {
        info ? info.csHours : 0
      }</h3>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'center', flex: '1', marginRight: '20px' }}>
        <MyCalender />
        <Registrations />
      </div>
      <EventCard />
      <ClubsSection />
    </div>
  );
};

export default ProfilePage;
