const {db}=require(process.cwd()+'/models/index')

//查看宿舍交费列表
const hotelExpenseSelectModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	console.log('接受数据req:'+getData)
	console.log('接受数据res:'+res)
	var sql = `select dp.paymentTime,dp.paymentSemester,dp.paymentMoney,dp.stuNo,s.stuName,c.className,co.collegeName,da.username from dormitorypayment dp
	join student s  on dp.stuNo = s.stuNo 
	join class c  on c.classId = s.classId 
	join college co  on c.collegeId = co.collegeId 
	join dormitoryadmin da  on dp.dormitoryAdminId = da.dormitoryAdminId 
	where co.collegeId in (select collegeId from instructor where instructorId = ${req.session.instructorId||null}) order by s.stuNo;
	select count(*)as count from dormitorypayment dp
	join student s  on dp.stuNo = s.stuNo 
	join class c  on c.classId = s.classId 
	join college co  on c.collegeId = co.collegeId 
	join dormitoryadmin da  on dp.dormitoryAdminId = da.dormitoryAdminId 
	where co.collegeId in (select collegeId from instructor where instructorId = ${req.session.instructorId||null})`;
	if(getData.pageNo&&getData.pageSize){
		sql = `select dp.paymentTime,dp.paymentSemester,dp.paymentMoney,dp.stuNo,s.stuName,c.className,co.collegeName,da.username from dormitorypayment dp
	join student s  on dp.stuNo = s.stuNo 
	join class c  on c.classId = s.classId 
	join college co  on c.collegeId = co.collegeId 
	join dormitoryadmin da  on dp.dormitoryAdminId = da.dormitoryAdminId 
	where co.collegeId in (select collegeId from instructor where instructorId = ${req.session.instructorId||null}) order by s.stuNo limit ${(getData.pageNo-1)*getData.pageSize},${getData.pageSize};
	select count(*)as count from dormitorypayment dp
	join student s  on dp.stuNo = s.stuNo 
	join class c  on c.classId = s.classId 
	join college co  on c.collegeId = co.collegeId 
	join dormitoryadmin da  on dp.dormitoryAdminId = da.dormitoryAdminId 
	where co.collegeId in (select collegeId from instructor where instructorId = ${req.session.instructorId||null});`;
	}
	//var sqlParams = 
	console.log('sql:'+sql)
	db.query(sql, function (error, results) {
		if(error){
			console.log('查询失败'+error)
			res.send({
				meta:{
					flag:false,
					msg:error
				}
			})
		}else{
			console.log(results[0])
			res.send({
				meta:{
					state:200,
					flag:true,
					msg:"查询成功"
				},
				data:results[0],
				total:results[1][0].count
			})
		}
		//db.end();
	});
}



module.exports={
	hotelExpenseSelectModel
}