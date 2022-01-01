var express = require('express');
var router = express.Router();

const {
	stuSelectModel,
	stuAddModel,
	stuUpdateModel,
	stuDelModel
}=require(process.cwd()+'/models/admin/stu')

const {
	collegeSelectModel,
	collegeAddModel,
	collegeUpdateModel,
	collegeDelModel
}=require(process.cwd()+'/models/admin/college')

const {
	classSelectModel,
	classAddModel,
	classUpdateModel,
	classDelModel
}=require(process.cwd()+'/models/admin/class')

const {
	teacherSelectModel,
	teacherAddModel,
	teacherUpdateModel,
	teacherDelModel
}=require(process.cwd()+'/models/admin/teacher')

const {
	instructorSelectModel,
	instructorAddModel,
	instructorUpdateModel,
	instructorDelModel
}=require(process.cwd()+'/models/admin/instructor')

const {
	dormitorySelectModel,
	dormitoryAddModel,
	dormitoryUpdateModel,
	dormitoryDelModel
}=require(process.cwd()+'/models/admin/dormitory')

const {
	dormitoryAdminSelectModel,
	dormitoryAdminAddModel,
	dormitoryAdminUpdateModel,
	dormitoryAdminDelModel
}=require(process.cwd()+'/models/admin/dormitoryAdmin')
const {
	noticeSelectModel,
	noticeAddModel,
	noticeUpdateModel,
	noticeDelModel
}=require(process.cwd()+'/models/admin/notice')

//--------------------------------------信息统计分析------------------------------------

const {
	bedAllocationSelectModel
}=require(process.cwd()+'/models/admin/bedAllocation')

const {
	dormitoryhygieneSelectModel,
	dhTopFiveModel
}=require(process.cwd()+'/models/admin/dormitoryhygiene')

const {
	hotelExpenseSelectModel
}=require(process.cwd()+'/models/admin/hotelExpense')

const {
	outsidersSelectModel
}=require(process.cwd()+'/models/admin/outsiders')



router.use((req,res,next)=>{
	// console.log(req.originalUrl)
	
	console.log('req.session.role:'+req.session.role)
	console.log(req._parsedUrl.pathname)
	if(req.session.role&&req.session.role==1){
		next()
	}else{
		if(req._parsedUrl.pathname=='/selectdhTopFive'||req._parsedUrl.pathname=='/selectnotice'){
			next()
			return
		}
		res.send({
			flag:false,
			msg:'没有系统管理员权限'
		})
	}
})

//#学生查询列表
router.get('/selectUser',stuSelectModel)
//#学生新增
router.post('/addUser',stuAddModel)
//#学生编辑
router.post('/updateUser',stuUpdateModel)
//#学生删除
router.get('/delUser',stuDelModel)

//#学院查询列表
router.get('/selectcollege',collegeSelectModel)
//#学院新增
router.post('/addcollege',collegeAddModel)
//#学院编辑
router.post('/updatecollege',collegeUpdateModel)
//#学院删除
router.get('/delcollege',collegeDelModel)

//#班级查询列表
router.get('/selectclass',classSelectModel)
//#班级新增
router.post('/addclass',classAddModel)
//#班级编辑
router.post('/updateclass',classUpdateModel)
//#班级删除
router.get('/delclass',classDelModel)

//#辅导员查询列表
router.get('/selectinstructor',instructorSelectModel)
//#辅导员新增
router.post('/addinstructor',instructorAddModel)
//#辅导员编辑
router.post('/updateinstructor',instructorUpdateModel)
//#辅导员删除
router.get('/delinstructor',instructorDelModel)

//#教师查询列表
router.get('/selectteacher',teacherSelectModel)
//#教师新增
router.post('/addteacher',teacherAddModel)
//#教师编辑
router.post('/updateteacher',teacherUpdateModel)
//#教师删除
router.get('/delteacher',teacherDelModel)

//#宿舍楼查询列表
router.get('/selectdormitory',dormitorySelectModel)
//#宿舍楼新增
router.post('/adddormitory',dormitoryAddModel)
//#宿舍楼编辑
router.post('/updatedormitory',dormitoryUpdateModel)
//#宿舍楼删除
router.get('/deldormitory',dormitoryDelModel)

//#宿舍管理员查询列表
router.get('/selectdormitoryAdmin',dormitoryAdminSelectModel)
//#宿舍管理员新增
router.post('/adddormitoryAdmin',dormitoryAdminAddModel)
//#宿舍管理员编辑
router.post('/updatedormitoryAdmin',dormitoryAdminUpdateModel)
//#宿舍管理员删除
router.get('/deldormitoryAdmin',dormitoryAdminDelModel)

//#发布公告查询列表
router.get('/selectnotice',noticeSelectModel)
//#发布公告新增
router.post('/addnotice',noticeAddModel)
//#发布公告编辑
router.post('/updatenotice',noticeUpdateModel)
//#发布公告删除
router.get('/delnotice',noticeDelModel)

//--------------------------------------信息统计分析------------------------------------

//#查看床位分配列表
router.get('/selectbedAllocation',bedAllocationSelectModel)

//#查看宿舍楼安全卫生管理列表
router.get('/dormitoryhygieneAllocation',dormitoryhygieneSelectModel)

//#查看宿舍交费列表
router.get('/hotelExpenseAllocation',hotelExpenseSelectModel)

//#查看宿舍楼安全卫生前五管理列表
router.get('/selectdhTopFive',dhTopFiveModel)

//#查看各楼外来人员登记列表
router.get('/selectoutsiders',outsidersSelectModel)

	
module.exports = router;




