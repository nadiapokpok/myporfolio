const mongoose = require ("mongoose");

//a corriger
const portfolioSchema = mongoose.Schema({
    titre_2: String,
});

const Projectbis = mongoose.model("projectbis", portfolioSchema );

module.exports = Projectbis;