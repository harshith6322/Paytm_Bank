const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const accountRoute = require("./accountRoute");

router.use("/user", userRouter);
router.use("/account", accountRoute);

module.exports = router;
