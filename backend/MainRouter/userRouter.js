const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middlewareAuth");
const { User, Bank } = require("../db");
const router = express.Router();
router.use(express.json());

//zod-singup
const singupzod = zod.object({
  firstname: zod.string(),
  lastname: zod.string(),
  username: zod.string().email().trim().min(6).max(50),
  password: zod.string().min(6).max(30).trim(),
});

router.post("/singup", async (req, res) => {
  const body = req.body;
  const { success, error } = singupzod.safeParse(body);

  if (!success)
    return res.status(400).json({
      status: 400,
      error: "Bad Request",
      message: error,
    });

  const findonedb = await User.findOne({ username: body.username });
  if (findonedb) return res.json({ err: true, msg: "username already taken" });

  const creatuserdb = await User.create({
    firstname: body.firstname,
    lastname: body.lastname,
    username: body.username,
    password: body.password,
  });

  res.json({ err: false, message: "User created successfully" });
});

//ZOD SINGIN
const singinzod = zod.object({
  username: zod.string().email().trim().min(6).max(50),
  password: zod.string().min(6).max(30).trim(),
});

//singin

router.post("/singin", async (req, res) => {
  const body = req.body;

  const { success } = singinzod.safeParse(body);
  if (!success)
    return res.status(400).json({
      status: 400,
      error: "Bad Request",
      message: "Invalid input data",
    });

  const findonedb = await User.findOne({
    username: body.username,
    password: body.password,
  });
  if (!findonedb)
    return res.status(401).json({
      status: 401,
      message: "Unauthorized: Incorrect username or password.",
    });

  const user_id = findonedb._id;

  await Bank.create({
    userID: user_id,
    Balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign({ user_id }, process.env.SERVER_KEY1, {
    expiresIn: "30d",
  });

  res.json({ err: false, msg: "LOGIN SUCCSSFULL", token: token });
});

router.get("/data", authMiddleware, async (req, res) => {
  const user = req.user;

  const usedb = await User.findOne({ _id: user.user_id });
  console.log(usedb);
  if (!usedb) return res.json({ err: true, msg: "cannot find user" });
  const userdata = {
    firstName: usedb.firstname,
    lastName: usedb.lastname,
  };
  res.json({ userdata });
});

//zod update
const updatezod = zod.object({
  password: zod.string().min(6).max(30).trim(),
});

//update
router.put("/update", authMiddleware, async (req, res) => {
  const user = req.user;
  const body = req.body;
  console.log(user._id);
  const { success } = updatezod.safeParse(body);
  if (!success)
    return res.status(400).json({
      status: 400,
      error: "Bad Request",
      message: "Invalid input data",
    });

  const findeonedb = await User.findOne({ _id: user.user_id });
  if (!findeonedb)
    return res.status(401).json({
      status: 401,
      error: "Bad Request",
      message: "user not found",
    });

  const updateonedb = await findeonedb.updateOne({ password: body.password });
  if (!updateonedb)
    return res.status(400).json({
      status: 400,
      error: "Bad Request",
      message: "cannot update password ",
    });

  res.status(200).json({
    status: 200,
    error: false,
    message: "password updated",
  });
});

router.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstname: {
          $regex: filter,
        },
      },
      {
        lastname: {
          $regex: filter,
        },
      },
    ],
  });
  if (users.length === 0) return res.json({ err: true, msg: "no user found" });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstname,
      lastName: user.lastname,
      _id: user._id,
    })),
  });
});

module.exports = router;
