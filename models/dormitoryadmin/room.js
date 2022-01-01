const {db}=require(process.cwd()+'/models/index')
	
//查
//房间信息
//查
const roomSelectModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	console.log('接受数据req:'+getData)
	console.log('接受数据res:'+res)
	
	var sql = `select r.roomId,r.roomNo,r.roomPhone,d.dormitoryName from room r 
	join dormitoryadmin da on r.dormitoryadminId = da.dormitoryadminId 
	join dormitory d on da.dormitoryId = d.dormitoryId
	where r.dormitoryadminId = ${req.session.dormitoryAdminId||null}  order by r.roomId;
	select count(*)as count from room where dormitoryadminId = ${req.session.dormitoryAdminId||null};`;
	if(getData.pageNo&&getData.pageSize){
		sql = `select r.roomId,r.roomNo,r.roomPhone,d.dormitoryName from room r 
	join dormitoryadmin da on r.dormitoryadminId = da.dormitoryadminId 
	join dormitory d on da.dormitoryId = d.dormitoryId
	where r.dormitoryadminId = ${req.session.dormitoryAdminId||null}  order by r.roomId limit ${(getData.pageNo-1)*getData.pageSize},${getData.pageSize};
	select count(*)as count from room where dormitoryadminId = ${req.session.dormitoryAdminId||null};`
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
const roomAddModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	// let getData='';
	// req.on('data',function(chunk){
	// 	getData+=chunk
	// })
	// req.on('end',function(){
	// 	getData=JSON.parse(getData)
	// })
	var sql = `insert into room(roomNo,roomPhone,dormitoryadminId) values(?,?,?)`;
	
	var sqlParams = [getData.roomNo,getData.roomPhone,req.session.dormitoryAdminId||null]
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
const roomUpdateModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	// let getData=req.body;
	console.log(getData)
	
	if(!getData.roomId){
		res.send({
			meta:{
				flag:false,
				msg:'参数错误'
			}
		})
		return
	}
	
	var sql = `update room set roomNo=?,roomPhone=? where roomId=?`;

	var sqlParams = [getData.roomNo,getData.roomPhone,getData.roomId]
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
const roomDelModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	if(!getData||!getData.roomId){
		res.send({
			meta:{
				flag:false,
				msg:'参数错误'
			}
		})
		return
	}
	
	
	var sqlParams =getData.roomId
	// sqlParams =[getData.roomId.substring(0,getData.roomId.lastIndexOf(','))]
	 sqlParams =sqlParams.replace(/,/g, "','")
	 var sql = `delete from room where roomId in ('${sqlParams}')`;
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
	roomSelectModel,
	roomAddModel,
	roomUpdateModel,
	roomDelModel
}