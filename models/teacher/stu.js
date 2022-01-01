const {db}=require(process.cwd()+'/models/index')

//查看班级信息
const stuSelectModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	console.log('接受数据req:'+getData)
	console.log('接受数据res:'+res)
	var sql = `select s.stuNo,s.stuName,s.sex,s.admissionTime,c.className 
	from student s join class c 
	on s.classId = c.classId 
	where s.classId in (select classId from teacher where teacherId = ${req.session.teacherId||null}) order by s.stuNo;
	select count(*)as count
	from student s join class c 
	on s.classId = c.classId 
	where s.classId in (select classId from teacher where teacherId = ${req.session.teacherId||null})`;
	if(getData.pageNo&&getData.pageSize){
		sql = `select s.stuNo,s.stuName,s.sex,s.admissionTime,s.classId,c.className 
	from student s join class c 
	on s.classId = c.classId 
	where s.classId in (select classId from teacher where teacherId = ${req.session.teacherId||null}) order by s.stuNo limit ${(getData.pageNo-1)*getData.pageSize},${getData.pageSize};
	select count(*)as count
	from student s join class c 
	on s.classId = c.classId 
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
	stuSelectModel
}