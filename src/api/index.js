const express = require("express");

const createData = require("./createData");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("testing now");
  res.json({
    message: "This is backend right?",
  });
});

router.use("/data", createData);

module.exports = router;
