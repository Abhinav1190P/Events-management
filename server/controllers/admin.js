const Auth = require("../models/Auth");
const Event = require("../models/Events");
const Register = require("../models/Registration");
const Club = require("../models/Club")
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
    return res
      .status(200)
      .json({ success: false, message: "Got events", events });
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

    const totalClubs = await Club.find({club_admin: req.user.userId}).countDocuments(); // Get total count of all clubs


    return res.json({ success: true, clubs, totalClubs });

  } catch (error) {
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

module.exports = { profile, createEvent, getEvents, getAdminStats, CreateClub, GetClubs };
