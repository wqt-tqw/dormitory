var express = require('express');
var router = express.Router();

const {
	stuSelectModel
}=require(process.cwd()+'/models/teacher/stu')

const {
	bedAllocationSelectModel
}=require(process.cwd()+'/models/teacher/bedAllocation')

const {
	dormitoryhygieneSelectModel
}=require(process.cwd()+'/models/teacher/dormitoryhygiene')

const {
	hotelExpenseSelectModel
}=require(process.cwd()+'/models/teacher/hotelExpense')


router.use((req,res,next)=>{
	console.log('req.session.role:'+req.session.role)
	if(req.session.role&&req.session.role==3){
		next()
	}else{
		res.send({
			flag:false,
			msg:'没有教师权限'
		})
	}
})

//#查看班级信息列表
router.get('/selectStu',stuSelectModel)

//#查看床位分配列表
router.get('/selectbedAllocation',bedAllocationSelectModel)

//#查看宿舍楼安全卫生管理列表
router.get('/dormitoryhygieneAllocation',dormitoryhygieneSelectModel)

//#查看宿舍交费列表
router.get('/hotelExpenseAllocation',hotelExpenseSelectModel)


	
module.exports = router;




