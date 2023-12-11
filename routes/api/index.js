const router = require("express").Router();
const apiUsers = require("./users");
const apiDances = require("./dances");
const apiProfile = require("./profile");
const apiEvents = require("./events");
const apiInfos = require("./infos");

router.use("/users", apiUsers);
router.use("/dances", apiDances);
router.use("/profile", apiProfile);
router.use("/events", apiEvents);
router.use("/infos", apiInfos);

module.exports = router;
