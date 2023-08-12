const User = require('../models/user');

const details = async (req, res) => {
    console.log("function called");
    try {
        const data = await User.find({});
        res.send(data);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { details };
