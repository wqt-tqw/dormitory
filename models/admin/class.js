const {db}=require(process.cwd()+'/models/index')
	
//查
//班级
//查
const classSelectModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	console.log('接受数据req:'+getData)
	console.log('接受数据res:'+res)
	

	var sql = `select c.classId,c.className,c.collegeId,cg.collegeName from class c join college cg on c.collegeId = cg.collegeId order by c.classId;
	select count(*)as count from class;
	select collegeId,collegeName from college `;
	if(getData.pageNo&&getData.pageSize){
		sql = `select c.classId,c.className,c.collegeId,cg.collegeName from class c join college cg on c.collegeId = cg.collegeId order by c.classId limit ${(getData.pageNo-1)*getData.pageSize},${getData.pageSize};
		select count(*)as count from class;
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
const classAddModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	
	var sql = `insert into class(className,collegeId) values(?,?)`;

	var sqlParams = [getData.className,getData.collegeId]
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
const classUpdateModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	// let getData=req.body;
	console.log(getData)
	
	if(!getData.classId){
		res.send({
			meta:{
				flag:false,
				msg:'参数错误'
			}
		})
		return
	}
	
	var sql = `update class set className=?,collegeId=? where classId=?`;

	var sqlParams = [getData.className,getData.collegeId,getData.classId]
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
const classDelModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	if(!getData||!getData.classId){
		res.send({
			meta:{
				flag:false,
				msg:'参数错误'
			}
		})
		return
	}
	
	
	var sqlParams =getData.classId
	// sqlParams =[getData.classId.substring(0,getData.classId.lastIndexOf(','))]
	 sqlParams =sqlParams.replace(/,/g, "','")
	 var sql = `delete from class where classId in ('${sqlParams}')`;
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
	classSelectModel,
	classAddModel,
	classUpdateModel,
	classDelModel
}