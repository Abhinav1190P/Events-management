const Auth = require("../models/Auth");
const Event = require("../models/Events");

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

module.exports = { profile, getEvents };
