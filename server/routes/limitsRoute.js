const express = require("express");
const router = express.Router();
const {
    setLimit,
    checkLimit,
    deleteLimit
} = require("../controllers/limitController");

router.route("/setlimit").post(setLimit);
router.route("/checklimit").post(checkLimit);
router.route("/deletelimit").post(deleteLimit);

module.exports = router;
