const {db}=require(process.cwd()+'/models/index')
	
//查
//宿舍管理员
//查
const dormitoryAdminSelectModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	console.log('接受数据req:'+getData)
	console.log('接受数据res:'+res)

	var sql = `select a.dormitoryAdminId,a.user,a.username,a.introduce,a.dormitoryId,d.dormitoryName from dormitoryAdmin a join dormitory d on a.dormitoryId = d.dormitoryId order by a.dormitoryAdminId;
	select count(*)as count from dormitoryAdmin;
	select dormitoryId,dormitoryName from dormitory `;
	if(getData.pageNo&&getData.pageSize){
		sql = `select a.dormitoryAdminId,a.user,a.username,a.introduce,a.dormitoryId,d.dormitoryName from dormitoryAdmin a join dormitory d on a.dormitoryId = d.dormitoryId order by a.dormitoryAdminId limit ${(getData.pageNo-1)*getData.pageSize},${getData.pageSize};
		select count(*)as count from dormitoryAdmin;
		select dormitoryId,dormitoryName from dormitory `;
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
				dormitorydata:results[2]
			})
		}
		//db.end();
	});
	
}
//新增
const dormitoryAdminAddModel=(req,res)=>{
	//1.接受数据
	// let getData=req.query;
	let getData=req.body;
	
	var sql = `insert into dormitoryAdmin(user,username,introduce,dormitoryId) values(?,?,?,?)`;

	var sqlParams = [getData.user,getData.username,getData.introduce,getData.dormitoryId]
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
const dormitoryAdminUpdateModel=(req,res)=>{
	//1.接受数据
	// let getData=req.query;
	let getData=req.body;
	console.log(getData)
	
	if(!getData.dormitoryAdminId){
		res.send({
			meta:{
				flag:false,
				msg:'参数错误'
			}
		})
		return
	}
	
	var sql = `update dormitoryAdmin set user=?,username=?,introduce=?,dormitoryId=? where dormitoryAdminId=?`;

	var sqlParams = [getData.user,getData.username,getData.introduce,getData.dormitoryId,getData.dormitoryAdminId]
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
const dormitoryAdminDelModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	if(!getData||!getData.dormitoryAdminId){
		res.send({
			meta:{
				flag:false,
				msg:'参数错误'
			}
		})
		return
	}
	
	
	var sqlParams =getData.dormitoryAdminId
	// sqlParams =[getData.dormitoryAdminId.substring(0,getData.dormitoryAdminId.lastIndexOf(','))]
	 sqlParams =sqlParams.replace(/,/g, "','")
	 var sql = `delete from dormitoryAdmin where dormitoryAdminId in ('${sqlParams}')`;
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
	dormitoryAdminSelectModel,
	dormitoryAdminAddModel,
	dormitoryAdminUpdateModel,
	dormitoryAdminDelModel
}