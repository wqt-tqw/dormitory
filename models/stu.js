//一、导入模块
const mysql = require('mysql');
//二、连接数据库
var connection = mysql.createConnection({
	host: "localhost",
	user: "root",
	password:"123456",
	database: "dormitory"
	})
	connection.connect(err=>{
		if(err){
			console.log("-------------------------")
			console.log('数据库连接失败：',err)
			console.log("-------------------------")
			return;
		}
		console.log('数据库连接成功');
	});
	
//三、方法
//查
const stuSelectModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	console.log('接受数据req:'+getData)
	console.log('接受数据res:'+res)
	
	var sql = `select * from student `;
	if(getData.pageNo&&getData.pageSize){
		sql = `select * from student limit ${getData.pageNo-1},${getData.pageSize}`;
	}
	//var sqlParams = 
	console.log('sql:'+sql)
	connection.query(sql,function (error, results) {
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
		//connection.end();
	});
	
}
//新增
const stuAddModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	
	
	var sql = `insert into student(stuName,sex,admissionTime,classId,password,photo) values(?,?,?,?,?,?)`;

	var sqlParams = [getData.stuName,getData.sex,getData.admissionTime,getData.classId,getData.password,getData.photo]
	console.log('sql:'+sql)
	console.log('sqlParams:'+sqlParams)
	connection.query(sql,sqlParams,function (error, results) {
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
		//connection.end();
	});
	
}
//编辑
const stuUpdateModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	
	var sql = `update student set stuName=?,sex=?,admissionTime=?,classId=?,password=?,photo=? where stuNo=?`;

	var sqlParams = [getData.stuName,getData.sex,getData.admissionTime,getData.classId,getData.password,getData.photo,getData.stuNo]
	console.log('sql:'+sql)
	console.log('sqlParams:'+sqlParams)
	connection.query(sql,sqlParams,function (error, results) {
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
		//connection.end();
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
	connection.query(sql,sqlParams,function (error, results) {
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
		//connection.end();
	});
	
}


module.exports={
	stuSelectModel,
	stuAddModel,
	stuUpdateModel,
	stuDelModel
}