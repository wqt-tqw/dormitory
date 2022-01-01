var express = require('express');
var router = express.Router();

const {
	roomSelectModel,
	roomAddModel,
	roomUpdateModel,
	roomDelModel
}=require(process.cwd()+'/models/dormitoryadmin/room')

const {
	bedSelectModel,
	bedAddModel,
	bedUpdateModel,
	bedDelModel
}=require(process.cwd()+'/models/dormitoryadmin/bed')

const {
	bedAllocationSelectModel,
	bedAllocationAddModel,
	bedAllocationUpdateModel,
	bedAllocationDelModel
}=require(process.cwd()+'/models/dormitoryadmin/bedAllocation')

const {
	dormitorypaymentSelectModel,
	dormitorypaymentAddModel,
	dormitorypaymentUpdateModel,
	dormitorypaymentDelModel
}=require(process.cwd()+'/models/dormitoryadmin/hotelExpense')

const {
	dormitoryhygieneSelectModel,
	dormitoryhygieneAddModel,
	dormitoryhygieneUpdateModel,
	dormitoryhygieneDelModel
}=require(process.cwd()+'/models/dormitoryadmin/dormitoryhygiene')

const {
	outsidersSelectModel,
	outsidersAddModel,
	outsidersUpdateModel,
	outsidersDelModel
}=require(process.cwd()+'/models/dormitoryadmin/outsiders')



router.use((req,res,next)=>{
	console.log('req.session.role:'+req.session.role)
	if(req.session.role&&req.session.role==2){
		next()
	}else{
		res.send({
			flag:false,
			msg:'没宿舍管理员权限'
		})
	}
})

//#房间查询列表
router.get('/selectroom',roomSelectModel)
//#房间新增
router.post('/addroom',roomAddModel)
//#房间编辑
router.post('/updateroom',roomUpdateModel)
//#房间删除
router.get('/delroom',roomDelModel)

//#床位查询列表
router.get('/selectbed',bedSelectModel)
//#床位新增
router.post('/addbed',bedAddModel)
//#床位编辑
router.post('/updatebed',bedUpdateModel)
//#床位删除
router.get('/delbed',bedDelModel)

//#床位分配查询列表
router.get('/selectbedAllocation',bedAllocationSelectModel)
//#床位分配新增
router.post('/addbedAllocation',bedAllocationAddModel)
//#床位分配编辑
router.post('/updatebedAllocation',bedAllocationUpdateModel)
//#床位分配删除
router.get('/delbedAllocation',bedAllocationDelModel)

//#交住宿费查询列表
router.get('/selectdormitorypayment',dormitorypaymentSelectModel)
//#交住宿费登记新增
router.post('/adddormitorypayment',dormitorypaymentAddModel)
//#交住宿费登记编辑
router.post('/updatedormitorypayment',dormitorypaymentUpdateModel)
//#交住宿费登记删除
router.get('/deldormitorypayment',dormitorypaymentDelModel)

//#宿舍安全卫生评分查询列表
router.get('/selectdormitoryhygiene',dormitoryhygieneSelectModel)
//#宿舍安全卫生评分新增
router.post('/adddormitoryhygiene',dormitoryhygieneAddModel)
//#宿舍安全卫生评分编辑
router.post('/updatedormitoryhygiene',dormitoryhygieneUpdateModel)
//#宿舍安全卫生评分删除
router.get('/deldormitoryhygiene',dormitoryhygieneDelModel)


//#外来人员登记查询列表
router.get('/selectoutsiders',outsidersSelectModel)
//#外来人员登记新增
router.post('/addoutsiders',outsidersAddModel)
//#外来人员登记编辑
router.post('/updateoutsiders',outsidersUpdateModel)
//#外来人员登记删除
router.get('/deloutsiders',outsidersDelModel)

	
module.exports = router;




