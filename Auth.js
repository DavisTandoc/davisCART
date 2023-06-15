const jwt = require("jsonwebtoken");
const user = require("./models/loginschema");

const Authentication = async (req, res, next) => {
    try {
        const token = req.cookies.salman;
        const verifytoken = jwt.verify(token, "davisclub2001");
        const rootusers = await user.findOne({ _id: verifytoken._id, "tokens.token": token });

        if (!rootusers) {
            res.send("ERROR!!");

        } else {
            req.rootusers_id = rootusers._id;
            req.token=token;
            req.rootusers = rootusers;

        }

    }
    catch (e) {
        res.status(400).send("auth error");
    }
    next();
}

module.exports = Authentication;