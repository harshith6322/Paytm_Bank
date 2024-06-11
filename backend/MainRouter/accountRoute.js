const express = require("express");
// const zod = require("zod");
// const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middlewareAuth");
const mongoose = require("mongoose");
const { Bank } = require("../db");
const router = express.Router();
router.use(express.json());

//route for getting user total balance

router.get("/balance", authMiddleware, async (req, res) => {
  const user = req.user;
  const findonedb = await Bank.findOne({ userID: user.user_id });
  if (!findonedb) return res.status(404).json({ err: true, msg: "not found" });

  const balance = findonedb.Balance;
  res.json({ err: false, balance: balance });
});

//route for tranfer the money from one Main user1 to user2
//the problem can done many ways but the good method is to do with transection methods

// router.post("/transfer", authMiddleware, async (req, res) => {
//   const session = await mongoose.startSession();

//   session.startTransaction();
//   const { amount, to } = req.body;
//   const user = req.user;

//   // Fetch the accounts within the transaction
//   const account = await Bank.findOne({ userID: user.user_id }).session(session);
//   console.log(account);
//   if (!account || account.Balance < amount) {
//     await session.abortTransaction();
//     return res.status(400).json({
//       message: "Insufficient balance",
//     });
//   }

//   const toAccount = await Bank.findOne({ userID: to }).session(session);

//   if (!toAccount) {
//     await session.abortTransaction();
//     return res.status(400).json({
//       message: "Invalid account",
//     });
//   }

//   // Perform the transfer
//   await Bank.updateOne(
//     { userID: req.user._id },
//     { $inc: { balance: -amount } }
//   ).session(session);
//   await Bank.updateOne({ userId: to }, { $inc: { balance: amount } }).session(
//     session
//   );

//   // Commit the transaction
//   await session.commitTransaction();
//   res.json({
//     message: "Transfer successful",
//   });
// });
router.post("/transfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  const { amount, to } = req.body;

  try {
    // Fetch the accounts within the transaction
    const account = await Bank.findOne({ userID: req.user.user_id }).session(
      session
    );
    console.log(account);

    if (!account || account.Balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }

    const toAccount = await Bank.findOne({ userID: to }).session(session);
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Invalid account",
      });
    }

    if (req.user.user_id === to) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "cannot send money to same account",
      });
    }

    // Perform the transfer
    await Bank.updateOne(
      { userID: req.user.user_id }, // Corrected from req.user._id
      { $inc: { Balance: -amount } }
    ).session(session);

    await Bank.updateOne(
      { userID: to }, // Corrected from userId to userID
      { $inc: { Balance: amount } }
    ).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.json({
      message: "Transfer successful",
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({
      message: "Transfer failed",
      error: error.message,
    });
  } finally {
    session.endSession();
  }
});

module.exports = router;
