const mongoose = require ("mongoose");

const portfolioSchema = mongoose.Schema({
    titre: String,
    description: String,
    image: String
});

const Project = mongoose.model("project", portfolioSchema );

module.exports = Project;

