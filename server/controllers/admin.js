const Auth = require("../models/Auth");
const Event = require("../models/Events");
const Register = require("../models/Registration");
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
      stats:{
        registrations,
        upcomingEvents,
        doneEvents 
      }
    });
  } catch (error) {
    next(error);
  }
};


module.exports = { profile, createEvent, getEvents, getAdminStats };
