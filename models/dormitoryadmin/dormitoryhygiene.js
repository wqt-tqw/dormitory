const {db}=require(process.cwd()+'/models/index')
	
//查
//宿舍安全卫生评分信息
//查
const dormitoryhygieneSelectModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	console.log('接受数据req:'+getData)
	console.log('接受数据res:'+res)
	
	var sql = `select * from dormitoryhygiene 
	where dormitoryadminId = ${req.session.dormitoryAdminId||null}  order by hygieneId;
	select count(*)as count from dormitoryhygiene where dormitoryadminId = ${req.session.dormitoryAdminId||null};
	select roomId,roomNo from room where dormitoryadminId = ${req.session.dormitoryAdminId||null}`;
	if(getData.pageNo&&getData.pageSize){
		sql = `select * from dormitoryhygiene 
	where dormitoryadminId = ${req.session.dormitoryAdminId||null}  order by hygieneId limit ${(getData.pageNo-1)*getData.pageSize},${getData.pageSize};
	select count(*)as count from dormitoryhygiene where dormitoryadminId = ${req.session.dormitoryAdminId||null};
	select roomId,roomNo from room where dormitoryadminId = ${req.session.dormitoryAdminId||null}`
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
				roomData:results[2]
			})
		}
		//db.end();
	});
	
}
//新增
const dormitoryhygieneAddModel=(req,res)=>{
	//1.接受数据
	let getData=req.body;
	// let getData='';
	// req.on('data',function(chunk){
	// 	getData+=chunk
	// })
	// req.on('end',function(){
	// 	getData=JSON.parse(getData)
	// })
	var sql = `insert into dormitoryhygiene(semester,compareTime,weekTimes,roomId,safetyPerformance,healthPerformance,avgPerformance,dormitoryadminId) values(?,now(),?,?,?,?,?,?)`;
	
	var sqlParams = [getData.semester,getData.weekTimes,getData.roomId,getData.safetyPerformance,getData.healthPerformance,((Number(getData.safetyPerformance||0)+Number(getData.healthPerformance||0))/2),req.session.dormitoryAdminId||null]
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
const dormitoryhygieneUpdateModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	// let getData=req.body;
	console.log(getData)
	
	if(!getData.hygieneId){
		res.send({
			meta:{
				flag:false,
				msg:'参数错误'
			}
		})
		return
	}
	
	var sql = `update dormitoryhygiene set compareTime=(new()),semester=?,weekTimes=?,roomId=?,safetyPerformance=?,healthPerformance=?,avgPerformance=? where hygieneId=?`;

	var sqlParams = [getData.compareTime,getData.semester,getData.weekTimes,getData.roomId,getData.safetyPerformance,getData.healthPerformance,((Number(getData.safetyPerformance||0)+Number(getData.healthPerformance||0))/2),getData.hygieneId]
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
const dormitoryhygieneDelModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	if(!getData||!getData.hygieneId){
		res.send({
			meta:{
				flag:false,
				msg:'参数错误'
			}
		})
		return
	}
	
	
	var sqlParams =getData.hygieneId
	// sqlParams =[getData.hygieneId.substring(0,getData.hygieneId.lastIndexOf(','))]
	 sqlParams =sqlParams.replace(/,/g, "','")
	 var sql = `delete from dormitoryhygiene where hygieneId in ('${sqlParams}')`;
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
	dormitoryhygieneSelectModel,
	dormitoryhygieneAddModel,
	dormitoryhygieneUpdateModel,
	dormitoryhygieneDelModel
}