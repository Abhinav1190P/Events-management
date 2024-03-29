const { Router } = require("express");
const userController = require("../../controllers/user");

const router = Router();

// GET: /api/user/profile
router.use("/profile", userController.profile);

router.use("/get-events", userController.getEvents)

router.use("/create-registration", userController.createRegistration)

module.exports = router;
