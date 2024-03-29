const { Router } = require("express");
const adminController = require("../../controllers/admin");

const router = Router();

// api/admin/profile
router.use("/profile", adminController.profile);

router.use("/create-event", adminController.createEvent);

router.use("/get-event", adminController.getEvents);

module.exports = router;
