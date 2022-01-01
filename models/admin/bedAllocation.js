const {db}=require(process.cwd()+'/models/index')

//查看房间分配信息
const bedAllocationSelectModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	console.log('接受数据req:'+getData)
	console.log('接受数据res:'+res)
	var sql = `select b.bedNo,r.roomNo,d.dormitoryName,ba.allocationTime,ba.stuNo,s.stuName,c.className,co.collegeName,da.username from bedallocation ba 
	join student s  on ba.stuNo = s.stuNo 
	join class c  on c.classId = s.classId 
	join college co  on c.collegeId = co.collegeId 
	join dormitoryadmin da  on ba.dormitoryAdminId = da.dormitoryAdminId 
	join bed b  on b.bedId = ba.bedId 
	join room r  on b.roomId = r.roomId 
	join dormitory d  on d.dormitoryId = da.dormitoryId  order by s.stuNo;
	select count(*)as count from bedallocation ba
	join student s  on ba.stuNo = s.stuNo 
	join class c  on c.classId = s.classId 
	join college co  on c.collegeId = co.collegeId 
	join dormitoryadmin da  on ba.dormitoryAdminId = da.dormitoryAdminId 
	join bed b  on b.bedId = ba.bedId 
	join room r  on b.roomId = r.roomId 
	join dormitory d  on d.dormitoryId = da.dormitoryId  ;
	`;
	if(getData.pageNo&&getData.pageSize){
		sql = `select b.bedNo,r.roomNo,d.dormitoryName,ba.allocationTime,ba.stuNo,s.stuName,c.className,co.collegeName,da.username from bedallocation ba 
	join student s  on ba.stuNo = s.stuNo 
	join class c  on c.classId = s.classId 
	join college co  on c.collegeId = co.collegeId 
	join dormitoryadmin da  on ba.dormitoryAdminId = da.dormitoryAdminId 
	join bed b  on b.bedId = ba.bedId 
	join room r  on b.roomId = r.roomId 
	join dormitory d  on d.dormitoryId = da.dormitoryId 
	order by s.stuNo limit ${(getData.pageNo-1)*getData.pageSize},${getData.pageSize};
	select count(*)as count from bedallocation ba
	join student s  on ba.stuNo = s.stuNo 
	join class c  on c.classId = s.classId 
	join college co  on c.collegeId = co.collegeId 
	join dormitoryadmin da  on ba.dormitoryAdminId = da.dormitoryAdminId 
	join bed b  on b.bedId = ba.bedId 
	join room r  on b.roomId = r.roomId 
	join dormitory d  on d.dormitoryId = da.dormitoryId `;
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
	bedAllocationSelectModel
}