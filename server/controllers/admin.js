const Auth = require("../models/Auth");
const Event = require("../models/Events");
const Register = require("../models/Registration");
const Club = require("../models/Club")
const About = require("../models/About")
const jwt = require("jsonwebtoken");
const QrToken = require("../models/QrToken");

const profile = async (req, res, next) => {
  try {
    const user = req.user;

    const data = await Auth.findOne({ userName: user.userName }).select(
      "name email"
    );

    return res.json(data);
  } catch (error) {
    next(error);
  }
};

const createEvent = async (req, res, next) => {
  try {
    const eventData = req.body;

    const eventDate = new Date(eventData.date);
    const expirationTime = eventDate.getTime() + (24 * 60 * 60 * 1000);

    const secretKey = jwt.sign({ eventId: eventData._id }, 'event-secret-123', { expiresIn: expirationTime });

    eventData.secret_key = secretKey;

    const newEvent = new Event({ ...eventData, admin_url: req.user.userId });

    newEvent
      .save()
      .then(() =>
        res
          .status(200)
          .json({ success: true, message: "Event created successfully!" })
      )
      .catch((err) =>
        res.status(400).json({ success: false, message: err.message })
      );
  } catch (error) {
    next(error);
  }
};


const getEvents = async (req, res, next) => {
  try {
    const events = await Event.find({ admin_url: req.user.userId }).select(
      "name club time venue date description banner createdAt"
    );

    const eventIds = events.map(event => event._id);

    const registrations = await Register.find({ event_id: { $in: eventIds } });

    const registrationIds = registrations.map(registration => registration._id);

    const tokens = await QrToken.find({ registrationId: { $in: registrationIds } }).select("userName password registrationId");

    let registrationsWithTokens = registrations.map(registration => {
      const token = tokens.find(token => token && token.registrationId && token.registrationId.equals(registration._id));
      if (token) {
        return { ...registration.toObject(), token };
      } else {
        console.log('No token found for registration:', registration._id);
        return { ...registration.toObject(), token: null };
      }
    });

    const eventsWithRegistrations = events.map(event => {
      const eventRegistrations = registrationsWithTokens.filter(registration => registration && registration.event_id && registration.event_id.toString() === event._id.toString());
      return { ...event.toObject(), registrations: eventRegistrations };
    });

    return res
      .status(200)
      .json({ success: true, message: "Got events with registrations and tokens", events: eventsWithRegistrations });
  } catch (error) {
    next(error);
  }
};






const getAdminStats = async (req, res, next) => {
  try {
    const registrations = await Register.find({ admin_url: req.user.userId }).countDocuments();

    const currentDate = new Date();

    const upcomingEvents = await Event.find({ date: { $gt: currentDate } }).countDocuments()

    const doneEvents = await Event.find({ date: { $lte: currentDate } }).countDocuments()

    return res.status(200).json({
      success: true,
      message: "Got event data",
      stats: {
        registrations,
        upcomingEvents,
        doneEvents
      }
    });
  } catch (error) {
    next(error);
  }
};

const CreateClub = async (req, res, next) => {
  try {
    const { club_name, club_images } = req.body;

    const newClub = new Club({
      club_name,
      club_images,
      club_admin: req.user.userId
    });

    const savedClub = await newClub.save();

    return res.status(201).json({ success: true, message: 'Club was created successfully' });
  } catch (error) {
    // Handle errors
    console.error('Error creating club:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const GetClubs = async (req, res, next) => {
  try {
    const page = req.query.page || 1;
    const perPage = 10;

    const clubs = await Club.find({ club_admin: req.user.userId })
      .skip((page - 1) * perPage)
      .limit(perPage);

    const totalClubs = await Club.find({ club_admin: req.user.userId }).countDocuments();


    return res.json({ success: true, clubs, totalClubs });

  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

const CreateClubAbout = async (req, res, next) => {
  try {
    const { club_id, htmlContent } = req.body;

    let about = await About.findOne({ club_id });

    if (about) {
      about.htmlContent = htmlContent;
      about = await about.save();

      return res.status(200).json({
        message: 'About updated successfully',
        about: about
      });
    } else {
      about = new About({
        club_id,
        htmlContent
      });
      const savedAbout = await about.save();

      return res.status(201).json({
        message: 'About created successfully',
        about: savedAbout
      });
    }
  } catch (error) {
    // Handle errors
    console.error('Error creating or updating club about:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

const GetClubAbout = async (req, res, next) => {
  try {
    const aboutId = req.params.clubid
    const about = await About.find({ club_id: aboutId })
    if (about.length == 0) {
      return res.status(200).json({ success: false, message: 'No about section found' })
    }
    res.status(200).json({ about: about[0] })
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });

  }
}


module.exports = { profile, createEvent, getEvents, getAdminStats, CreateClub, GetClubs, CreateClubAbout, GetClubAbout };
