var express = require('express');
var router = express.Router();

const multer = require('multer')

const {
	uploadModel,
	mkdirPath
}=require(process.cwd()+'/models/upload')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


//上传附件
/* router.post('/ajax/upload',multer({
  dest:'public/uploads'
}).array('file',10),uploadModel) */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
	  mkdirPath(`public/uploads/${req.body.module}`)
   // console.log(req.body.module)	
    cb(null, `public/uploads/${req.body.module}`)
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
router.post('/ajax/upload',multer({ storage: storage }).array('file',10),uploadModel)

module.exports = router;




