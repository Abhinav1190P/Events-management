const { Router } = require("express");
const userController = require("../../controllers/user");

const router = Router();

// GET: /api/user/profile
router.use("/profile", userController.profile);

router.use("/get-events", userController.getEvents)

router.use("/create-registration", userController.createRegistration)

router.use('/get-my-registrations', userController.GetMyEventRegistrations)

router.use('/scan-my-qr', userController.ScanEventRegistration)

router.use('/verify-attendance', userController.VerifyAttendance)

router.use('/get-my-registered-events', userController.GetMyRegisteredEvents)

module.exports = router;
