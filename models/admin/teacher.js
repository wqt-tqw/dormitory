const {db}=require(process.cwd()+'/models/index')
	
//查
//教师
//查
const teacherSelectModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	console.log('接受数据req:'+getData)
	console.log('接受数据res:'+res)
	
	var sql = `select i.teacherId,i.username,i.teacherName,i.introduce,i.classId,c.className from teacher i join class c on i.classId = c.classId order by i.teacherId;
	select count(*)as count from teacher;
	select classId,className from class `;
	if(getData.pageNo&&getData.pageSize){
		sql = `select i.teacherId,i.username,i.teacherName,i.introduce,i.classId,c.className from teacher i join class c on i.classId = c.classId order by i.teacherId limit ${(getData.pageNo-1)*getData.pageSize},${getData.pageSize};
		select count(*)as count from teacher;
		select classId,className from class `;
	}
	//var sqlParams = 
	console.log('sql:'+sql)
	db.query(sql,function (error, results) {
		if(error){
			console.log('查询失败'+error)
			res.send({
				meta:{
					flag:false,
					msg:error
				}
			})
		}else{
			console.log(results)
			res.send({
				meta:{
					state:200,
					flag:true,
					msg:"查询成功"
				},
				data:results[0],
				total:results[1][0].count,
				classdata:results[2]
			})
		}
		//db.end();
	});
	
}
//新增
const teacherAddModel=(req,res)=>{
	//1.接受数据
	// let getData=req.query;
	let getData=req.body;
	
	var sql = `insert into teacher(username,teacherName,introduce,classId) values(?,?,?,?)`;

	var sqlParams = [getData.username,getData.teacherName,getData.introduce,getData.classId]
	console.log('sql:'+sql)
	console.log('sqlParams:'+sqlParams)
	db.query(sql,sqlParams,function (error, results) {
		if(error){
			console.log('插入失败'+error)
			res.send({
				meta:{
					flag:false,
					msg:error
				}
			})
		}else{
			console.log(results)
			res.send({
				meta:{
					state:200,
					flag:true,
					msg:"插入成功"
				},
				data:results.insertId
			})
		}
		//db.end();
	});
	
}
//编辑
const teacherUpdateModel=(req,res)=>{
	//1.接受数据
	// let getData=req.query;
	let getData=req.body;
	console.log(getData)
	
	if(!getData.teacherId){
		res.send({
			meta:{
				flag:false,
				msg:'参数错误'
			}
		})
		return
	}
	
	var sql = `update teacher set username=?,teacherName=?,introduce=?,classId=? where teacherId=?`;

	var sqlParams = [getData.username,getData.teacherName,getData.introduce,getData.classId,getData.teacherId]
	console.log('sql:'+sql)
	console.log('sqlParams:'+sqlParams)
	db.query(sql,sqlParams,function (error, results) {
		if(error){
			console.log('编辑失败'+error)
			res.send({
				meta:{
					flag:false,
					msg:error
				}
			})
		}else{
			console.log(results)
			res.send({
				meta:{
					state:200,
					flag:true,
					msg:"编辑成功"
				},
				//data:results
			})
		}
		//db.end();
	});
	
}
//删除
const teacherDelModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	if(!getData||!getData.teacherId){
		res.send({
			meta:{
				flag:false,
				msg:'参数错误'
			}
		})
		return
	}
	
	
	var sqlParams =getData.teacherId
	// sqlParams =[getData.teacherId.substring(0,getData.teacherId.lastIndexOf(','))]
	 sqlParams =sqlParams.replace(/,/g, "','")
	 var sql = `delete from teacher where teacherId in ('${sqlParams}')`;
	 console.log('sqlParams:'+sqlParams)
	 console.log('sql'+sql)
	db.query(sql,function (error, results) {
		if(error){
			console.log('删除失败'+error)
			res.send({
				meta:{
					flag:false,
					msg:error
				}
			})
		}else{
			console.log(results)
			res.send({
				meta:{
					state:200,
					flag:true,
					msg:"删除成功"
				},
			})
		}
		//db.end();
	});
	
}

module.exports={
	teacherSelectModel,
	teacherAddModel,
	teacherUpdateModel,
	teacherDelModel
}