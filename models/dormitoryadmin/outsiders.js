const {db}=require(process.cwd()+'/models/index')
	
//查
//外来人员登记
//查
const outsidersSelectModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	console.log('接受数据req:'+getData)
	console.log('接受数据res:'+res)
	
	var sql = `select o.guestId,o.guestName,o.guestTime,o.guestContent,r.roomNo from outsiders o 
	join room r on o.roomId = r.roomId 
	where o.dormitoryadminId = ${req.session.dormitoryAdminId||null}  order by o.guestId;
	select count(*)as count from outsiders where dormitoryadminId = ${req.session.dormitoryAdminId||null};
	select roomId,roomNo from room where dormitoryadminId = ${req.session.dormitoryAdminId||null}`;
	if(getData.pageNo&&getData.pageSize){
		sql = `select o.guestId,o.guestName,o.guestTime,o.guestContent,r.roomNo from outsiders o 
	join room r on o.roomId = r.roomId 
	where o.dormitoryadminId = ${req.session.dormitoryAdminId||null}  order by o.guestId limit ${(getData.pageNo-1)*getData.pageSize},${getData.pageSize};
	select count(*)as count from outsiders where dormitoryadminId = ${req.session.dormitoryAdminId||null};
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
const outsidersAddModel=(req,res)=>{
	//1.接受数据
	let getData=req.body;
	// let getData='';
	// req.on('data',function(chunk){
	// 	getData+=chunk
	// })
	// req.on('end',function(){
	// 	getData=JSON.parse(getData)
	// })
	var sql = `insert into outsiders(guestName,guestTime,guestContent,roomId,dormitoryadminId) values(?,now(),?,?,?)`;
	
	var sqlParams = [getData.guestName,getData.guestContent,getData.roomId,req.session.dormitoryAdminId||null]
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
const outsidersUpdateModel=(req,res)=>{
	//1.接受数据
	let getData=req.body;
	// let getData=req.body;
	console.log(getData)
	
	if(!getData.guestId){
		res.send({
			meta:{
				flag:false,
				msg:'参数错误'
			}
		})
		return
	}
	
	var sql = `update outsiders set guestName=?,guestTime=(now()),guestContent=?,roomId=? where guestId=?`;

	var sqlParams = [getData.guestName,getData.guestContent,getData.roomId,getData.guestId]
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
const outsidersDelModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	if(!getData||!getData.guestId){
		res.send({
			meta:{
				flag:false,
				msg:'参数错误'
			}
		})
		return
	}
	
	
	var sqlParams =getData.guestId
	// sqlParams =[getData.guestId.substring(0,getData.guestId.lastIndexOf(','))]
	 sqlParams =sqlParams.replace(/,/g, "','")
	 var sql = `delete from outsiders where guestId in ('${sqlParams}')`;
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
	outsidersSelectModel,
	outsidersAddModel,
	outsidersUpdateModel,
	outsidersDelModel
}