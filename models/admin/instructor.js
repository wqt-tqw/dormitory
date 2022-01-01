const {db}=require(process.cwd()+'/models/index')
	
//查
//辅导员
//查
const instructorSelectModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	console.log('接受数据req:'+getData)
	console.log('接受数据res:'+res)
	
	var sql = `select i.instructorId,i.username,i.instructorName,i.introduce,i.collegeId,c.collegeName from instructor i join college c on i.collegeId = c.collegeId order by i.instructorId;
	select count(*)as count from instructor;
	select collegeId,collegeName from college `;
	if(getData.pageNo&&getData.pageSize){
		sql = `select i.instructorId,i.username,i.instructorName,i.introduce,i.collegeId,c.collegeName from instructor i join college c on i.collegeId = c.collegeId order by i.instructorId limit ${(getData.pageNo-1)*getData.pageSize},${getData.pageSize};
		select count(*)as count from instructor;
		select collegeId,collegeName from college `;
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
				collegedata:results[2]
			})
		}
		//db.end();
	});
	
}
//新增
const instructorAddModel=(req,res)=>{
	//1.接受数据
	// let getData=req.query;
	let getData=req.body;
	
	var sql = `insert into instructor(username,instructorName,introduce,collegeId) values(?,?,?,?)`;

	var sqlParams = [getData.username,getData.instructorName,getData.introduce,getData.collegeId]
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
const instructorUpdateModel=(req,res)=>{
	//1.接受数据
	// let getData=req.query;
	let getData=req.body;
	console.log(getData)
	
	if(!getData.instructorId){
		res.send({
			meta:{
				flag:false,
				msg:'参数错误'
			}
		})
		return
	}
	
	var sql = `update instructor set username=?,instructorName=?,introduce=?,collegeId=? where instructorId=?`;

	var sqlParams = [getData.username,getData.instructorName,getData.introduce,getData.collegeId,getData.instructorId]
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
const instructorDelModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	if(!getData||!getData.instructorId){
		res.send({
			meta:{
				flag:false,
				msg:'参数错误'
			}
		})
		return
	}
	
	
	var sqlParams =getData.instructorId
	// sqlParams =[getData.instructorId.substring(0,getData.instructorId.lastIndexOf(','))]
	 sqlParams =sqlParams.replace(/,/g, "','")
	 var sql = `delete from instructor where instructorId in ('${sqlParams}')`;
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
	instructorSelectModel,
	instructorAddModel,
	instructorUpdateModel,
	instructorDelModel
}