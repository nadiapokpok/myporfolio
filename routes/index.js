const express = require("express");
const router = express.Router();
const Project = require('../models/formModel');
const Projectbis = require('../models/contactModel');

//GET
router.get('/', (req, res) => {
    Project.find((err, project) => {
        Projectbis.find((err, projectbis) => {
            if (err) {
                res.send(err);
            }
            res.render('index.ejs', { project: project, projectbis: projectbis });
        })

    })
});

//POST
router.post('/index/creer-post', (req, res) => {
    const projectbis = new Projectbis(req.body);
    console.log(projectbis)
    projectbis.save(err => {
        if (err) {
            res.send(err);
        }
        res.redirect('/');
    })
});


module.exports = router;