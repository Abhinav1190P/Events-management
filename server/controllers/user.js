const Auth = require("../models/Auth");
const Event = require("../models/Events");
const Register = require("../models/Registration");
const qr = require('qr-image');
const fs = require('fs');

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
    const userRegistrations = await Register.find({ registered_by: req.user.userId }).select('event_id');

    const registeredEventIds = userRegistrations.map(registration => registration.event_id);

    const events = await Event.find({ _id: { $nin: registeredEventIds } })
      .limit(3)
      .select("name club time venue date description banner createdAt admin_url");

    return res.status(200).json({ success: true, message: "Got events", events });
  } catch (error) {
    next(error);
  }
};


const generateQRCode = (data) => {
  try {
    const qrImage = qr.imageSync(data, { type: 'png' });
    return qrImage;
  } catch (error) {
    console.error('Error generating QR code:', error);
    throw error;
  }
};


const createRegistration = async (req, res, next) => {
  try {
    const { name, club, time, venue, date, description, banner, admin_url, event_id } = req.body;

    const newRegistration = await Register.create({
      name,
      club,
      time,
      venue,
      date,
      description,
      banner,
      admin_url,
      registered_by: req.user.userId,
      event_id
    });

    const qrCodeData = {
      userId: req.user.userId,
      eventId: event_id,
      registrationId: newRegistration._id
    };
    const qrImage = generateQRCode(JSON.stringify(qrCodeData));
    const qrImageDataUrl = `data:image/png;base64,${qrImage.toString('base64')}`;

    await Register.findByIdAndUpdate(newRegistration._id, { qrCode: qrImageDataUrl });

    res.status(201).json(newRegistration);

  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};



module.exports = { profile, getEvents, createRegistration };
