const dbConfig = require("./db.config");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.Upload = require("./uploads.model")(mongoose);
db.Events = require("./events.model")(mongoose);


module.exports = db;
