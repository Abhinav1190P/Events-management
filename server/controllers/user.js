const Auth = require("../models/Auth");
const Event = require("../models/Events");
const Register = require("../models/Registration");
const fs = require('fs');
const Jimp = require("jimp");
const qrCode = require('qrcode-reader');
const qr = require('qr-image')
const path = require('path');
const QrToken = require('../models/QrToken');
const jwt = require('jsonwebtoken')

const profile = async (req, res, next) => {
  try {
    const user = req.user;

    const data = await Auth.findOne({ userName: user.userName }).select(
      "name email csHours"
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

    const qrImagePath = path.join(__dirname, 'qr_codes', `${newRegistration._id}.png`);
    fs.writeFileSync(qrImagePath, qrImage);

    await Register.findByIdAndUpdate(newRegistration._id, { qrCode: qrImageDataUrl });

    res.status(201).json(newRegistration);

  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const GetMyEventRegistrations = async (req, res, next) => {
  try {
    const myRegistrations = await Register.find({ registered_by: req.user.userId });

    if (myRegistrations.length === 0) {
      return res.status(200).json({ success: true, message: 'No registrations found' });
    }

    res.status(200).json({ success: true, registrations: myRegistrations });
  } catch (error) {

    console.error('Error fetching registrations:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch registrations' });
  }
};

const ScanEventRegistration = async (req, res, next) => {
  try {
    const { qrImage } = req.body;

    const qrImagePath = path.join(__dirname, 'qr_codes', `${qrImage}.png`);

    if (!fs.existsSync(qrImagePath)) {
      return res.status(404).json({ error: 'QR code image not found' });
    }

    const buffer = fs.readFileSync(qrImagePath);

    Jimp.read(buffer, function (err, image) {
      if (err) {
        console.error(err);
        return res.status(500).send('Failed to process QR code image');
      }

      let qrcode = new qrCode();
      qrcode.callback = function (err, value) {
        if (err) {
          console.error(err);
          return res.status(500).send('Failed to decode QR code');
        }

        QrToken.findOne({ data: value.result, expirationTime: { $gt: Date.now() } })
          .then((existingToken) => {
            if (existingToken) {
              const secretPageUrl = `/secret/${existingToken.token}`;
              res.json({ secretPageUrl });
            } else {
              const expirationTime = Date.now() + 5 * 60 * 1000;
              const token = generateQrPageToken(value.result, expirationTime);
              const password = generateRandomPassword();

              QrToken.create({ data: value.result, token, expirationTime, password })
                .then(() => {
                  const secretPageUrl = `/secret/${token}`;
                  res.json({ secretPageUrl });
                })
                .catch((error) => {
                  console.error(error);
                  res.status(500).send('Failed to store token in the database');
                });
            }
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Failed to query database');
          });
      };

      qrcode.decode(image.bitmap);
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};


const VerifyAttendance = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    const qrToken = await QrToken.findOne({ token });

    if (!qrToken) {
      return res.status(404).json({ error: 'Token not found' });
    }

    if (qrToken.expirationTime < Date.now()) {
      return res.status(401).json({ error: 'Token has expired' });
    }

    if (qrToken.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    jwt.verify(token, 'abhinav-secret-key', async (err, decoded) => {
      if (err) {
        console.error(err);
        return res.status(400).json({ success: true, error: 'Failed to verify token' });
      }

      const { registrationId, userId } = JSON.parse(decoded.data);
      await Auth.findByIdAndUpdate(userId, { $inc: { csHours: 5 } });

      await Register.findByIdAndUpdate(registrationId, { verified: true, qrCode: null });

      await QrToken.findOneAndDelete({ token });

      res.json({ success: true, message: 'Attendance verified successfully' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
};

const GetMyRegisteredEvents = async (req, res, next) => {
  try {
    const myRegistrations = await Register.find({ registered_by: req.user.userId });

    if (myRegistrations.length === 0) {
      return res.status(200).json({ success: true, message: 'No registrations found' });
    }

    const events = [];
    for (const registration of myRegistrations) {
      const event = await Event.findById(registration.event_id);
      if (event) {
        events.push(event);
      }
    }

    res.status(200).json({ success: true, events });
  } catch (error) {
    console.error('Error fetching registered events:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch registered events' });
  }
};


const generateRandomPassword = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters[randomIndex];
  }
  return password;
};

function generateQrPageToken(data, expirationTime) {
  const payload = {
    data,
    exp: expirationTime / 1000
  };

  const token = jwt.sign(payload, 'abhinav-secret-key');
  return token;
}

module.exports = { profile, getEvents, createRegistration, GetMyEventRegistrations, ScanEventRegistration, VerifyAttendance, GetMyRegisteredEvents };
