const {db}=require(process.cwd()+'/models/index')
	
//查
//床位信息
//查
const bedSelectModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	console.log('接受数据req:'+getData)
	console.log('接受数据res:'+res)
	
	var sql = `select b.bedId,b.bedNo,b.whetherPeople,r.roomNo,r.roomId from bed b 
	join room r on b.roomId = r.roomId 
	where b.dormitoryadminId = ${req.session.dormitoryAdminId||null}  order by b.bedId;
	select count(*)as count from bed where dormitoryadminId = ${req.session.dormitoryAdminId||null};
	select roomId,roomNo from room where dormitoryadminId = ${req.session.dormitoryAdminId||null}`;
	if(getData.pageNo&&getData.pageSize){
		sql = `select b.bedId,b.bedNo,b.whetherPeople,r.roomNo,r.roomId from bed b 
	join room r on b.roomId = r.roomId 
	where b.dormitoryadminId = ${req.session.dormitoryAdminId||null}  order by b.bedId limit ${(getData.pageNo-1)*getData.pageSize},${getData.pageSize};
	select count(*)as count from bed where dormitoryadminId = ${req.session.dormitoryAdminId||null};
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
const bedAddModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	// let getData='';
	// req.on('data',function(chunk){
	// 	getData+=chunk
	// })
	// req.on('end',function(){
	// 	getData=JSON.parse(getData)
	// })
	var sql = `insert into bed(bedNo,roomId,dormitoryadminId) values(?,?,?)`;
	
	var sqlParams = [getData.bedNo,getData.roomId,req.session.dormitoryAdminId||null]
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
const bedUpdateModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	// let getData=req.body;
	console.log(getData)
	
	if(!getData.bedId){
		res.send({
			meta:{
				flag:false,
				msg:'参数错误'
			}
		})
		return
	}
	
	var sql = `update bed set bedNo=?,roomId=? where bedId=?`;

	var sqlParams = [getData.bedNo,getData.roomId,getData.bedId]
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
const bedDelModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	if(!getData||!getData.bedId){
		res.send({
			meta:{
				flag:false,
				msg:'参数错误'
			}
		})
		return
	}
	
	
	var sqlParams =getData.bedId
	// sqlParams =[getData.bedId.substring(0,getData.bedId.lastIndexOf(','))]
	 sqlParams =sqlParams.replace(/,/g, "','")
	 var sql = `delete from bed where bedId in ('${sqlParams}')`;
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
	bedSelectModel,
	bedAddModel,
	bedUpdateModel,
	bedDelModel
}