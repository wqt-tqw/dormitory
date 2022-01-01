var express = require('express');
var router = express.Router();

const {
	dormitoryhygieneSelectModel
}=require(process.cwd()+'/models/student/dormitoryhygiene')

const {
	hotelExpenseSelectModel
}=require(process.cwd()+'/models/student/hotelExpense')

const {
	messageBoardSelectModel,
	messageBoardGetModel,
	messageBoardAddModel,
	messageBoardDelModel
}=require(process.cwd()+'/models/student/messageBoard')

const {
	informationreplySelectModel,
	informationreplyAddModel,
	informationreplyDelModel
}=require(process.cwd()+'/models/student/informationreply')



router.use((req,res,next)=>{
	console.log('req.session.role:'+req.session.role)
	if(req.session.role&&req.session.role==4){
		next()
	}else{
		if(req._parsedUrl.pathname=='/messageBoardSelect'||req._parsedUrl.pathname=='/informationreplySelect'||req._parsedUrl.pathname=='/messageBoardGetId'){
			next()
			return
		}
		res.send({
			flag:false,
			msg:'没有学生权限'
		})
	}
})

//#查看宿舍楼安全卫生管理列表
router.get('/dormitoryhygieneAllocation',dormitoryhygieneSelectModel)

//#查看宿舍交费列表
router.get('/hotelExpenseAllocation',hotelExpenseSelectModel)


//#查看留言板主题
router.get('/messageBoardSelect',messageBoardSelectModel)
//#根据id查留言板主题
router.get('/messageBoardGetId',messageBoardGetModel)
//#新增留言板主题
router.post('/messageBoardAdd',messageBoardAddModel)
//#删除留言板主题
router.get('/messageBoardDel',messageBoardDelModel)


//#查看留言板回复
router.get('/informationreplySelect',informationreplySelectModel)
//#新增留言板回复
router.post('/informationreplyAdd',informationreplyAddModel)
//#删除留言板回复
router.get('/informationreplyDel',informationreplyDelModel)

	
module.exports = router;




