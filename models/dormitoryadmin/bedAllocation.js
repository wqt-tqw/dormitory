const {db}=require(process.cwd()+'/models/index')
	
//查
//房间分配信息
//查
const bedAllocationSelectModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	console.log('接受数据req:'+getData)
	console.log('接受数据res:'+res)
	
	var sql = `select ba.bedAllocationId,ba.allocationTime,ba.bedId,ba.stuNo,s.stuName,b.bedNo,r.roomNo from bedAllocation ba 
	join bed b on ba.bedId = b.bedId 
	join room r on b.roomId = r.roomId 
	join student s on ba.stuNo = s.stuNo 
	where ba.dormitoryadminId = ${req.session.dormitoryAdminId||null}  order by ba.bedAllocationId;
	select count(*)as count from bedAllocation where dormitoryadminId = ${req.session.dormitoryAdminId||null};
	select b.bedId,b.whetherPeople,concat(b.bedNo,'--',r.roomNo) as roombed from bed b join room r on b.roomId=r.roomId where b.dormitoryadminId = ${req.session.dormitoryAdminId||null};
	select stuNo,stuName,sex from student where stuNo not in (select stuNo from bedallocation)`;
	if(getData.pageNo&&getData.pageSize){
		sql = `select ba.bedAllocationId,ba.allocationTime,ba.bedId,ba.stuNo,s.stuName,b.bedNo,r.roomNo from bedAllocation ba 
	join bed b on ba.bedId = b.bedId 
	join room r on b.roomId = r.roomId 
	join student s on ba.stuNo = s.stuNo 
	where ba.dormitoryadminId = ${req.session.dormitoryAdminId||null}  order by ba.bedAllocationId limit ${(getData.pageNo-1)*getData.pageSize},${getData.pageSize};
	select count(*)as count from bedAllocation where dormitoryadminId = ${req.session.dormitoryAdminId||null};
	select b.bedId,b.whetherPeople,concat(b.bedNo,'--',r.roomNo) as roombed from bed b join room r on b.roomId=r.roomId where b.dormitoryadminId = ${req.session.dormitoryAdminId||null};
	select stuNo,stuName,sex from student where stuNo not in (select stuNo from bedallocation)`
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
			
			var dataArr = []
			for(var item of results[3]){
				var obj ={}
				obj.stuNo = item.stuNo
				obj.stustr = item.stuNo+'--'+item.stuName+'--'+item.sex
				dataArr.push(obj)
			}
			
			res.send({
				meta:{
					state:200,
					flag:true,
					msg:"查询成功"
				},
				data:results[0],
				total:results[1][0].count,
				roombeddata:results[2],
				studentdata:dataArr
			})
		}
		//db.end();
	});
	
}
//新增
const bedAllocationAddModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	// let getData='';
	// req.on('data',function(chunk){
	// 	getData+=chunk
	// })
	// req.on('end',function(){
	// 	getData=JSON.parse(getData)
	// })
	var sql = `insert into bedAllocation(bedId,stuNo,allocationTime,dormitoryadminId) values(?,?,now(),?)`;
	
	var sqlParams = [getData.bedId,getData.stuNo,req.session.dormitoryAdminId||null]
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
const bedAllocationUpdateModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	// let getData=req.body;
	console.log(getData)
	
	if(!getData.bedAllocationId){
		res.send({
			meta:{
				flag:false,
				msg:'参数错误'
			}
		})
		return
	}
	
	var sql = `update bedAllocation set bedId=?,stuNo=?,allocationTime=(now()) where bedAllocationId=?`;

	var sqlParams = [getData.bedId,getData.stuNo,getData.bedAllocationId]
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
const bedAllocationDelModel=(req,res)=>{
	//1.接受数据
	let getData=req.query;
	if(!getData||!getData.bedAllocationId){
		res.send({
			meta:{
				flag:false,
				msg:'参数错误'
			}
		})
		return
	}
	
	
	var sqlParams =getData.bedAllocationId
	// sqlParams =[getData.bedAllocationId.substring(0,getData.bedAllocationId.lastIndexOf(','))]
	 sqlParams =sqlParams.replace(/,/g, "','")
	 
	 var sql = `delete from bedAllocation where bedAllocationId in ('${sqlParams}')`;
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
			if(getData&&getData.bedId){
				var bedId = getData.bedId.replace(/,/g, "','")
				var sql2 = `update bed set whetherPeople=2 where bedId in ('${bedId}')`;
				db.query(sql2,function (error2, results2) {
					console.log(results2)
					if(error2){
						res.send({
							meta:{
								flag:false,
								msg:error2
							}
						})
					}
					
				})
			}
			
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
	bedAllocationSelectModel,
	bedAllocationAddModel,
	bedAllocationUpdateModel,
	bedAllocationDelModel
}