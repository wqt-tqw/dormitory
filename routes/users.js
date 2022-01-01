var express = require('express');
var router = express.Router();

const {
	registerModel,
	changePasswordModel
}=require(process.cwd()+'/models/user')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
//登录
router.get('/register', registerModel);
//更新密码
router.post('/changePassword', changePasswordModel);




module.exports = router;


