const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.file = require("./file.model");
db.category = require("./category.model");
db.post = require("./post.model");
db.event = require("./event.model");
db.eventPost = require("./eventPost.model");
db.story = require("./story.model");
db.video = require("./video.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;