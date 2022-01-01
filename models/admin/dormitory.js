const {db,getResult}=require(process.cwd()+'/models/index')

const fs = require('fs')
//宿舍楼
//查
const dormitorySelectModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	console.log('接受数据req:'+getData)
	console.log('接受数据res:'+res)
	var sql = `select * from dormitory order by dormitoryId;
	select count(*)as count from dormitory`;
	if(getData.pageNo&&getData.pageSize){
		sql = `select * from dormitory order by dormitoryId limit ${(getData.pageNo-1)*getData.pageSize},${getData.pageSize};
		select count(*)as count from dormitory`;
	}
	//var sqlParams = 
	console.log('sql:'+sql)
	db.query(sql,async  function (error, results) {
		if(error){
			console.log('查询失败'+error)
			res.send({
				meta:{
					flag:false,
					msg:error
				}
			})
		}else{
			// console.log(results)
			// results[0].forEach((item)=>{
			// 	item = item.image?item.image.split(','):''
			// })
			
			for (let i=0; i<results[0].length; i++){
			    if (results[0][i].image) {
					var sqlParams2 = results[0][i].image.replace(/,/g, "','")
					var sql2 =  `select enclosureId,enclosureName,enclosureUrl from enclosure where enclosureId in ('${sqlParams2}');`;
					console.log('sql2:'+sql2)
					var _res = await getResult(sql2) 
					// console.log(results[0] instanceof Array)
												
					results[0][i]['enclosurelist'] = _res
			
				}
			}
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

//新增
const dormitoryAddModel=(req,res)=>{
	//1.接受数据
	let getData=req.body;
	
	
	var sql = `insert into dormitory(dormitoryName,location,areaName,image) values(?,?,?,?)`;

	var sqlParams = [getData.dormitoryName,getData.location,getData.areaName,getData.image]
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
const dormitoryUpdateModel=(req,res)=>{
	//1.接受数据
	let getData=req.body;
	console.log(getData)
	
	if(!getData.dormitoryId){
		res.send({
			meta:{
				flag:false,
				msg:'参数错误'
			}
		})
		return
	}
	
	var sql = `update dormitory set dormitoryName=?,location=?,areaName=?,image=? where dormitoryId=?`;

	var sqlParams = [getData.dormitoryName,getData.location,getData.areaName,getData.image,getData.dormitoryId]
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
const dormitoryDelModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	if(!getData||!getData.dormitoryId){
		res.send({
			meta:{
				flag:false,
				msg:'参数错误'
			}
		})
		return
	}
	
	var sql = `delete from dormitory where dormitoryId=?`;
	var sqlParams =[getData.dormitoryId]
	db.query(sql,sqlParams,function (error, results) {
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
	dormitorySelectModel,
	dormitoryAddModel,
	dormitoryUpdateModel,
	dormitoryDelModel
}