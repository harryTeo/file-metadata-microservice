var path = require('path');
var fs = require("fs");
var express = require('express');
var router = express.Router();

var multer = require("multer");
var upload = multer({ dest: 'uploads/' });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post("/metadata", upload.single('uploadedFile'), function (req, res, next) {
  if (req.file) {
    var fileMetadata = {
      name: req.file.originalname,
      size: req.file.size
    };

	  // Delete file
	  fs.unlink(req.file.path, function(err) {
	    if (err) return console.error(err);
	    console.log("File deleted successfully!");
	  }); 

	  return res.json(fileMetadata);   
  } 
  else {
    return res.json({ error: 'Please, upload a file first.' });
  }
});

module.exports = router;