const express = require("express");
const router = express.Router();
const Database = require('../models/database');
const Project = require('../models/formModel');
const multer = require("multer");


//je connecte ma database à la route admin
const db = new Database();

//installationde multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '/public/images')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
  var upload = multer({ storage: storage })


//GET
router.get('/admin', (req, res) => {
    res.render('admin.ejs');
});

//POST
router.post('/admin/create-project', upload.single('image'), (req, res) => {
    const project = new Project(req.body);
    project.image = req.file.filename;
    project.save(err => {
        if (err) {
            res.send(err);
        }
        res.redirect('/');
    })
});


module.exports = router;