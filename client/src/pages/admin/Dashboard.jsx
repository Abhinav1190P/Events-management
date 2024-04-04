import React, { useEffect, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
  Box,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import EventIcon from "@mui/icons-material/Event";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ReportIcon from "@mui/icons-material/Report";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import DashboardPage from "@components/dashboardAdmin/dashBoard";
import EventsPage from "@components/events/Events";
import CreateEventSection from "@components/createEvent/createEvent";
import Report from "@components/report/report";
import MyCalendar from "@components/calendar/calendar";
import CreateClubForm from "@components/about/about";
import Settings from "@components/settings/settings";
import useAxiosPrivate from "@hooks/useAxiosPrivate";

const drawerWidth = 240;

const Admin = () => {
  const [events, setEvents] = useState([]);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [openDropdown, setOpenDropdown] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({})

  const api = useAxiosPrivate()
  const handleDropMenu = () => {
    setOpenDropdown(!openDropdown);
  };
  const handleNavigation = (text, selectedEvent) => {
    setActiveItem(text);
    setSelectedEvent(events[0]);
  };

  useEffect(() => {
    if (activeItem === 'Events') {

      const fetchEvents = async () => {
        try {
          const response = await api.get("http://localhost:4000/api/admin/get-event");
          setEvents(response.data?.events); // Assuming the API response contains an array of events
        } catch (error) {
          console.error('Failed to fetch events:', error);
        }
      };
      fetchEvents()
    }
  }, [activeItem])

  const handleClick = (text, dropdownItem) => {
    if (text === "Events") {
      handleDropMenu();
      setActiveItem("Events")
      setSelectedEvent(dropdownItem)
    } else {
      handleNavigation(text);
    }
  };

  const sidebarItems = [
    { text: "Dashboard", icon: <DashboardIcon /> },
    {
      text: "Events",
      icon: <EventIcon />,
      dropdownItems: events,
    },
    { text: "Post an Event", icon: <PostAddIcon /> },
    { text: "Report", icon: <ReportIcon /> },
    { text: "Create Club", icon: <InfoIcon /> },
    { text: "Settings", icon: <SettingsIcon /> },
  ];

  useEffect(() => {
    if (events.length > 0) {
      setActiveItem("Events")
      setSelectedEvent(events[0])
    }
  }, [events])

  const DashboardHome = () => (
    <div>
      <DashboardPage />
      <MyCalendar events={events.length > 0 ? events : events} />
    </div>
  );

  const Events = () => {
    if (!selectedEvent) {
      return null; // Render nothing if selectedEvent is undefined
    }

    return (
      <Box p={2}>
        <Typography variant="h4" gutterBottom>
          {selectedEvent.name}
        </Typography>
        <img
          src={selectedEvent.banner}
          alt={selectedEvent.name}
          style={{ maxWidth: '100%', maxHeight: '500px', marginBottom: 20 }}
        />
        <Typography variant="subtitle1">
          Club: {selectedEvent.club}
        </Typography>
        <Typography variant="subtitle1">
          Date: {selectedEvent.date ? new Date(selectedEvent.date).toLocaleDateString() : ''}
        </Typography>
        <Typography variant="subtitle1">
          Time: {selectedEvent.time}
        </Typography>
        <Typography variant="subtitle1">
          Venue: {selectedEvent.venue}
        </Typography>
        <Typography variant="subtitle1">
          Description: {selectedEvent.description}
        </Typography>
        <Drawer anchor="right" open={false} onClose={() => { }}>
          <List>
            <ListItem button>
              <ListItemText primary="Example Action" />
            </ListItem>
          </List>
        </Drawer>
      </Box>
    );
  };



  const createEvent = () => (
    <div>
      <CreateEventSection />
    </div>
  );

  const reportEvent = () => (
    <div>
      <Report />
    </div>
  );
  const Aboutsection = () => (
    <div>
      <CreateClubForm />
    </div>
  );

  const settingsPage = () => (
    <div>
      <Settings />
    </div>
  );

  const screens = [
    { text: "Dashboard", component: DashboardHome },
    { text: "Events", component: Events },
    { text: "Post an Event", component: createEvent },
    { text: "Report", component: reportEvent },
    { text: "Create Club", component: Aboutsection },
    { text: "Settings", component: settingsPage },
  ];
  const ActiveScreen = screens.find(
    (screen) => screen.text === activeItem
  )?.component;


  return (
    <Box
      sx={{ display: "flex", height: "100vh", bgcolor: "background.default" }}
    >
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#123152",
            color: "#fff",
            height: "100vh",
          },
        }}
        variant="permanent"
        anchor="left"
      >

        <List>
          {sidebarItems.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                button
                onClick={() => handleClick(item.text)}
                sx={{
                  backgroundColor: activeItem === item.text ? "#4fc3f7" : "transparent",
                  margin: "8px",
                  borderRadius: "4px",
                  "&:hover": {
                    backgroundColor: "#4fc3f7",
                    color: "#000",
                  },
                }}
              >
                <ListItemIcon
                  sx={{ color: activeItem === item.text ? "#000" : "#fff" }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
                {item.dropdownItems ? openDropdown ? <ExpandLess /> : <ExpandMore /> : null}
              </ListItem>
              {item.dropdownItems && (
                <Collapse in={openDropdown} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.dropdownItems.map((dropdownItem, dropdownIndex) => (
                      <ListItem
                        button
                        key={`dropdown-item-${dropdownIndex}`}
                        sx={{
                          pl: 4,
                          backgroundColor: activeItem === dropdownItem.text ? "#4fc3f7" : "transparent",
                        }}
                        onClick={() => { handleNavigation(dropdownItem.name, dropdownItem); handleClick(item.text, dropdownItem) }}
                      >
                        <ListItemText primary={dropdownItem.name} />
                      </ListItem>
                    ))}
                  </List>

                </Collapse>
              )}
            </React.Fragment>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        height={'max-content'}
        sx={{
          flexGrow: 1,
          bgcolor: "whitesmoke",
          p: 3,
        }}
      >
        {ActiveScreen ? <ActiveScreen /> : null}
      </Box>
    </Box>
  );
};

export default Admin;

