// //一、导入模块
// const mysql = require('mysql');
// //二、连接数据库
// var db = mysql.createdb({
// 	host: "localhost",
// 	user: "root",
// 	password:"123456",
// 	database: "dormitory"
// 	})
// 	db.connect(err=>{
// 		if(err){
// 			console.log("-------------------------")
// 			console.log('数据库连接失败：',err)
// 			console.log("-------------------------")
// 			return;
// 		}
// 		console.log('数据库连接成功');
// 	});
const {db,getResult}=require(process.cwd()+'/models/index')

// const multer = require('multer')
const fs = require('fs')
//三、方法
//查
const stuSelectModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	console.log('接受数据req:'+getData)
	console.log('接受数据res:'+res)
	var sql = `select s.stuNo,s.stuName,s.sex,s.admissionTime,s.photo,s.classId,c.className from student s join class c on s.classId = c.classId order by s.stuNo;
	select count(*)as count from student;
	select classId,className from class `;
	if(getData.pageNo&&getData.pageSize){
		sql = `select s.stuNo,s.stuName,s.sex,s.admissionTime,s.photo,s.classId,c.className from student s join class c on s.classId = c.classId order by s.stuNo limit ${(getData.pageNo-1)*getData.pageSize},${getData.pageSize};
		select count(*)as count from student;
		select classId,className from class `;
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
			// 	item = item.photo?item.photo.split(','):''
			// })
			
			for (let i=0; i<results[0].length; i++){
			    if (results[0][i].photo) {
					var sqlParams2 = results[0][i].photo.replace(/,/g, "','")
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
				total:results[1][0].count,
				classdata:results[2]
			})
		}
		//db.end();
	});
}

//新增
const stuAddModel=(req,res)=>{
	//1.接受数据
	let getData=req.body;
	
	
	var sql = `insert into student(stuName,sex,admissionTime,classId,photo) values(?,?,?,?,?)`;

	var sqlParams = [getData.stuName,getData.sex,getData.admissionTime,getData.classId,getData.photo]
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
const stuUpdateModel=(req,res)=>{
	//1.接受数据
	let getData=req.body;
	console.log(getData)
	
	if(!getData.stuNo){
		res.send({
			meta:{
				flag:false,
				msg:'参数错误'
			}
		})
		return
	}
	
	var sql = `update student set stuName=?,sex=?,admissionTime=?,classId=?,photo=? where stuNo=?`;

	var sqlParams = [getData.stuName,getData.sex,getData.admissionTime,getData.classId,getData.photo,getData.stuNo]
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
const stuDelModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	if(!getData||!getData.stuNo){
		res.send({
			meta:{
				flag:false,
				msg:'参数错误'
			}
		})
		return
	}
	
	var sql = `delete from student where stuNo=?`;
	var sqlParams =[getData.stuNo]
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
	stuSelectModel,
	stuAddModel,
	stuUpdateModel,
	stuDelModel
}