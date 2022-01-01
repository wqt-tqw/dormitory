const {db}=require(process.cwd()+'/models/index')

//查看宿舍楼安全卫生管理列表
const dormitoryhygieneSelectModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	console.log('接受数据req:'+getData)
	console.log('接受数据res:'+res)
	var sql = `select dh.compareTime,dh.semester,dh.weekTimes,r.roomNo,d.dormitoryName,da.username,dh.safetyPerformance,dh.healthPerformance,dh.avgPerformance from dormitoryhygiene dh
	join room r  on dh.roomId = r.roomId 
	join dormitoryadmin da  on dh.dormitoryAdminId = da.dormitoryAdminId 
	join dormitory d  on d.dormitoryId = da.dormitoryId 
	join bed b  on b.roomId = r.roomId 
	join bedallocation ba  on ba.bedId = b.bedId 
	join student s  on ba.stuNo = s.stuNo 
	where s.classId in (select classId from teacher where teacherId = ${req.session.teacherId||null}) order by s.stuNo;
	select count(*)as count from dormitoryhygiene dh
	join room r  on dh.roomId = r.roomId 
	join dormitoryadmin da  on dh.dormitoryAdminId = da.dormitoryAdminId 
	join dormitory d  on d.dormitoryId = da.dormitoryId 
	join bed b  on b.roomId = r.roomId 
	join bedallocation ba  on ba.bedId = b.bedId 
	join student s  on ba.stuNo = s.stuNo 
	where s.classId in (select classId from teacher where teacherId = ${req.session.teacherId||null})`;
	if(getData.pageNo&&getData.pageSize){
		sql = `select dh.compareTime,dh.semester,dh.weekTimes,r.roomNo,d.dormitoryName,da.username,dh.safetyPerformance,dh.healthPerformance,dh.avgPerformance from dormitoryhygiene dh
	join room r  on dh.roomId = r.roomId 
	join dormitoryadmin da  on dh.dormitoryAdminId = da.dormitoryAdminId 
	join dormitory d  on d.dormitoryId = da.dormitoryId 
	join bed b  on b.roomId = r.roomId 
	join bedallocation ba  on ba.bedId = b.bedId 
	join student s  on ba.stuNo = s.stuNo 
	where s.classId in (select classId from teacher where teacherId = ${req.session.teacherId||null}) order by s.stuNo limit ${(getData.pageNo-1)*getData.pageSize},${getData.pageSize};
	select count(*)as count from dormitoryhygiene dh
	join room r  on dh.roomId = r.roomId 
	join dormitoryadmin da  on dh.dormitoryAdminId = da.dormitoryAdminId 
	join dormitory d  on d.dormitoryId = da.dormitoryId 
	join bed b  on b.roomId = r.roomId 
	join bedallocation ba  on ba.bedId = b.bedId 
	join student s  on ba.stuNo = s.stuNo 
	where s.classId in (select classId from teacher where teacherId = ${req.session.teacherId||null});`;
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
	dormitoryhygieneSelectModel
}