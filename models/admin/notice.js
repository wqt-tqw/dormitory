const {db}=require(process.cwd()+'/models/index')
	
//查
//公告发布
//查
const noticeSelectModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	console.log('接受数据req:'+getData)
	console.log('接受数据res:'+res)
	
	if(getData.noticeId){
		var _sql = `select * from notice where noticeId =  ${getData.noticeId};`
		db.query(_sql,function (error, results) {
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
					data:results
				})
			}
			//db.end();
		});
		return
	}
	
	var sql = `select * from notice;
	select count(*)as count from notice`;
	if(getData.pageNo&&getData.pageSize){
		sql = `select * from notice limit ${(getData.pageNo-1)*getData.pageSize},${getData.pageSize};
		select count(*)as count from notice`;
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
				total:results[1][0].count
			})
		}
		//db.end();
	});
	
}
//新增
const noticeAddModel=(req,res)=>{
	//1.接受数据
	let getData=req.body;
	// let getData='';
	// req.on('data',function(chunk){
	// 	getData+=chunk
	// })
	// req.on('end',function(){
	// 	getData=JSON.parse(getData)
	// })
	var sql = `insert into notice(noticeTheme,noticeContent,noticeTime) values(?,?,?)`;

	var sqlParams = [getData.noticeTheme,getData.noticeContent,getData.noticeTime]
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
const noticeUpdateModel=(req,res)=>{
	//1.接受数据
	// let getData=req.query;
	let getData=req.body;
	console.log(getData)
	
	if(!getData.noticeId){
		res.send({
			meta:{
				flag:false,
				msg:'参数错误'
			}
		})
		return
	}
	
	var sql = `update notice set noticeTheme=?,noticeContent=?,noticeTime=? where noticeId=?`;

	var sqlParams = [getData.noticeTheme,getData.noticeContent,getData.noticeTime,getData.noticeId]
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
const noticeDelModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	if(!getData||!getData.noticeId){
		res.send({
			meta:{
				flag:false,
				msg:'参数错误'
			}
		})
		return
	}
	
	
	var sqlParams =getData.noticeId
	// sqlParams =[getData.noticeId.substring(0,getData.noticeId.lastIndexOf(','))]
	 sqlParams =sqlParams.replace(/,/g, "','")
	 var sql = `delete from notice where noticeId in ('${sqlParams}')`;
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
	noticeSelectModel,
	noticeAddModel,
	noticeUpdateModel,
	noticeDelModel
}