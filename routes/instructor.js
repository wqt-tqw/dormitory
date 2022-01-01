var express = require('express');
var router = express.Router();

const {
	bedAllocationSelectModel
}=require(process.cwd()+'/models/instructor/bedAllocation')

const {
	dormitoryhygieneSelectModel
}=require(process.cwd()+'/models/instructor/dormitoryhygiene')

const {
	hotelExpenseSelectModel
}=require(process.cwd()+'/models/instructor/hotelExpense')


router.use((req,res,next)=>{
	console.log('req.session.role:'+req.session.role)
	if(req.session.role&&req.session.role==5){
		next()
	}else{
		res.send({
			flag:false,
			msg:'没有辅导员权限'
		})
	}
})


//#查看床位分配列表
router.get('/selectbedAllocation',bedAllocationSelectModel)

//#查看宿舍楼安全卫生管理列表
router.get('/dormitoryhygieneAllocation',dormitoryhygieneSelectModel)

//#查看宿舍交费列表
router.get('/hotelExpenseAllocation',hotelExpenseSelectModel)


module.exports = router;




