const Auth = require("../models/Auth");
const Event = require("../models/Events")
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

    const newEvent = new Event(eventData);

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
    const events = await Event.find({}).select(
      "name club time venue date description banner"
    );
    return res
      .status(200)
      .json({ success: false, message: "Got events", events });
  } catch (error) {
    next(error);
  }
};

module.exports = { profile, createEvent, getEvents };
