const { Router } = require("express");
const adminController = require("../../controllers/admin");

const router = Router();

// api/admin/profile
router.use("/profile", adminController.profile);

router.use("/create-event", adminController.createEvent);

router.use("/get-event", adminController.getEvents);

router.use('/get-stats', adminController.getAdminStats)

router.use('/create-club', adminController.CreateClub)

router.use('/clubs/:page', adminController.GetClubs)

router.use("/club-create-about", adminController.CreateClubAbout)

router.use("/get-club-about/:clubid", adminController.GetClubAbout)

module.exports = router;
