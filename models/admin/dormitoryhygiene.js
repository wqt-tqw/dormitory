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
	order by s.stuNo;
	select count(*)as count from dormitoryhygiene dh
	join room r  on dh.roomId = r.roomId 
	join dormitoryadmin da  on dh.dormitoryAdminId = da.dormitoryAdminId 
	join dormitory d  on d.dormitoryId = da.dormitoryId 
	join bed b  on b.roomId = r.roomId 
	join bedallocation ba  on ba.bedId = b.bedId 
	join student s  on ba.stuNo = s.stuNo `;
	if(getData.pageNo&&getData.pageSize){
		sql = `select dh.compareTime,dh.semester,dh.weekTimes,r.roomNo,d.dormitoryName,da.username,dh.safetyPerformance,dh.healthPerformance,dh.avgPerformance from dormitoryhygiene dh
	join room r  on dh.roomId = r.roomId 
	join dormitoryadmin da  on dh.dormitoryAdminId = da.dormitoryAdminId 
	join dormitory d  on d.dormitoryId = da.dormitoryId 
	join bed b  on b.roomId = r.roomId 
	join bedallocation ba  on ba.bedId = b.bedId 
	join student s  on ba.stuNo = s.stuNo 
	order by s.stuNo limit ${(getData.pageNo-1)*getData.pageSize},${getData.pageSize};
	select count(*)as count from dormitoryhygiene dh
	join room r  on dh.roomId = r.roomId 
	join dormitoryadmin da  on dh.dormitoryAdminId = da.dormitoryAdminId 
	join dormitory d  on d.dormitoryId = da.dormitoryId 
	join bed b  on b.roomId = r.roomId 
	join bedallocation ba  on ba.bedId = b.bedId 
	join student s  on ba.stuNo = s.stuNo ;`;
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

//查看宿舍楼安全卫生管理前五列表
const dhTopFiveModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	console.log('接受数据req:'+getData)
	console.log('接受数据res:'+res)
	var sql = `select avg(dh.avgPerformance) as avgyearPerformance,r.roomNo,d.dormitoryName
	from dormitoryhygiene dh 
	join room r on dh.roomId = r.roomId 
	join dormitoryadmin da  on dh.dormitoryAdminId = da.dormitoryAdminId
	join dormitory d  on d.dormitoryId = da.dormitoryId 
	group by roomNo
	order by dh.avgPerformance desc;`;
	if(getData.semester){
		sql = `select avg(dh.avgPerformance) as avgyearPerformance,r.roomNo,d.dormitoryName
	from dormitoryhygiene dh 
	join room r on dh.roomId = r.roomId 
	join dormitoryadmin da  on dh.dormitoryAdminId = da.dormitoryAdminId
	join dormitory d  on d.dormitoryId = da.dormitoryId 
	where dh.semester = '${getData.semester}'
	group by roomNo
	order by dh.avgPerformance desc;`;
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
				data:results
			})
		}
		//db.end();
	});
}

module.exports={
	dormitoryhygieneSelectModel,
	dhTopFiveModel
}